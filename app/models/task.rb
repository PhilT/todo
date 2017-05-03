class Task < ApplicationRecord
  belongs_to :created_by, class_name: 'User', foreign_key: 'user_id'
  belongs_to :category

  validates :name, presence: true

  def as_json(options = {})
    {
      id: id,
      name: name,
      created_by: created_by.name,
      category: category.try(:name),
      due_at: due_at,
      completed_at: completed_at
    }
  end
end
