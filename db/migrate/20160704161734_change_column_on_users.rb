class ChangeColumnOnUsers < ActiveRecord::Migration
  def change
    change_column :notes, :title, :string, default: 'Title Your Note'
  end
end
