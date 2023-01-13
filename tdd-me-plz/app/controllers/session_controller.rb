class SessionController < ApplicationController
  def test_login
    session[:name] = params[:name]
    redirect_to '/'
  end
end
