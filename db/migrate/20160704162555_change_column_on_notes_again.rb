class ChangeColumnOnNotesAgain < ActiveRecord::Migration
  def change
    change_column :notes, :title, :string, null: false, default: 'Title Your Note'
  end
end
