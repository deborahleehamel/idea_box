class ChangeQualityToInteger < ActiveRecord::Migration[5.0]
  def change
    remove_column :ideas, :quality
    add_column :ideas, :quality, :integer, :default => 0
  end
end
