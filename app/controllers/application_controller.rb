class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  # Removes root from the json
  def default_serializer_options
    {root: false}
  end

  private
  
    def logged_in_user
      unless logged_in?       
        redirect_to root_path
      end
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless @user == current_user
    end

end
