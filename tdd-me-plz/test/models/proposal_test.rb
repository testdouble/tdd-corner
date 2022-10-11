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
end
