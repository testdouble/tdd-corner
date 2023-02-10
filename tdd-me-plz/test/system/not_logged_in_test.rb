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

    test 'can login with TD credentials' do
        visit '/login'
        click_on 'Log in with Google'
        assert_current_path '/'
    end

    # test 'can access new proposal page when logged in' do
    #     # log in

    #     visit '/proposals/new'

    #     assert_current_path '/proposals/new'

    #     assert_no_text "You are not allowed to make a new proposal."
    # end

    # test 'cannot comment' do
    #     post '/proposals/42/comments'

    #     assert_current_path '/proposals/42'

    #     assert_text "You are not allowed to comment."
    # end
end