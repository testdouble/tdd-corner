class RemoveProposalContact < ActiveRecord::Migration[7.0]
  def change
    remove_column :proposals, :contact, :string
  end
end
