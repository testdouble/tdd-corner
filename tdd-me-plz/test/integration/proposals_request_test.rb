require "test_helper"

class ProposalsRequestTest < ActionDispatch::IntegrationTest
  test 'can edit own proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', description: 'describey', contact: 'fakeuser@tddmeplz.test')
    get '/test_login?email=fakeuser@tddmeplz.test'
    status = patch(proposal_path(proposal), params: {proposal: {title: 'New Title'}})
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

  test 'can delete others proposals as an admin' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', contact: 'someoneelse@tddmeplz.test')
    get '/test_login?email=admin@tddmeplz.test'
    status = delete proposal_path(proposal)
    # something good happens
    assert_equal 200, status
  end

  test 'cannot edit others proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', contact: 'someoneelse@tddmeplz.test')
    get '/test_login?email=fakeuser@tddmeplz.test'
    status = patch proposal_path(proposal), params: {proposal: {title: 'banana'}}
    # something bad happens
    assert_equal 403, status
  end
end


