import { deleteVehicleById, filterByName, addVehicle, VehicleWithId, getAll } from "../store/vehicles/slice";
import { useAppDispatch } from "./store";


export const useVehicleActions = () => {

    const dispatch = useAppDispatch();

    const getAllVehicles = (vehicles: VehicleWithId[]) => {
        console.log('vehicles: ' + JSON.stringify(vehicles));
        dispatch(getAll(vehicles));    
    }
    const deleteVehicle = (id: string) => {
        dispatch(deleteVehicleById(id));
    };

    const filteredVehicles = (name: string) => {
        dispatch(filterByName(name));
    };

    const createVehicle = ({ plate, waypoints, id }: VehicleWithId) => {
        dispatch(addVehicle({ plate, waypoints, id }));
    }

    return {
        deleteVehicle,
        filteredVehicles,
        createVehicle,
        getAllVehicles,
    };
}

