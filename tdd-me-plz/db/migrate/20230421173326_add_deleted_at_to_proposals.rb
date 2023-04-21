class AddDeletedAtToProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :proposals, :deleted_at, :timestamp
  end
end
