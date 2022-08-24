class AddContactToProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :proposals, :contact, :string
  end
end
