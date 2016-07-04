class ChangeColumnOnNotes < ActiveRecord::Migration
  def change
    change_column :notes, :title, :string, null: true, default: 'Title Your Note'
  end
end
