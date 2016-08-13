class Api::TagsController < ApplicationController
  def create
    tag = Tag.find_or_create_by(tag: tag_params[:tag])
    tagging = Tagging.find_or_create_by(note_id: tag_params[:noteId], tag: tag)
    @note = tagging.note
    render 'api/notes/show'
  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag.destroy
      @note = Note.find(params[:tagData][:noteId])
      render 'api/notes/show'
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def tag_params
    params.require(:tag).permit(:tag, :noteId)
  end
end
