require "test_helper"

class CommentTest < ActiveSupport::TestCase
  test "can create a comment on a proposal" do
    proposal = Proposal.create!(title: 'yup', description: 'yup', owner: users(:normal))
    comment = Comment.create!(text: "hellooooo", proposal: proposal, owner: users(:normal))

    assert comment.valid?
    assert_equal comment.proposal.title, 'yup'
  end

  test "can create more than one comment" do
    proposal = Proposal.create!(title: 'yup', description: 'yup', owner: users(:normal))
    comment = Comment.create!(text: "hellooooo", proposal: proposal)
    comment2 = Comment.create!(text: "goodbyeeeee", proposal: proposal)

    assert comment.valid?
    assert comment2.valid?
    assert_equal comment.proposal.title, 'yup'
    assert_equal comment2.proposal.title, 'yup'
  end
end
