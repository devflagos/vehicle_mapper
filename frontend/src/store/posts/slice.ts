import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
    name: string;
    details: string;
}

export interface PostWithId extends Post {
    id: string;
}

const PLACEHOLDER_POST: PostWithId[] = [
    {
        id: '1',
        name: 'Post 1',
        details: 'Details 1',
    },
    {
        id: '2',
        name: 'Post 2',
        details: 'Details 2',
    },
    {
        id: '3',
        name: 'Post 3',
        details: 'Details 3',
    },
    {
        id: '4',
        name: 'Post 4',
        details: 'Details 4',
    },
]

const initialState: PostWithId[] = (() => {
    const persistentState = localStorage.getItem(`${import.meta.env.VITE_STORE_NAME}`);
    if (persistentState) {
        return JSON.parse(persistentState).posts;
    }
    else {
        return PLACEHOLDER_POST;
    }
})();

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getAll: (state, action: PayloadAction<PostWithId[]>) => {
            state = action.payload;
            return state;
        },
        addPost: (state, action: PayloadAction<PostWithId>) => {
            return [...state, action.payload]
        },
        deletePostById: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            return state.filter((post) => post.id !== id);
        },
        filterByName: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            return state.filter((post) => post.name === name);
        },
    }
});

export default postSlice.reducer;
export const { addPost, deletePostById, filterByName, getAll } = postSlice.actions;