class Api::NotebooksController < ApplicationController
  def create
    @notebook = Notebookbook.new(notebook_params)
    if @notebook.save
      render :show
    else
      render json: @notebook.error.full_messages, status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
  end

  def show
    @notebook = Notebook.find(params[:id])
    render :show
  end

  def destroy

  end

  def notebook_params
    params.require(:notebook).permit(:title, :description)
  end
end
