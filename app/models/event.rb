class Event < ActiveRecord::Base
    belongs_to :user
    has_many :questions

    validates :name, presence: true, length: { maximum: 50 }
end
