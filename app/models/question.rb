class Question < ActiveRecord::Base
    belongs_to :user
    belongs_to :event
    has_many :answers

    def yes_count
        self.answers.where(is_yes: true).size
    end

    def no_count
        self.answers.where(is_yes: false).size
    end
end
