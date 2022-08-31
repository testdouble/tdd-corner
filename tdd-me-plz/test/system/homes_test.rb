require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit '/'

    assert_selector "h1", text: "Home"
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
    Proposal.create!(title: "title 1", description: "description 1")
    Proposal.create!(title: "title 2", description: "description 2")
    visit '/'
    assert_selector "h2", text: "2 proposals"

    assert_selector "h3", text: "title 1"
    assert_selector "p", text: "description 1"
    assert_selector "h3", text: "title 2"
    assert_selector "p", text: "description 2"
  end

  test "create a proposal" do
    visit '/proposals/new'

    fill_in "Title", with: "Creating an Article"
    fill_in "Description", with: "Created this article successfully!"
    fill_in "Contact", with: "Bob Barker"

    click_on "Create"

    self.assert_current_path root_path
    #AN IDEA FOR LATTER !!!!!!
    #table_data = suck_up_table_data
    #[
    #  {title: 'foo'}

    #]

    assert_selector "h2", text: "1 proposal"
    assert_selector "h3", text: "Creating an Article"
  end
end
