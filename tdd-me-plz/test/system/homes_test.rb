require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit '/'

    assert_selector "h1", text: "Home"
  end

  test "click the new proposal link/button" do
    visit '/'

    click_on 'New Proposal'
    assert_current_path '/proposals/new'
  end

  test "no proposals" do
    visit '/'

    assert_selector "h2", text: "0 proposals"
  end

  test "one proposal" do
    proposal = Proposal.create!(title: "foo title", description: "foo description", contact: "Bob Barker")
    visit '/'
    assert_selector "h2", text: "1 proposal"

    assert_selector "h3", text: "foo title"
    assert_selector "p", text: "foo description"
    assert_selector "cite", text: "Bob Barker"
  end

  test "two proposals" do
    Proposal.create!(title: "title 1", contact: "description 1")
    Proposal.create!(title: "title 2", contact: "description 2")
    visit '/'
    assert_selector "h2", text: "2 proposals"

    assert_selector "h3", text: "title 1"
    assert_selector "cite", text: "description 1"
    assert_selector "h3", text: "title 2"
    assert_selector "cite", text: "description 2"
  end

  test "create a comment" do
    Proposal.create!(title: "title 1", contact: "description 1")
    visit '/'

    fill_in "Comment", with: "farglebargle"
    click_on "Add Comment"

    assert_text "farglebargle"
  end
end
