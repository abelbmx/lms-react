import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Registro } from './pages/auth/Registro';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ListaCursos } from './pages/cursos/ListaCursos';
import { DetalleCurso } from './pages/cursos/DetalleCurso';
import { CrearCurso } from './pages/cursos/CrearCurso';
import { MisLecciones } from './pages/cursos/MisLecciones';
import { AprendizajeCurso } from './pages/cursos/AprendizajeCurso';
import { Evaluaciones } from './pages/evaluaciones/Evaluaciones';
import { RealizarEvaluacion } from './pages/evaluaciones/RealizarEvaluacion';
import { ResultadoEvaluacion } from './pages/evaluaciones/ResultadoEvaluacion';
import { GestionUsuarios } from './pages/usuarios/GestionUsuarios';
import { Estadisticas } from './pages/estadisticas/Estadisticas';
import { Calendario } from './pages/calendario/Calendario';
import { Foros } from './pages/foros/Foros';
import { Notificaciones } from './pages/notificaciones/Notificaciones';
import { Configuracion } from './pages/configuracion/Configuracion';
import { Perfil } from './pages/perfil/Perfil';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/registro')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      {/* Páginas que requieren autenticación */}
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <ProtectedRoute>
              <ListaCursos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cursos/:id"
          element={
            <ProtectedRoute>
              <DetalleCurso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cursos/:id/aprender"
          element={
            <ProtectedRoute>
              <AprendizajeCurso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-lecciones"
          element={
            <ProtectedRoute>
              <MisLecciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-curso"
          element={
            <ProtectedRoute>
              <CrearCurso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluaciones"
          element={
            <ProtectedRoute>
              <Evaluaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluaciones/:id"
          element={
            <ProtectedRoute>
              <RealizarEvaluacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluaciones/:id/resultado"
          element={
            <ProtectedRoute>
              <ResultadoEvaluacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estadisticas"
          element={
            <ProtectedRoute>
              <Estadisticas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendario"
          element={
            <ProtectedRoute>
              <Calendario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foros"
          element={
            <ProtectedRoute>
              <Foros />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificaciones"
          element={
            <ProtectedRoute>
              <Notificaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion"
          element={
            <ProtectedRoute>
              <Configuracion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
      </Route>
      
      {/* Redireccionamiento por defecto */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;