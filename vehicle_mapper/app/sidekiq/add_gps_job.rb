class AddGpsJob
  include Sidekiq::Job

  def perform(vehicle_plate, latitude, longitude, sent_at)
    
    @vehicle = check_vehicle(vehicle_plate)
    @waypoint = Waypoint.new(
      latitude: waypoint_params[:latitude],
      longitude: waypoint_params[:longitude],
      vehicles_id: @vehicle[:id],
      sent_at: waypoint_params[:sent_at]
    )
    
    
    @waypoint.save
  end

  def check_vehicle(vehicle)
    @vehicle = Vehicle.find_by(plate: vehicle)
    if @vehicle
      return @vehicle
    else
      @vehicle = Vehicle.new(plate: vehicle)
      @vehicle.save
    end
    return @vehicle
  end

end
