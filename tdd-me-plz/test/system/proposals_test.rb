require "application_system_test_case"

class ProposalsTest < ApplicationSystemTestCase
  test "create a proposal" do
    visit '/proposals/new'

    fill_in "Title", with: "Creating an Article"
    fill_in "Description", with: "Created this article successfully!"
    fill_in "Contact", with: "Bob Barker"

    click_on "Create"

    self.assert_current_path root_path
    #AN IDEA FOR LATER !!!!!!
    #table_data = suck_up_table_data
    #[
    #  {title: 'foo'}

    #]

    assert_selector "h2", text: "1 proposal"
    assert_selector "h3", text: "Creating an Article"
    assert_selector "p", text: "Created this article successfully!"
    assert_selector "cite", text: "Bob Barker"
  end

  test "title is required" do
    visit '/proposals/new'

    fill_in "Description", with: "Created this article successfully!"
    fill_in "Contact", with: "Bob Barker"

    click_on "Create"

    assert_text "Title is required"

    self.assert_current_path '/proposals/new'
  end
end
