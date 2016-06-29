class Api::NotesController < ApplicationController

  def create
    @note = Note.new(note_params)
    if @note.save
      render :show
    else
      render json: @note.error.full_messages, status: 422
    end
  end

  def update
    @note = Note.find(params[:id])
  end

  def show
    @note = Note.find(params[:id])
    render :show
  end

  def destroy

  end

  def index
    @notes = Note.all
    render :index
  end

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
