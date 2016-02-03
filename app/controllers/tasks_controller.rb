class TasksController < ApplicationController
  before_filter :authenticate_user!

  def update
    project = Project.find(params[:project_id])
    task = project.tasks.find(params[:id])
    task.update(:body => params[:task][:body])

    respond_with project, task
  end

  def date
    project = Project.find(params[:project_id])
    task = project.tasks.find(params[:id])
    task.update(:deadline => params[:task][:deadline])

    respond_with project, task
  end

  def destroy
    project = Project.find(params[:project_id])
    task = project.tasks.find(params[:id]).destroy
    respond_with project, task
  end

  def create
    project = Project.find(params[:project_id])
    task = project.tasks.create(task_params.merge(user_id: current_user.id))
    respond_with project, task
  end

  def uprate
    project = Project.find(params[:project_id])
    task = project.tasks.find(params[:id])
    task.increment!(:priority)

    respond_with project, task
  end


  def derate
    project = Project.find(params[:project_id])
    task = project.tasks.find(params[:id])
    task.update(:priority => task.priority - 1)

    respond_with project, task
  end

  def done
    project = Project.find(params[:project_id])
    task = project.tasks.find(params[:id])
    task.update(:done => true)

    respond_with project, task
  end

  private

  def task_params
    params.require(:task).permit(:body)
  end
end
