require "test_helper"

class UserTest < ActiveSupport::TestCase
    test "can_create_admin_users" do
        user = User.create!(admin: true, email: 'admin@tddmeplz.test')
        assert user.admin?
    end
end