import { usePostActions } from "../../hooks/usePostActions"

export default function CreateNewPost() {
    const { createPost } = usePostActions();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form)
        const name = formData.get('postName') as string;
        const details = formData.get('postDetails') as string;

        createPost({ name: name, details: details, id: ""});
        form.reset();
    }

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    Name:
                    <input type="text" name="postName" placeholder="Post 01" />

                </p>
                <p>
                    Details:
                    <input type="text" name="postDetails" placeholder="Lorem Ipsum" />

                </p>
                <button type="submit" style={{ marginTop: "16px" }}>
                    Create Post
                </button>
            </form>
        </div>

    )
}