class Api::V1::VehicleController < ApplicationController
  def index
    logger.info ENV["MAX_WAYPOINTS_COUNT"]
    @vehicles_with_data = []
    @vehicles = Vehicle.all.each do |vehicle|
      @waypoints = Waypoint
      .select(:id, :latitude, :longitude, :sent_at)
      .where(vehicles_id: vehicle.id)
      .order(sent_at: :desc)
      .limit(ENV["MAX_WAYPOINTS_COUNT"])
      @vehicles_with_data.push({   
          id: vehicle.id,
          plate: vehicle.plate,
          waypoints: @waypoints,
      })
    end

    render json: @vehicles_with_data, status: :ok
  end

  def create
    @vehicles = Vehicle.new(vehicle_params)
    
    if @vehicles.save
      render json: @vehicles, status: :created
    else
      render json: { error: "Cannot create vehicle" }, status: 400
    end
  end

  def show
    @vehicles = Vehicle.find_by(plate: params[:id])
    if @vehicles
      @waypoints = Waypoint.where(vehicles_id: @vehicles[:id])
      @vehicle_data = { vehicle: @vehicles, waypoints: @waypoints || [] }
      render json: @vehicle_data, status: :ok
    else
      render json: { error: "No vehicle where found" }, status: :not_found
    end
  end

  def destroy
    @vehicles = Vehicle.find(params[:id])
    if @vehicles
      @vehicles.destroy
      render json: @vehicles, status: :ok
    else
      render json: { error: "No vehicles where found" }, status: :not_found
    end
  end

  private

  def vehicle_params
    params.require(:vehicle).permit(:plate)
  end
end
