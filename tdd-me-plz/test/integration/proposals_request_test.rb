require "test_helper"

class ProposalsRequestTest < ActionDispatch::IntegrationTest
  test 'can edit own proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', description: 'describey', owner: users(:normal))
    get '/test_login?email=fakeuser@tddmeplz.test'
    status = patch(proposal_path(proposal), params: {proposal: {title: 'New Title'}})
    assert_equal proposal.reload.title, 'New Title'
    assert_equal proposal.reload.description, 'describey'
  end

  test 'can edit own proposals after email change' do
    user = users(:normal)
    proposal = Proposal.create!(title: 'Big shiny proposal!', description: 'describey', owner: user)
    user.update!(email: 'newfakeuseremail@tddmeplz.test')
    get '/test_login?email=newfakeuseremail@tddmeplz.test'
    status = patch(proposal_path(proposal), params: {proposal: {title: 'New Title'}})
    assert_equal proposal.reload.title, 'New Title'
    assert_equal proposal.reload.description, 'describey'
  end

  test 'cannot delete others proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', owner: users(:abby_normal))
    get "/test_login?email=#{users(:normal).email}"
    status = delete proposal_path(proposal)
    # something bad happens
    assert_equal 403, status
  end

  test 'can delete others proposals as an admin' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', owner: users(:abby_normal))
    get "/test_login?email=#{users(:admin).email}"
    status = delete proposal_path(proposal)
    assert proposal.reload.deleted_at
  end

  test 'cannot edit others proposals' do
    proposal = Proposal.create!(title: 'Big shiny proposal!', owner: users(:abby_normal))
    get "/test_login?email=#{users(:normal).email}"
    status = patch proposal_path(proposal), params: {proposal: {title: 'banana'}}
    # something bad happens
    assert_equal 403, status
  end
end
