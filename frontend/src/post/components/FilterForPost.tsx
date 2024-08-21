import { usePostActions } from "../../hooks/usePostActions"

export default function FilterForPosts() {
    const { filteredPosts } = usePostActions();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form)
        const name = formData.get('postName') as string;

        filteredPosts(name);
        form.reset();
    }

    return (
        <div>
            <h2>Filter Post</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    Name:
                    <input type="text" name="postName" placeholder="Post 01" />

                </p>
                <button type="submit" style={{ marginTop: "16px" }}>
                    Search
                </button>
            </form>
        </div>

    )
}