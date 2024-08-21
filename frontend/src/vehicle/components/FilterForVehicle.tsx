import { useVehicleActions } from "../../hooks/useVehicleActions"

export default function FilterForVehicles() {
    const { filteredVehicles } = useVehicleActions();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form)
        const name = formData.get('vehicleName') as string;

        filteredVehicles(name);
        form.reset();
    }

    return (
        <div>
            <h2>Filter Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    Name:
                    <input type="text" name="vehicleName" placeholder="Vehicle 01" />

                </p>
                <button type="submit" style={{ marginTop: "16px" }}>
                    Search
                </button>
            </form>
        </div>

    )
}