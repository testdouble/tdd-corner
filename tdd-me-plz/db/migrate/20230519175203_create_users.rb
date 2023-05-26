class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.boolean :admin, null: false, default: false
      t.string :email, null: false
      t.timestamps
    end
  end
end
