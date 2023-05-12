require "test_helper"

class ProposalsRequestTest < ActionDispatch::IntegrationTest
  test 'can edit own proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', description: 'describey', contact: 'fakeuser@tddmeplz.test')
    get '/test_login?email=fakeuser@tddmeplz.test'
    status = patch(proposal_path(proposal), params: {title: 'New Title'})
    assert_equal proposal.reload.title, 'New Title'
    assert_equal proposal.reload.description, 'describey'
  end

  test 'cannot delete others proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', contact: 'someoneelse@tddmeplz.test')
    get '/test_login?email=fakeuser@tddmeplz.test'
    status = delete proposal_path(proposal)
    # something bad happens
    assert_equal 403, status
  end
end


