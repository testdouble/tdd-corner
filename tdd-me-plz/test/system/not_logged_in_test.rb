require "application_system_test_case"

class NotLoggedInTest < ApplicationSystemTestCase
    setup do
        # don't log in
    end

    test 'logged out users cannot access the home page' do
        visit '/'
        assert_current_path '/login'
    end

    test 'logged out users cannot acces the new proposal page' do
        visit '/proposals/new'
        assert_current_path '/login'
    end
end