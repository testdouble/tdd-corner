require "test_helper"

class ProposalTest < ActiveSupport::TestCase
  test "required fields missing" do
    proposal = Proposal.new(title: nil, contact: nil)
    assert proposal.invalid?
  end

  test "required fields empty" do
    proposal = Proposal.new(title: "", contact: "")
    assert proposal.invalid?
  end

  test "can have comments" do
    proposal = Proposal.create(title: 'yup', description: 'yup', contact: 'yup')
    comment = Comment.create!(text: "hellooooo", proposal: proposal)
    comment2 = Comment.create!(text: "goodbyeeeee", proposal: proposal)

    result = proposal.comments
  end

  test "can soft delete" do
    proposal = Proposal.create(title: 'yup', description: 'yup', contact: 'yup')
    proposal.soft_delete
    assert proposal.deleted_at.present?

    proposal_ids = Proposal.not_deleted.ids
    refute_includes proposal_ids, proposal.id
  end

  test "can access owner" do
    proposal = Proposal.create(title: 'yup', description: 'yup', owner: users(:normal))
    assert_equal proposal.owner, users(:normal)
  end
end
