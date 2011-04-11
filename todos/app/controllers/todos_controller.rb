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
    render :json => @todo.attributes.merge(:status => "OK")
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update_attributes(params[:todo])
    render :json => @todo.attributes.merge(:status => "OK")
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render :json => @todo.attributes.merge(:status => "OK")
  end
end
