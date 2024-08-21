import { useVehicleActions } from "../../hooks/useVehicleActions"

export default function CreateNewVehicle() {
    const { createVehicle } = useVehicleActions();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form)
        const plate = formData.get('vehicleName') as string;

        createVehicle({ plate: plate, waypoints: [], id: ""});
        form.reset();
    }

    return (
        <div>
            <h2>Create Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    Name:
                    <input type="text" name="vehicleName" placeholder="Vehicle 01" />

                </p>
                <p>
                    Details:
                    <input type="text" name="vehicleDetails" placeholder="Lorem Ipsum" />

                </p>
                <button type="submit" style={{ marginTop: "16px" }}>
                    Create Vehicle
                </button>
            </form>
        </div>

    )
}