import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockEvaluaciones } from '../../mocks/evaluaciones';
import { mockCursos } from '../../mocks/cursos';
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart2,
  Calendar,
  FileText,
  Users,
  ChevronRight,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Evaluaciones: React.FC = () => {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');

  const evaluacionesFiltradas = mockEvaluaciones.filter(evaluacion => {
    const curso = mockCursos.find(c => c.id === evaluacion.cursoId);
    const coincideTitulo = evaluacion.titulo.toLowerCase().includes(filtro.toLowerCase());
    const coincideCurso = !cursoSeleccionado || evaluacion.cursoId === cursoSeleccionado;
    return coincideTitulo && coincideCurso;
  });

  const renderProfesorView = () => (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluaciones</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las evaluaciones de tus cursos
          </p>
        </div>
        <Link to="/evaluaciones/nueva" className="mt-4 md:mt-0">
          <Button variant="primary">
            <Plus size={18} className="mr-2" />
            Crear Evaluación
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Evaluaciones</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Pendientes de Revisar</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Evaluaciones Completadas</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-6">
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Buscar evaluaciones..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                value={cursoSeleccionado}
                onChange={(e) => setCursoSeleccionado(e.target.value)}
              >
                <option value="">Todos los cursos</option>
                {mockCursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.titulo}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        {evaluacionesFiltradas.map((evaluacion) => {
          const curso = mockCursos.find(c => c.id === evaluacion.cursoId);
          return (
            <Card key={evaluacion.id} className="hover:shadow-md transition-shadow">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="p-2 rounded-lg bg-primary-100">
                          <BarChart2 size={24} className="text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {evaluacion.titulo}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {curso?.titulo}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock size={16} className="mr-1" />
                            {evaluacion.tiempoLimite} minutos
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Users size={16} className="mr-1" />
                            15 entregas
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar size={16} className="mr-1" />
                            Vence: {new Date(evaluacion.fechaFin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 flex items-center gap-2">
                    <Badge variant="warning" size="sm">8 pendientes</Badge>
                    <Link to={`/evaluaciones/${evaluacion.id}/resultado`}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );

  const renderAlumnoView = () => (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Evaluaciones</h1>
        <p className="text-gray-600 mt-1">
          Revisa tus evaluaciones pendientes y completadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Pendientes</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Completadas</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <BarChart2 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Promedio</p>
                <p className="text-2xl font-bold">8.5</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Evaluaciones Pendientes</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {evaluacionesFiltradas.slice(0, 3).map((evaluacion) => {
                const curso = mockCursos.find(c => c.id === evaluacion.cursoId);
                return (
                  <div key={evaluacion.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="p-2 rounded-lg bg-warning-100">
                          <AlertTriangle size={24} className="text-warning-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{evaluacion.titulo}</h3>
                        <p className="text-sm text-gray-500">{curso?.titulo}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock size={16} className="mr-1" />
                            {evaluacion.tiempoLimite} minutos
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar size={16} className="mr-1" />
                            Vence: {new Date(evaluacion.fechaFin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/evaluaciones/${evaluacion.id}`}>
                      <Button variant="primary" size="sm">
                        Comenzar
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Evaluaciones Completadas</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {evaluacionesFiltradas.slice(0, 3).map((evaluacion) => {
                const curso = mockCursos.find(c => c.id === evaluacion.cursoId);
                return (
                  <div key={evaluacion.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="p-2 rounded-lg bg-success-100">
                          <CheckCircle size={24} className="text-success-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{evaluacion.titulo}</h3>
                        <p className="text-sm text-gray-500">{curso?.titulo}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="success">9.5 / 10</Badge>
                          <span className="text-sm text-gray-500">
                            Completada el {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/evaluaciones/${evaluacion.id}/resultado`}>
                      <Button variant="outline" size="sm">
                        Ver Resultado
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );

  return (
    <div className="pb-16 md:pb-0">
      {user?.rol === 'alumno' ? renderAlumnoView() : renderProfesorView()}
    </div>
  );
};