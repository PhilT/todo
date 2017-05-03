require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'created_by belongs to user' do
    user = User.create(name: 'a user')
    category = Category.create(name: 'feature')
    task = Task.create(name: 'do cool stuff', category: category, created_by: user)
    assert_equal user, task.created_by
  end

  test 'valid task' do
    task = Task.create
    assert !task.valid?
    assert task.errors.include?(:category)
    assert task.errors.include?(:name)
  end

end
