Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :notes, only: [:create, :update, :destroy, :show, :index]
    resources :notebooks, only: [:create, :update, :destroy, :show, :index]
    resources :tags, only: [:create]
  end
end
