class EventsController < ApplicationController
    def index
        @events = Event.all
        @current_user = current_user
    end

    def new
        @event = Event.new
    end

    def show
        @event = Event.find(params['id'])
    end

    def create
        @event = Event.new(event_params)
        if @event.save
            current_user.add_karma!('event')
            flash[:success] = "Event creation was successful!"
            redirect_to @event
        else
            render 'new'
        end
    end

    private

    def event_params
        params.require(:event).permit(:name).merge({ user_id: current_user.id })
    end
end
