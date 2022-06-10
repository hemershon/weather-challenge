class DashboardController < ApplicationController
  def index
    @weather = TemperatureService.get_weather(params[:city])
    @cities = City.where(user: current_user)
  end
end
