require "application_system_test_case"

class NotLoggedInTest < ApplicationSystemTestCase
    setup do
        # don't log in
    end

    test 'cannot access new proposal page' do
        visit '/proposals/new'

        assert_current_path '/'

        ## we're planning to do this with "flash",
        ## but hey, the future is unknown
        assert_text "You are not allowed to do that."
    end
end