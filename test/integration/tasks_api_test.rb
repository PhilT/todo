require 'test_helper'

class TasksApiTest < ActionDispatch::IntegrationTest
  test 'lists tasks' do
    task = create_task
    get '/tasks', as: :json
    assert_response :success
    assert_equal [task.attributes], response.parsed_body
  end

  test 'creates tasks' do
    assert_difference -> { Task.count } do
      post '/tasks', params: {
        name: 'Work on UI',
        category: 'general',
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

  def user
    @user ||= User.create(name: 'A user')
  end

  def create_task
    Task.create(name: 'Work on UI', category: 'general', created_by: user)
  end
end
