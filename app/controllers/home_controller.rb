class HomeController < ApplicationController
  def index
    @weather = TemperatureService.get_weather(params[:city])
  end
end
