class CourtsController < ApplicationController
  def index
    @courts = Court.find_by_direction(params[:sw], params[:ne])

  end

  def create
    # require login
    p params[:court]
    @court = Court.new(params[:court])
    if @court.save
      render json: @court
    else
      render json: {}, status: 422
    end
  end


end
