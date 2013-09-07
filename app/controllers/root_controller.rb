class RootController < ApplicationController
  layout "application"
  def index
    p current_user
  end
end
