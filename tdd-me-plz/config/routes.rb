Rails.application.routes.draw do
  get 'test_login', to: 'session#test_login'
  get 'login', to: 'session#login'
  post 'logout', to: 'session#logout'
  get '/auth/google_oauth2/callback', to: 'session#google_callback'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"

  resources :proposals, only: [:new, :create, :show]

  resources :comments, only: [:create]
end
