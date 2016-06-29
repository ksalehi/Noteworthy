class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:userData][:username], params[:userData][:password])
    if @user
      log_in(@user)
      render "api/users/show"
    else
      render json: {base: ['invalid credentials']}, status: 401
    end
  end

  def destroy
    if current_user
      log_out
      render json: {}
    else
      render json: {base: ['no user to log out']}, status: 404
    end
  end
end
