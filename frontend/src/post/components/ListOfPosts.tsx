import { useEffect } from "react";
import { useAppSelector } from "../../hooks/store";
import { usePostActions } from "../../hooks/usePostActions";

export default function ListOfPosts() {
    const posts = useAppSelector((state) => state.posts);
    const { deletePost, getAllPosts } = usePostActions ();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}`)
        .then((res) => res.json())
        .then((data) => getAllPosts(data))
        .catch((err) => console.log(err));
      }, []);

    return (
        <div>
            <h2>Posts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Post Name</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr>
                            <td>{post.name}</td>
                            <td>{post.details}</td>
                            <td>
                                <button aria-label="Delete" onClick={() => deletePost(post.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}