class ProjectsController < ApplicationController
  before_filter :authenticate_user!
  def index
    respond_with current_user.projects.all
  end

  def update
    project = Project.find(params[:id])
    project.update(:title => params[:project][:title])

    respond_with project
  end

  def destroy
    project = Project.find(params[:id])
    project.tasks.destroy
    project.destroy
    respond_with project
  end

  def create
    respond_with Project.create(project_params.merge(user_id: current_user.id))
  end

  def show
    respond_with Project.find(params[:id])
  end

private
  def project_params
    params.require(:project).permit(:title)
  end
end
