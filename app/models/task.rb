class Task < ApplicationRecord
  belongs_to :created_by, class_name: 'User', foreign_key: 'user_id'
end
