require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit '/'

    assert_selector "h1", text: "TDD Me Plz"
  end

  test "seeing 'you are not logged in' when not logged in" do
    visit '/'

    assert_text 'You are not logged in.'
  end

  test "seeing the logged in username when logged in" do
    # TODO: log in????

    visit '/'

    assert_no_text 'You are not logged in.' # right method???
    assert_text 'You are logged in as Fake User'
  end

  test "click the new proposal link/button" do
    visit '/'

    click_on 'New Proposal'
    assert_current_path '/proposals/new'
  end

  test "no proposals" do
    visit '/'

    assert_text "0 proposals"
  end

  test "one proposal" do
    proposal = Proposal.create!(title: "foo title", description: "foo description", contact: "Bob Barker")
    visit '/'
    assert_text "1 proposal"

    assert_selector "h3", text: "foo title"
    assert_selector "p", text: "foo description"
    assert_selector "cite", text: "Bob Barker"
  end

  test "two proposals" do
    Proposal.create!(title: "title 1", contact: "description 1")
    Proposal.create!(title: "title 2", contact: "description 2")
    visit '/'
    assert_text "2 proposals"

    assert_selector "h3", text: "title 1"
    assert_selector "cite", text: "description 1"
    assert_selector "h3", text: "title 2"
    assert_selector "cite", text: "description 2"
  end

  test "links to each proposal" do
    proposal1 = Proposal.create!(title: "title 1", contact: "description 1")
    proposal2= Proposal.create!(title: "title 2", contact: "description 2")

    visit '/'
    click_link("Show", :match => :first)
    assert_current_path "/proposals/#{proposal1.id}"
  end

  test "we can go home from anywhere" do
    visit '/'
    click_link("TDD Me Plz")
    assert_current_path "/"

    proposal1 = Proposal.create!(title: "title 1", contact: "description 1")

    visit "/proposals/#{proposal1.id}"
    click_link("TDD Me Plz")
    assert_current_path "/"

    visit "/proposals/new"
    click_link("TDD Me Plz")
    assert_current_path "/"
  end
end
