import { Middleware, Tuple, configureStore, isAction } from "@reduxjs/toolkit";
import vehicleReducer, { addVehicle, deleteVehicleById } from "./vehicles/slice";

const syncWithApiMiddleware: Middleware = (api) => (next) => (action) => {

    if (isAction(action) && addVehicle.match(action)) {

        const url = `${import.meta.env.VITE_API_ROUTE + '/vehicle'}`;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({plate: action.payload.plate})
        })
        .then((res) => res.json())
        .then((data) => {
            action.payload.id = data.id;
            next(action);
        })
        .catch((err) => {throw new Error(`Error ${err.status}: Error creating vehicle`)});
    }
    else if (isAction(action) && deleteVehicleById.match(action)) {
        next(action);
        const vehicleIdToRemove = action.payload
        fetch(`${import.meta.env.VITE_API_ROUTE + vehicleIdToRemove}`, {
            method: 'DELETE'
        })
            .then(res => {
                throw new Error(`Error ${res.status}: Error removing vehicle`);
            })
    }else{
        next(action);
    }
    localStorage.setItem(`${import.meta.env.VITE_STORE_NAME}`, JSON.stringify(api.getState()));
};

export const store = configureStore({
    reducer: {
        vehicles: vehicleReducer,
    },
    middleware: () => new Tuple(syncWithApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;