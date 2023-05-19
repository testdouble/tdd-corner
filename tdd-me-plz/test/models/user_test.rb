require "test_helper"

class UserTest < ActiveSupport::TestCase
    test "can_create_admin_users" do
        user = User.create!(admin: true)
        assert user.admin?
    end
end