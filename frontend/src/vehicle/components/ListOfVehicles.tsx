import { useEffect } from "react";
import { useAppSelector } from "../../hooks/store";
import { useVehicleActions } from "../../hooks/useVehicleActions";

export default function ListOfVehicles() {
    const vehicles = useAppSelector((state) => state.vehicles);
    const { getAllVehicles } = useVehicleActions ();

    const url = `${import.meta.env.VITE_API_ROUTE + '/vehicle'}`;

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => getAllVehicles(data))
        .catch((err) => console.log(err));
      }, []);

    return (
        <div>
            <div>
                <h2>Vehicles</h2><br />
                <table>
                    <thead>
                        <tr>
                            <th>Vehicle Plate</th>
                            <th>Waypoints</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr id={`${'vehicle' + vehicle.id}`} >
                                <td>{vehicle.plate}</td>
                                <td>
                                    <table>
                                        {vehicle.waypoints?.map((waypoint) => (
                                            <tr id={`${'vehicle' + vehicle.id + '-wp' + waypoint.id}`}>
                                                <td>{waypoint.latitude}</td>
                                                <td>{waypoint.longitude}</td>
                                                <td>{waypoint.sent_at}</td>
                                                <td><button>Map</button></td>
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
        </div>
    )
}