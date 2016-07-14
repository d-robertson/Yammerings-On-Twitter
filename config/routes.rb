Rails.application.routes.draw do
  get 'else/index'

  get 'verb/index'

  get 'location/index'

  get 'main/index'

  get 'hashtag/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'
end
