class ChangeColumnOnNotesThirdTime < ActiveRecord::Migration
  def change
    change_column :notes, :title, :string, null: true
  end
end
