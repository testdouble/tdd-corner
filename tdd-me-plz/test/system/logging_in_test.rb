require "application_system_test_case"

class LoggingInTest < ApplicationSystemTestCase
    setup do
      OmniAuth.config.test_mode = true
      OmniAuth.config.add_mock(:google_oauth2, uid: "12345", info: {email: "google@example.com"}, credentials: {token: 1})
    end

    test "not a testdouble google user" do
        visit '/'
        assert_current_path '/login'
        click_on 'Log in with Google'
        assert_text "You're not Test Double"
    end

    test 'can login with TD credentials' do
      OmniAuth.config.add_mock(:google_oauth2, uid: "12345", info: {email: "employee@testdouble.com"}, credentials: {token: 1})
      visit '/login'
      click_on 'Log in with Google'
      assert_text "Welcome, employee@testdouble.com"
    end

    test 'email not provided by user' do
      OmniAuth.config.add_mock(:google_oauth2, uid: nil, info: {email: nil}, credentials: {})
      visit '/login'
      click_on 'Log in with Google'

      assert_text 'You have not been logged in because you must provide your email address.'
    end

    test 'shows login page when somebody fails to login to google' do
      OmniAuth.config.mock_auth[:google_oauth2] = :invalid_credentials
      # Overriding logger so it doesn't spit out an error/warning for failure url callback
      # See https://github.com/omniauth/omniauth/issues/583
      OmniAuth.config.logger = Rails.logger
      OmniAuth.config.on_failure = Proc.new { |env|
        OmniAuth::FailureEndpoint.new(env).redirect_to_failure
      }
      visit '/login'
      click_on 'Log in with Google'
      assert_current_path '/login'
      assert_text 'Login Failed'
    end

    test 'should reflect new email when email changed' do
      user = User.create!(email: "employee@testdouble.com", google_uid: "12345")

      OmniAuth.config.add_mock(:google_oauth2, uid: "12345", info: {email: "new_name@testdouble.com"}, credentials: {token: 1})
      visit '/login'
      click_on 'Log in with Google'
      assert_text "Welcome, new_name@testdouble.com"

      # Need to check user from database on login
      assert_equal "new_name@testdouble.com", user.reload.email
    end
end