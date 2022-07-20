require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit '/'

    assert_selector "h1", text: "Home"
  end

  test "no proposals" do
    visit '/'

    assert_selector "h2", text: "No proposals!"
  end

  test "one proposal" do
    Proposal.create!
    visit '/'
    assert_selector "h2", text: "One proposal?"
  end

  test "two proposals" do
    Proposal.create!
    Proposal.create!
    visit '/'
    assert_selector "h2", text: "Two proposal$"
  end
end
