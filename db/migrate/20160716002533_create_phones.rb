class CreatePhones < ActiveRecord::Migration[5.0]
  def change
    create_table :phones do |t|
      t.string :name
      t.string :number
      t.string :location
      t.integer :followers
      t.string :lang
      t.string :timezone

      t.timestamps
    end
  end
end
