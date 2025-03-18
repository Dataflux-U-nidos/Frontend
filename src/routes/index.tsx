// /src/routes/AppRoutes.tsx
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Carga perezosa (lazy) de componentes
const Login = lazy(() => import('../components/screens/AuthScreen'))
const TestCrud = lazy(() => import('../components/templates/TestCrud'))

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    {/* Redirige la raíz a /login */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Ruta login */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas con Layout */}

                    {/* Ruta de prueba */}
                    <Route path="/prueba" element={<TestCrud />} />
                    
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
