class RegistrationsController < Devise::RegistrationsController
  protected
  layout "basic"

  def after_sign_in_path_for(resource)
    params[:redirect_url] || root_url
  end

  def after_sign_up_path_for(resource)
    after_sign_in_path_for(resource)
  end
end
