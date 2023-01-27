require "application_system_test_case"

class NotLoggedInTest < ApplicationSystemTestCase
    setup do
        # don't log in
    end

    test 'cannot access new proposal page when not logged in' do
        visit '/proposals/new'

        assert_current_path '/'

        assert_text "You are not allowed to make a new proposal."
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
