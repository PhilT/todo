class Task < ApplicationRecord
  include ActionView::Helpers::TextHelper

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
      completed_at: completed_at,
      time_taken: time_taken
    }
  end

  def time_taken
    if completed_at
      days = (completed_at.to_date - created_at.to_date).to_i
      pluralize(days, 'day')
    end
  end
end
