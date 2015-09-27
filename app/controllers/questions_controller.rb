class QuestionsController < ApplicationController
    def index
        @questions = Question.all
    end

    def new
        @event = Event.find(params['event_id'])
        if @event.nil?
            flash[:error] = 'Event not found!' 
            redirect_to event_path
        else
            @question = Question.new
        end
    end

    def show
        @question = Question.find(params['id'])
        @answer = Answer.new
    end

    def create
        @question = Question.new(question_params)
        if @question.save
            current_user.add_karma!('question')
            flash[:success] = "Question creation was successful!"
            redirect_to @question
        else
            render 'new'
        end
    end

    private

    def question_params
        params.require(:question).permit(:text, :event_id).merge({ user_id: current_user.id })
    end
end
