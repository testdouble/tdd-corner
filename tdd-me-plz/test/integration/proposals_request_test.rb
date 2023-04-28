require "test_helper"

class NobotsTest < ActionDispatch::IntegrationTest
  # test "the 404 happens" do
    # assert_raises(ActionController::RoutingError) do
    #  get "/"
    # end
  # end

  test 'cannot delete others proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', contact: 'someoneelse@tddmeplz.test')
    get '/test_login?email=fakeuser@tddmeplz.test'
    status = delete proposal_path(proposal)
    # something bad happens
    assert_equal :forbidden, status
  end
end


