class AddCountToActions < ActiveRecord::Migration[5.0]
  def change
    add_column :actions, :count, :integer
  end
end
