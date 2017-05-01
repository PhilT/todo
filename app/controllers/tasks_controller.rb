class TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def create
    Task.create!(task_params)
    head :no_content
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    head :no_content
  end

  def destroy
    Task.destroy(params[:id])
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:name, :category)
          .merge(created_by: current_user)
  end

  # TODO: add devise
  def current_user
    User.last
  end
end
