class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :category
      t.references :user, foreign_key: true
      t.datetime :due_at
      t.datetime :completed_at

      t.timestamps
    end
  end
end
