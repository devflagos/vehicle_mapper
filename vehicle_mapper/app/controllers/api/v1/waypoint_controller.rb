class Api::V1::WaypointController < ApplicationController
  def index
    @waypoints = Waypoint.all

    render json: @waypoints, status: :ok
  end

  def create
    @waypoint_data = waypoint_params
    @vehicle = check_vehicle(params[:vehicle_identifier])
    @dwaypoint = Waypoint.new(
      latitude: waypoint_params[:latitude],
      longitude: waypoint_params[:longitude],
      vehicles_id: @vehicle[:id],
      sent_at: waypoint_params[:sent_at]
    )
    
    if @dwaypoint.save
      render json: @waypoints, status: :created
    else
      render json: { error: "Cannot create waypoint" }, status: 400
    end
  end

  def show
    @waypoints = Waypoint.find(params[:id])
    if @waypoints
      render json: @waypoints, status: :ok
    else
      render json: { error: "No waypoint where found" }, status: :not_found
    end
  end

  def destroy
    @waypoints = Waypoint.find(params[:id])
    if @waypoints
      @waypoints.destroy
      render json: @waypoints, status: :ok
    else
      render json: { error: "No waypoints where found" }, status: :not_found
    end
  end

  private

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

  def waypoint_params
    params.require(:waypoint).permit(:latitude, :longitude, :sent_at)
  end
end
