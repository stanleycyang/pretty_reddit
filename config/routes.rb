Rails.application.routes.draw do

  # login page
  root 'users#new'

  # This is our single page (app)  
  get '/home' => 'home#index' 

  resource :users, only: [:new, :create]

  # Resource for sessions    
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

  # get "*path" => "home#index" 

  namespace :api, defaults: {format: :json} do
    # Resource for our users
    resources :users
    # Resource for users' posts
    resources :posts
    # Resources for comments
    resources :comments
    # resources :comments, only: [:create, :update, :destroy]
  end

end
