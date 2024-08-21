class Api::V1::WaypointController < ApplicationController
  def index
    @waypoints = Waypoint.all

    render json: @waypoints, status: :ok
  end

  def create
    AddGpsJob.perform_async(
      params[:vehicle_identifier], 
      waypoint_params[:latitude],
      waypoint_params[:longitude],
      waypoint_params[:sent_at]
    )

    render json: {}, status: :ok
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

  def waypoint_params
    params.require(:waypoint).permit(:latitude, :longitude, :sent_at)
  end
end
