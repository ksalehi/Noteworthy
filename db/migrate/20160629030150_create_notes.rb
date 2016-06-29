class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body
      t.integer :author_id, null: false, index: true
      t.integer :notebook_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
