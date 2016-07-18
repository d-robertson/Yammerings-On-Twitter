class AddSentimentToHashtags < ActiveRecord::Migration[5.0]
  def change
    add_column :hashtags, :sentiment, :float
  end
end
