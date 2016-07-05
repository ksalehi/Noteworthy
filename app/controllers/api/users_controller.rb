class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      notebook = Notebook.create(title: "#{@user.username}'s Notebook", author_id: @user.id)
      Note.create(title: "Welcome to Noteworthy", body: "", notebook_id: notebook.id, author_id: @user.id)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def user_params
    params.require(:userData).permit(:username, :password)
  end
end
