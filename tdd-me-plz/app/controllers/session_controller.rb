class SessionController < ActionController::Base
  def test_login
    session[:name] = params[:name]
    redirect_to '/'
  end

  def create
    # This is hopefully a post from the button
    # After it posts we need to fake out google oauth if Rails.env.test?
    # Set the sesssion
    # redirect to home
  end

  def login

  end
end
