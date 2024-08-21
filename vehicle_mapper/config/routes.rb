Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :vehicle, :waypoint
    end
  end

  post "/api/v1/gps", to: "api/v1/waypoint#create"
end
