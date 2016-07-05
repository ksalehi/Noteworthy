class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :current_notebook, :log_in, :log_out, :ensure_logged_in

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def current_notebook
    if params[:notebookId]
      return Notebook.find(params[:notebookId])
    else
      notebook_title = "#{current_user.username}'s Notebook"
      return Notebook.find_by(title: notebook_title)
    end
  end

  def log_in(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def log_out
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def ensure_logged_in
    redirect_to '/' unless current_user
  end
end
