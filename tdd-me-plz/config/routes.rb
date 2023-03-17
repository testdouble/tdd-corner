Rails.application.routes.draw do
  get 'test_login', to: 'session#test_login'
  get 'login', to: 'session#login'
  post 'login', to: 'session#start_login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"

  resources :proposals, only: [:new, :create, :show]

  resources :comments, only: [:create]
end
