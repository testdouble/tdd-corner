class SessionController < ActionController::Base
  layout "application"

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

  def logout
    reset_session
    redirect_to login_path
  end

  def google_callback
    google_payload = request.env['omniauth.auth']
    
    email = google_payload['info']['email']
    if email.nil?
      flash[:alert] = 'You have not been logged in because you must provide your email address.'
      redirect_to login_path
    elsif email.end_with?('@testdouble.com')
      session[:user] = { email: }
      flash[:alert] = "Welcome, #{email}"
      redirect_to root_path
    else
      flash[:alert] = "You're not Test Double"
      redirect_to login_path
    end
  end

  def login_failure
    flash[:alert] = "Login Failed"
    redirect_to login_path
  end
end
