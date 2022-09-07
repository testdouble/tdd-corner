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
end
