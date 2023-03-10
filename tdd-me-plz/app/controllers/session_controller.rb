class SessionController < ActionController::Base
  # This is where we're faking our google "mock" - it should be a round trip to create
  def test_login
    session[:test] = { email: params[:email] }
    head :ok
  end

  def create
    # This is hopefully a post from the button

    # After it posts we need to fake out google oauth if Rails.env.test?
    # Set the sesssion
    # This is pulling from our "mock google" object which is `session[:test]`
    session[:user] = {
      email: session[:test][:email]
    }

    # redirect to home
    redirect_to root_path
  end

  def login

  end
end
