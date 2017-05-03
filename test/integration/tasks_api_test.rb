require 'test_helper'

class TasksApiTest < ActionDispatch::IntegrationTest
  test 'lists tasks' do
    task = create_task
    get '/tasks', as: :json

    assert_response :success
    assert_equal [attributes(task)], response.parsed_body
  end

  test 'creates tasks' do
    assert_difference -> { Task.count } do
      post '/tasks', params: {
        name: 'Work on UI',
        category_id: category.id.to_s,
        created_by: user.id
      }, as: :json
    end

    assert_response :success
  end

  test 'updates tasks' do
    task = create_task

    assert_changes -> { task.reload.name },
                   from: 'Work on UI',
                   to: 'Work on frontend' do
      patch "/tasks/#{task.id}", params: {
        task: {
          name: 'Work on frontend'
        }
      }, as: :json
    end
    assert_response :success
  end

  test 'destroys tasks' do
    task = create_task

    assert_difference -> { Task.count }, -1 do
      delete "/tasks/#{task.id}", as: :json
    end

    assert_response :success
  end

  private

  def attributes(task)
    {
      "id" => task.id,
      "name" => task.name,
      "created_by" => user.name,
      "category" => category.name,
      "due_at" => nil,
      "completed_at" => nil,
      "time_taken" => nil
    }
  end

  def user
    @user ||= User.create(name: 'A user')
  end

  def create_task
    Task.create(name: 'Work on UI', category: category, created_by: user)
  end

  def category
    @category ||= Category.create(name: 'feature')
  end
end
