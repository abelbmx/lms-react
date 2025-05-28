import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { mockCursos } from '../../mocks/cursos';
import { 
  Play,
  BookOpen,
  Clock,
  CheckCircle,
  BarChart2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MisLecciones: React.FC = () => {
  const cursosEnProgreso = mockCursos.map(curso => ({
    ...curso,
    progreso: Math.floor(Math.random() * 100),
    ultimaLeccion: curso.modulos[0].lecciones[0]
  }));

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Lecciones</h1>
        <p className="text-gray-600 mt-1">
          Continúa tu aprendizaje donde lo dejaste
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {cursosEnProgreso.map((curso) => (
            <Card key={curso.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto">
                  <img
                    src={curso.imagen}
                    alt={curso.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="primary">{curso.categoria}</Badge>
                    <Badge
                      variant={
                        curso.nivel === 'principiante'
                          ? 'success'
                          : curso.nivel === 'intermedio'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
                    </Badge>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {curso.titulo}
                  </h2>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock size={16} className="mr-1" />
                    {Math.floor(curso.duracion / 60)} horas totales
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progreso del curso</span>
                      <span className="font-medium">{curso.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Última lección vista:
                    </h3>
                    <div className="flex items-center">
                      {curso.ultimaLeccion.tipo === 'video' ? (
                        <Play size={16} className="text-primary-600 mr-2" />
                      ) : curso.ultimaLeccion.tipo === 'texto' ? (
                        <BookOpen size={16} className="text-primary-600 mr-2" />
                      ) : (
                        <BarChart2 size={16} className="text-primary-600 mr-2" />
                      )}
                      <span className="text-gray-600">
                        {curso.ultimaLeccion.titulo}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <BookOpen size={16} className="mr-1" />
                        {curso.modulos.length} módulos
                      </span>
                      <span className="flex items-center">
                        <CheckCircle size={16} className="mr-1" />
                        {Math.floor(curso.progreso / 20)} completados
                      </span>
                    </div>
                    <Link to={`/cursos/${curso.id}/aprender`}>
                      <Button variant="primary">
                        Continuar
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Tu Progreso</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <BookOpen size={24} className="mx-auto text-primary-600 mb-2" />
                  <p className="text-2xl font-bold text-primary-600">3</p>
                  <p className="text-sm text-gray-600">Cursos en Progreso</p>
                </div>
                
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <CheckCircle size={24} className="mx-auto text-success-600 mb-2" />
                  <p className="text-2xl font-bold text-success-600">2</p>
                  <p className="text-sm text-gray-600">Cursos Completados</p>
                </div>
                
                <div className="text-center p-4 bg-warning-50 rounded-lg">
                  <Clock size={24} className="mx-auto text-warning-600 mb-2" />
                  <p className="text-2xl font-bold text-warning-600">45h</p>
                  <p className="text-sm text-gray-600">Tiempo Total de Estudio</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Próximas Evaluaciones</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h3 className="font-medium text-gray-900">
                    Evaluación Final: HTML y CSS
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Vence en 2 días
                  </p>
                  <Button variant="outline" size="sm" className="mt-3" fullWidth>
                    Comenzar
                  </Button>
                </div>
                
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h3 className="font-medium text-gray-900">
                    Quiz: React Components
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Vence en 5 días
                  </p>
                  <Button variant="outline" size="sm" className="mt-3" fullWidth>
                    Comenzar
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};