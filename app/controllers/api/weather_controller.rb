module Api
  class WeatherController < ActionController::API

    def index 
      @weather = TemperatureService.get_weather(params[:city])
      render json: @weather
  end 
end
