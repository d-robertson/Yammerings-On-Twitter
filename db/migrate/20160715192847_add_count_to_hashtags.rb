class AddCountToHashtags < ActiveRecord::Migration[5.0]
  def change
    add_column :hashtags, :count, :integer
  end
end
