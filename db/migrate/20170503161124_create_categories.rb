class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :name

      t.timestamps
    end

    remove_column :tasks, :category
    add_reference :tasks, :category
  end
end
