class TasksController < ActionController::API
  def index
    render json: Task.includes(:category, :created_by)
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
    params.require(:task).permit(:name, :category_id, :due_at, :completed_at)
          .merge(created_by: current_user)
  end

  # TODO: add devise
  def current_user
    User.last
  end
end
