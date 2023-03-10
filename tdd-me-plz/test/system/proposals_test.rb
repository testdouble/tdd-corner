require "application_system_test_case"

class ProposalsTest < ApplicationSystemTestCase
  setup do
    visit '/test_login?email=fakeuser@tddmeplz.test'
    visit '/login'
    click_on 'Log in with Google'
  end

  test "create a proposal" do
    visit '/proposals/new'

    # temp, TODO: enhance!
    assert_no_text "You are not allowed to make a new proposal."

    fill_in "Title", with: "Creating an Article"
    fill_in "Description", with: "Created this article successfully!"

    click_on "Create"

    self.assert_current_path root_path

    assert_text "1 proposal"
    assert_selector "h3", text: "Creating an Article"
    assert_selector "p", text: "Created this article successfully!"
    assert_selector "cite", text: "fakeuser@tddmeplz.test"
  end

  test "title can't be blank" do
    visit '/proposals/new'

    fill_in "Description", with: "Created this article successfully!"

    click_on "Create"

    assert_text "Title can't be blank"

    self.assert_current_path '/proposals/new'
  end

  test "description is repopulated after the user effs up" do
    visit '/proposals/new'

    description_text = "blah blah blah"
    fill_in "Description", with: description_text
    click_on "Create"

    assert_text description_text
  end

  test 'cookie overflow test' do
    visit '/proposals/new'

    long_description = "a" * 1_024_000
    fill_in "Description", with: long_description

    click_on "Create"

    self.assert_current_path '/proposals/new'
    assert_text long_description
  end

  test "adding a comment to an existing proposal" do
    proposal = Proposal.create!(title: 'title', contact: 'contact')
    visit proposal_path(proposal)

    fill_in "New Comment", with: "first!"
    click_on "Add Comment"

    assert_selector('p', text: 'first!')
  end

  test "adding multiple comments to an existing proposal" do
    proposal = Proposal.create!(title: 'title', contact: 'contact')
    visit proposal_path(proposal)

    fill_in "New Comment", with: "first!"
    click_on "Add Comment"

    assert_selector('p', text: 'first!')

    fill_in "New Comment", with: "not first :("
    click_on "Add Comment"

    assert_selector('p', text: 'first!')
    assert_selector('p', text: 'not first :(')
  end

  test "a comment should show the author" do
    proposal = Proposal.create!(title: 'title', contact: 'contact')

    visit proposal_path(proposal)
    fill_in "New Comment", with: "first!"
    click_on "Add Comment"

    assert_selector('cite', text: 'fakeuser@tddmeplz.test')
  end
end
