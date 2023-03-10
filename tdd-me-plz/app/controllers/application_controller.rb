class ApplicationController < ActionController::Base
  before_action :redirect_if_not_logged_in

  def redirect_if_not_logged_in
    if session[:user].blank?
      redirect_to login_path, alert: 'You are not allowed'
    end
  end
end
