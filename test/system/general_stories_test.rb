require 'application_system_test_case'

class GeneralStoriesTest < ApplicationSystemTestCase
  test 'user creates a task' do
    visit '/tasks'
    fill_in 'task_name', with: 'Work on UI'
    fill_in 'category', with: 'general'
    click 'Add'
    assert_text 'Work on UI'
  end
end
