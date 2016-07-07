class DropDescriptionFromNotebooks < ActiveRecord::Migration
  def change
    remove_column :notebooks, :description
  end
end
