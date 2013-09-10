class CheckInsController < ApplicationController
  def index
    render json: current_user.check_ins
  end

  def create
    @check_in = current_user.check_ins.new(params[:check_in])
    if @check_in.save
      render json: @check_in
    else
      p @check_in.errors.full_messages
      render json: @check_in.errors.full_messages, status: 422
    end
  end

  def destroy
  end
end
