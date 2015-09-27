class AnswersController < ApplicationController
    def new
        @question = Question.find(params['question_id'])

        if @question.nil?
            flash[:error] = 'Question not found!' 
            redirect_to question_path
        else
            @answer = Answer.new
        end
    end

    def show
        @answer = Answer.find(params['id'])
    end

    def create
        question = Question.find(params['answer']['question_id'])
        user_answers = question.answers.where(user_id: current_user.id)
        if user_answers.size > 0
            flash[:error] = 'You can\'t answer a question more than once!'
            return redirect_to question
        end

        @answer = Answer.new(answer_params)
        if @answer.save
            current_user.add_karma!('answer')
            redirect_to @answer.question
        else
            render 'new'
        end
    end

    private

    def answer_params
        params.require(:answer).permit(:is_yes, :question_id).merge({ user_id: current_user.id })
    end
end
