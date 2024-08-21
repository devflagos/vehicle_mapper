import { Middleware, Tuple, configureStore, isAction } from "@reduxjs/toolkit";
import postReducer, { addPost, deletePostById } from "./posts/slice";

const syncWithApiMiddleware: Middleware = (api) => (next) => (action) => {

    if (isAction(action) && addPost.match(action)) {

        fetch(`${import.meta.env.VITE_API_ROUTE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: action.payload.name, details: action.payload.details})
        })
        .then((res) => res.json())
        .then((data) => {
            action.payload.id = data.id;
            next(action);
        })
        .catch((err) => {throw new Error(`Error ${err.status}: Error creating post`)});
    }
    else if (isAction(action) && deletePostById.match(action)) {
        next(action);
        const postIdToRemove = action.payload
        fetch(`${import.meta.env.VITE_API_ROUTE + postIdToRemove}`, {
            method: 'DELETE'
        })
            .then(res => {
                throw new Error(`Error ${res.status}: Error removing post`);
            })
    }else{
        next(action);
    }
    localStorage.setItem(`${import.meta.env.VITE_STORE_NAME}`, JSON.stringify(api.getState()));
};

export const store = configureStore({
    reducer: {
        posts: postReducer,
    },
    middleware: () => new Tuple(syncWithApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;