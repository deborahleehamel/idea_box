class ChangeQualityToString < ActiveRecord::Migration[5.0]
  def change
    remove_column :ideas, :quality
    add_column :ideas, :quality, :string, default: "swill"
  end
end
