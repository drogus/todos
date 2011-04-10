class TodosController < ApplicationController
  respond_to :json

  def index
    respond_with(@todos = Todo.all)
  end

  def show
    respond_with(@todo = Todo.find(params[:id]))
  end

  def create
    @todo = Todo.create(params[:todo])
    respond_with(@todo)
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update_attributes(params[:todo])
    respond_with(@todo)
  end

  def destroy
    respond_with(Todo.find(params[:id]).destroy)
  end
end
