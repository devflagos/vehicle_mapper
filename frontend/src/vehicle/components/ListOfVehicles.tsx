import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/store";
import { useVehicleActions } from "../../hooks/useVehicleActions";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function ListOfVehicles() {
  const vehicles = useAppSelector((state) => state.vehicles);
  const { getAllVehicles } = useVehicleActions();

  const url = `${import.meta.env.VITE_API_ROUTE + "/vehicle"}`;
  const apiKey = `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

  const [position, setPosition] = useState([{ lat: 0, lng: 0 }]);
  const [filter, setFilter] = useState("");

  type Position = {
    lat: number;
    lng: number;
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => getAllVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const all_positions: Position[] = new Array<Position>();
    vehicles.forEach((vehicle) => {
      if (vehicle.waypoints.length > 0) {
        vehicle.waypoints.forEach((waypoint) => {
          all_positions.push({
            lat: parseInt(waypoint.latitude),
            lng: parseInt(waypoint.longitude),
          });
        });
      }
    });
    setPosition(all_positions);
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
            {vehicles
              .filter((item) => {
                return item.plate.toLowerCase().includes(filter.toLowerCase());
              })
              .map((vehicle) => (
                <tr key={`vehicle${vehicle.id}`}>
                  <td>{vehicle.plate}</td>
                  <td>
                    <table>
                      <tbody>
                        {vehicle.waypoints?.map((waypoint) => (
                          <tr key={`vehicle${vehicle.id}-wp${waypoint.id}`}>
                            <td>{waypoint.latitude}</td>
                            <td>{waypoint.longitude}</td>
                            <td>{waypoint.sent_at}</td>
                            <td>
                              <button
                                onClick={() =>
                                  setPosition([
                                    {
                                      lat: parseInt(waypoint.latitude),
                                      lng: parseInt(waypoint.longitude),
                                    },
                                  ])
                                }
                              >
                                Map
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
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
              defaultCenter={position[0] || { lat: 0, lng: 0 }}
              defaultZoom={1}
              mapId={"vehicleMapper"}
            >
              {position.map((position) => (
                <AdvancedMarker position={position} />
              ))}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
}
