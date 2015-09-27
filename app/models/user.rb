class User < ActiveRecord::Base
    before_save { self.email = email.downcase }

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

    validates :name, presence: true, length: { maximum: 50 }
    validates :email, presence: true, length: { maximum: 255 },
                     format: { with: VALID_EMAIL_REGEX },
                     uniqueness: true
    validates :password, length: { minimum: 6 }

    has_secure_password

    has_many :events
    has_many :questions
    has_many :answers

    def add_karma!(reason)
        case reason
        when 'event'
            self.karma += 3
        when 'answer'
            self.karma += 2
        when 'question'
            self.karma += 1
        end
        self.save
    end
end
