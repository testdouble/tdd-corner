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
end
