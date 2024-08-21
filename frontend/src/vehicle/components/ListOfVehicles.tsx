import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/store";
import { useVehicleActions } from "../../hooks/useVehicleActions";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function ListOfVehicles() {
  const vehicles = useAppSelector((state) => state.vehicles);
  const { getAllVehicles } = useVehicleActions();

  const url = `${import.meta.env.VITE_API_ROUTE + "/vehicle"}`;
  const apiKey = `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  
  const [position, setPosition] = useState({ lat: -33.45694, lng: -70.64827 });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => getAllVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <h2>Vehicles</h2>
        <br />
        <form>
          <input
            type="text"
            placeholder="Search for Vehicle Plate"
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <table>
          <thead>
            <tr>
              <th>Vehicle Plate</th>
              <th>Waypoints</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.filter((item) => {
                return item.plate.toLowerCase().includes(filter.toLowerCase());
            }).map((vehicle) => (
              <tr key={`vehicle${vehicle.id}`}>
                <td>{vehicle.plate}</td>
                <td>
                  <table>
                    {vehicle.waypoints?.map((waypoint) => (
                      <tr
                        key={`vehicle${vehicle.id}-wp${waypoint.id}`}
                      >
                        <td>{waypoint.latitude}</td>
                        <td>{waypoint.longitude}</td>
                        <td>{waypoint.sent_at}</td>
                        <td>
                          <button
                            onClick={() => setPosition({
                              lat: parseInt(waypoint.latitude),
                              lng: parseInt(waypoint.longitude),
                            })}
                          >
                            Map
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div>
        <h2>Map</h2>
        <br />
        <div style={{ height: "50vh", width: "100%" }}>
          <APIProvider apiKey={apiKey}>
            <Map
              center={position}
              zoom={5}
              mapId={"vehicleMapper"}
            >
              <AdvancedMarker position={position} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
}
