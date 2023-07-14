class AddOwnerToComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :comments, :owner, references: :users
  end
end
