require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'created_by belongs to user' do
    user = User.create(name: 'a user')
    task = Task.create(name: 'a task', category: 'a category', created_by: user)
    assert_equal user, task.created_by
  end
end
