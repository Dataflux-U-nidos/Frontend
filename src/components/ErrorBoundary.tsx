// src/components/ErrorBoundary.tsx
import React from "react";

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: any, info: any) {
        // Puedes enviar el error a tu servicio de logs
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center">
                    <h2 className="text-xl font-bold text-red-600">
                        ¡Ups! Algo salió mal cargando el test.
                    </h2>
                    <p>Intenta recargar la página o contáctanos.</p>
                </div>
            );
        }
        return this.props.children;
    }
}
