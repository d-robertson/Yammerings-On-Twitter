Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'
  
  get 'hashtag/data', to: 'hashtag#data'
  get 'hashtag', to: 'hashtag#index'

  get 'location/data', to: 'location#data'
  get 'location', to: 'location#index'

  get 'verb', to: 'verb#index'
  
  get 'else', to: 'else#index'

end
