Rails.application.routes.draw do
  get 'home/index'
  resources :cities
  devise_for :users
  get 'dashboard/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'dashboard#index'
end
