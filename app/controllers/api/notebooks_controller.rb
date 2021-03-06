class Api::NotebooksController < ApplicationController
  def index
    @notebooks = current_user.notebooks
    if params[:query] && !params[:query].empty?
      @notebooks = @notebooks.where(
        [
          'title LIKE :query',
          {query: "%#{params[:query]}%"}
        ]
      )
    end
    render :index
  end

  def show
    @notebook = current_user.notebooks.find(params[:id])
    render :show
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.author_id = current_user.id
    if @notebook.save
      note = Note.create(title: "Sample Note",
                  body: "Tips for getting started:\nClick the '+' icon to add a new note\nUse the styling menu to customize your note!",
                  notebook_id: @notebook.id,
                  author_id: current_user.id)
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def update
    @notebook = current_user.notebooks.find(params[:id])

    if @notebook.update_attributes(notebook_params)
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = current_user.notebooks.find(params[:id])
    if @notebook.destroy
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end


  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
