class SessionsController < Devise::SessionsController
  layout "basic"

  def new
    p "OH COME ON"
  end

  # creating SESSION, not user

end