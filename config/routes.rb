Rails.application.routes.draw do

  get 'sessions/new'

  # This is our single page (app)  
  root 'home#index'  
  get '*', to: redirect('/')  

  namespace :api, defaults: {format: :json} do
    # Resource for our users
    resources :users, only: [ :create, :update, :destroy]

    # Resource for users' posts
    resources :posts, except: [:new, :edit]
    # Resource for sessions
    resources :sessions, only: [:new, :create, :destroy]
    # Resources for comments
    resources :comments, only: [:create, :update, :destroy]
  end

end
