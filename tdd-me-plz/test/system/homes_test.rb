require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  setup do
    visit '/test_login?email=fakeuser@tddmeplz.test'
  end

  test "visiting the index" do
    visit '/'

    assert_selector "h1", text: "TDD Me Plz"
  end

  test "seeing the logged in email when logged in" do
    visit '/'

    assert_text 'You are logged in as fakeuser@tddmeplz.test'
  end

  test "logout button" do
    visit '/'
    click_on "Log Out"
    assert_current_path login_path
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
    proposal = Proposal.create!(title: "foo title", description: "foo description", owner: users(:normal))
    visit '/'
    assert_text "1 proposal"

    assert_selector "h3", text: "foo title"
    assert_selector "p", text: "foo description"
    assert_selector "cite", text: users(:normal).email
  end

  test "two proposals" do
    Proposal.create!(title: "title 1", owner: users(:normal))
    Proposal.create!(title: "title 2", owner: users(:normal))
    visit '/'
    assert_text "2 proposals"

    assert_selector "h3", text: "title 1"
    assert_selector "cite", text: users(:normal).email
    assert_selector "h3", text: "title 2"
    assert_selector "cite", text: users(:normal).email
  end

  test "one deleted and one not deleted proposal" do
    Proposal.create!(title: "title 1", owner: users(:normal))
    Proposal.create!(title: "title 2", owner: users(:normal)).soft_delete
    visit '/'
    assert_text "1 proposals"

    assert_selector "h3", text: "title 1"
    assert_selector "cite", text: users(:normal).email, count: 1
    assert_selector "h3", text: "title 2", count: 0
  end

  test "links to each proposal" do
    proposal1 = Proposal.create!(title: "title 1", owner: users(:normal))
    proposal2 = Proposal.create!(title: "title 2", owner: users(:normal))

    visit '/'
    click_link("Show", :match => :first)
    assert_current_path "/proposals/#{proposal1.id}"
  end

  test "we can go home from anywhere" do
    visit '/'
    click_link("TDD Me Plz")
    assert_current_path "/"

    proposal1 = Proposal.create!(title: "title 1", owner: users(:normal))

    visit "/proposals/#{proposal1.id}"
    click_link("TDD Me Plz")
    assert_current_path "/"

    visit "/proposals/new"
    click_link("TDD Me Plz")
    assert_current_path "/"
  end
end
