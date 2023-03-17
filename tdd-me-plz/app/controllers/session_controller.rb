class SessionController < ActionController::Base
  # This is where we're faking our google "mock" - it should be a round trip to create
  def test_login
    session[:user] = {
      email: params[:email]
    }
    redirect_to root_path
  end

  def start_login
    redirect_to 'https://www.google.com', allow_other_host: true
  end

  def create
    # This is hopefully a post from the button

    # After it posts we need to fake out google oauth if Rails.env.test?
    # Set the sesssion
    # This is pulling from our "mock google" object which is `session[:test]`
  end

  def login

  end
end
