class Api::NotesController < ApplicationController

  def index
    @notes = Note.all
    render :index
  end

  def show
    @note = Note.find(params[:id])
    render :show
  end

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id;
    @note.notebook_id = current_notebook.id;

    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def update
    @note = Note.find(params[:id])

    if @note.update_attributes(note_params)
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @note.destroy
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end


  def note_params
    params.require(:note).permit(:title, :body)
  end
end
