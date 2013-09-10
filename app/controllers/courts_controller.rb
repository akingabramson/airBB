class CourtsController < ApplicationController
  def index
    @courts = Court.find_by_direction(params[:southwest], params[:northeast])
    render :json => @courts

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

  def show
    @court = Court.find(params[:id]);
    render :show, handlers: [:rabl]
    # use rabl
  end


end
