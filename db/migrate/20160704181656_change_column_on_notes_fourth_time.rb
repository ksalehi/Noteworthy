class ChangeColumnOnNotesFourthTime < ActiveRecord::Migration
  def change
    change_column_default(:notes, :title, nil)
  end
end
