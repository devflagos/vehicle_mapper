import { deletePostById, filterByName, addPost, PostWithId, getAll } from "../store/posts/slice";
import { useAppDispatch } from "./store";


export const usePostActions = () => {

    const dispatch = useAppDispatch();

    const getAllPosts = (posts: PostWithId[]) => {
        dispatch(getAll(posts));    
    }
    const deletePost = (id: string) => {
        dispatch(deletePostById(id));
    };

    const filteredPosts = (name: string) => {
        dispatch(filterByName(name));
    };

    const createPost = ({ name, details, id }: PostWithId) => {
        dispatch(addPost({ name, details, id}));
    }

    return {
        deletePost,
        filteredPosts,
        createPost,
        getAllPosts,
    };
}

