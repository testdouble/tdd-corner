require "test_helper"

class ProposalTest < ActiveSupport::TestCase
  test "required fields missing" do
    proposal = Proposal.new(title: nil, owner: nil)
    assert proposal.invalid?
  end

  test "required fields empty" do
    proposal = Proposal.new(title: "")
    assert proposal.invalid?
  end

  test "owner without contact is valid" do
    proposal = Proposal.new(title: "hi", owner: users(:normal))
    assert proposal.valid?
  end

  test "can have comments" do
    proposal = Proposal.create!(title: 'yup', description: 'yup', owner: users(:normal))
    comment = Comment.create!(text: "hellooooo", proposal: proposal)
    comment2 = Comment.create!(text: "goodbyeeeee", proposal: proposal)

    result = proposal.comments
    assert_equal(2, result.size)
  end

  test "can soft delete" do
    proposal = Proposal.create!(title: 'yup', description: 'yup', owner: users(:normal))
    proposal.soft_delete
    assert proposal.deleted_at.present?

    proposal_ids = Proposal.not_deleted.ids
    refute_includes proposal_ids, proposal.id
  end

  test "can access owner" do
    proposal = Proposal.create!(title: 'yup', description: 'yup', owner: users(:normal))
    assert_equal proposal.owner, users(:normal)
  end
end
