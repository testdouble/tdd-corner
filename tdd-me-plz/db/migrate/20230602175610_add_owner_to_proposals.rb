class AddOwnerToProposals < ActiveRecord::Migration[7.0]
  def change
    add_reference :proposals, :owner, references: :users
  end
end
