import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/atoms/ui/button";

export default function UniversityDetailMockScreen() {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Detalles de la carrera {id}</h2>
            <p className="text-gray-700">
                Aquí va la información completa de la carrera y la universidad pero no se como es esta mamada.
            </p>

            <Button asChild>
                <Link to="/student-programs">← Volver</Link>
            </Button>
        </div>
    );
}
