class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :name
      t.string :category
      t.string :author
      t.float :price

      t.timestamps
    end
  end
end
