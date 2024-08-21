import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Vehicle {
    plate: string;
}

export interface Waypoint {
    id: number;
    latitude: string;
    longitude: string;
    sent_at: string;
}

export interface VehicleData extends Vehicle {
    waypoints: Waypoint[];
}

export interface VehicleWithId extends Vehicle {
    id: string;
    waypoints: Waypoint[];
}

const PLACEHOLDER_POST: VehicleWithId[] = [
    {
        id: '1',
        plate: 'AAAA11',
        waypoints: []
    },
    {
        id: '2',
        plate: 'BBBB22',
        waypoints: []
    },
    {
        id: '3',
        plate: 'CCCC33',
        waypoints: []
    },
    {
        id: '4',
        plate: 'DDDD44',
        waypoints: []
    },
]

const initialState: VehicleWithId[] = (() => {
    const persistentState = localStorage.getItem(`${import.meta.env.VITE_STORE_NAME}`);
    if (persistentState) {
        return JSON.parse(persistentState).vehicles;
    }
    else {
        return PLACEHOLDER_POST;
    }
})();

export const vehicleSlice = createSlice({
    name: "vehicles",
    initialState,
    reducers: {
        getAll: (state, action: PayloadAction<VehicleWithId[]>) => {
            state = action.payload;
            return state;
        },
        addVehicle: (state, action: PayloadAction<VehicleWithId>) => {
            return [...state, action.payload]
        },
        deleteVehicleById: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            return state.filter((vehicle) => vehicle.id !== id);
        },
        filterByName: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            return state.filter((vehicle) => vehicle.plate === name);
        },
    }
});

export default vehicleSlice.reducer;
export const { addVehicle, deleteVehicleById, filterByName, getAll } = vehicleSlice.actions;