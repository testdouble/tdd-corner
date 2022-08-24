class AddTitleAndDescriptionToProposal < ActiveRecord::Migration[7.0]
  def change
    add_column :proposals, :title, :string
    add_column :proposals, :description, :string
  end
end
