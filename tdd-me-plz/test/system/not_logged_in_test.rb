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

    test 'that it can display a different auth error message, not just a hardcoded one' do
        flunk 'figure out if or how to test this'

        # Brainstorm from Josh: why do we care? We don't care until we actually have a
        # need to display a different message. If we know that case, we can test it.
        # Otherwise, maybe move on.
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
