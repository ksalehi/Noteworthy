class Api::NotesController < ApplicationController

  def index
    if params[:query] && !params[:query].empty?
      if 'untitled'.match(params[:query].downcase)
        @notes = current_notebook.notes.where('title = ?', '')
      else
        @notes = current_notebook.notes.where(
          [
            'LOWER(title) LIKE :query OR body LIKE :query',
            {query: "%#{params[:query].downcase}%"}
          ]
        )
      end
      if @notes.empty?
        @notes = current_notebook.notes.where('title = ?', '')
      end
    else
      @notes = current_notebook.notes
    end
    render :index
  end

  def show
    @note = current_user.notes.find(params[:id])
    render :show
  end

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id;

    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def update
    @note = current_user.notes.find(params[:id])

    if @note.update_attributes(note_params)
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = current_user.notes.find(params[:id])
    if @note.destroy
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end


  def note_params
    params.require(:note).permit(:title, :body, :notebook_id)
  end
end
