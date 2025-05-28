import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  BarChart2, 
  Calendar, 
  Clock, 
  Award,
  TrendingUp,
  BookMarked,
  GraduationCap,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { mockCursos } from '../../mocks/cursos';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState({
    cursosTotales: 0,
    cursosEnProgreso: 0,
    cursosCompletados: 0,
    evaluacionesPendientes: 0,
    calificacionPromedio: 0,
  });

  useEffect(() => {
    // Simulación de carga de datos
    const cargarEstadisticas = () => {
      if (user?.rol === 'alumno') {
        setEstadisticas({
          cursosTotales: 5,
          cursosEnProgreso: 3,
          cursosCompletados: 2,
          evaluacionesPendientes: 2,
          calificacionPromedio: 8.7,
        });
      } else if (user?.rol === 'profesor') {
        setEstadisticas({
          cursosTotales: 4,
          cursosEnProgreso: 4,
          cursosCompletados: 0,
          evaluacionesPendientes: 10,
          calificacionPromedio: 8.3,
        });
      } else {
        setEstadisticas({
          cursosTotales: 15,
          cursosEnProgreso: 10,
          cursosCompletados: 5,
          evaluacionesPendientes: 25,
          calificacionPromedio: 8.5,
        });
      }
    };

    cargarEstadisticas();
  }, [user]);

  const renderSuperAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Cursos Totales</p>
                <p className="text-2xl font-bold">{estadisticas.cursosTotales}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold">120</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
                <BarChart2 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Evaluaciones</p>
                <p className="text-2xl font-bold">35</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tasa de Finalización</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold">Actividad Reciente</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-medium">5 nuevos usuarios registrados</p>
                  <p className="text-sm text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-secondary-100 text-secondary-600 mr-3">
                  <BookMarked size={20} />
                </div>
                <div>
                  <p className="font-medium">Nuevo curso añadido: "Machine Learning Avanzado"</p>
                  <p className="text-sm text-gray-500">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <p className="font-medium">15 evaluaciones completadas</p>
                  <p className="text-sm text-gray-500">Hace 1 día</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Acciones Rápidas</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Link to="/crear-curso">
                <Button variant="primary" fullWidth className="justify-start">
                  <BookOpen size={18} className="mr-2" />
                  Crear Nuevo Curso
                </Button>
              </Link>
              <Link to="/usuarios/nuevo">
                <Button variant="outline" fullWidth className="justify-start">
                  <Users size={18} className="mr-2" />
                  Añadir Usuario
                </Button>
              </Link>
              <Link to="/evaluaciones/nueva">
                <Button variant="outline" fullWidth className="justify-start">
                  <BarChart2 size={18} className="mr-2" />
                  Crear Evaluación
                </Button>
              </Link>
              <Link to="/estadisticas">
                <Button variant="outline" fullWidth className="justify-start">
                  <TrendingUp size={18} className="mr-2" />
                  Ver Estadísticas
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cursos Populares</h2>
            <Link to="/cursos" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Ver todos <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockCursos.slice(0, 3).map((curso) => (
                <div key={curso.id} className="flex items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img src={curso.imagen} alt={curso.titulo} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{curso.titulo}</h3>
                    <div className="flex items-center mt-1">
                      <Badge variant="success" size="sm" className="mr-2">
                        {curso.nivel}
                      </Badge>
                      <span className="text-sm text-gray-500">{curso.calificacionPromedio} / 5</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Users size={14} className="mr-1" />
                    45
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Próximos Eventos</h2>
            <Link to="/calendario" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Ver calendario <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Lanzamiento de cursos de verano</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    15 de junio, 10:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-secondary-100 text-secondary-600 mr-3">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Webinar: Nuevas tendencias en educación online</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    20 de junio, 5:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mantenimiento de plataforma</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    30 de junio, 12:00 AM - 2:00 AM
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );

  const renderProfesorDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Mis Cursos</p>
                <p className="text-2xl font-bold">{estadisticas.cursosTotales}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Estudiantes</p>
                <p className="text-2xl font-bold">78</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <BarChart2 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Evaluaciones Pendientes</p>
                <p className="text-2xl font-bold">{estadisticas.evaluacionesPendientes}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Calificación Promedio</p>
                <p className="text-2xl font-bold">{estadisticas.calificacionPromedio}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold">Actividad Reciente de Estudiantes</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg" alt="Estudiante" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">Carlos Rodríguez completó el módulo "Introducción a HTML"</p>
                  <p className="text-sm text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Estudiante" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">Ana Martínez realizó la evaluación "CSS Básico"</p>
                  <p className="text-sm text-gray-500">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" alt="Estudiante" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">Pedro Sánchez envió una pregunta en el foro</p>
                  <p className="text-sm text-gray-500">Hace 1 día</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Acciones Rápidas</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Link to="/crear-curso">
                <Button variant="primary" fullWidth className="justify-start">
                  <BookOpen size={18} className="mr-2" />
                  Crear Nuevo Curso
                </Button>
              </Link>
              <Link to="/evaluaciones/nueva">
                <Button variant="outline" fullWidth className="justify-start">
                  <BarChart2 size={18} className="mr-2" />
                  Crear Evaluación
                </Button>
              </Link>
              <Link to="/foros">
                <Button variant="outline" fullWidth className="justify-start">
                  <MessageSquare size={18} className="mr-2" />
                  Revisar Foros
                </Button>
              </Link>
              <Link to="/estadisticas">
                <Button variant="outline" fullWidth className="justify-start">
                  <TrendingUp size={18} className="mr-2" />
                  Ver Estadísticas
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Mis Cursos</h2>
            <Link to="/mis-cursos" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Ver todos <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockCursos.filter(c => c.profesorId === user?.id).slice(0, 3).map((curso) => (
                <div key={curso.id} className="flex items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img src={curso.imagen} alt={curso.titulo} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{curso.titulo}</h3>
                    <div className="flex items-center mt-1">
                      <Badge variant="success" size="sm" className="mr-2">
                        {curso.nivel}
                      </Badge>
                      <span className="text-sm text-gray-500">{curso.calificacionPromedio} / 5</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Users size={14} className="mr-1" />
                    45
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Próximas Evaluaciones</h2>
            <Link to="/evaluaciones" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Ver todas <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Evaluación Final: HTML y CSS</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Vence: 30 de junio, 11:59 PM
                  </p>
                </div>
                <Badge variant="warning" size="sm">
                  10 pendientes
                </Badge>
              </div>
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Quiz: Componentes en React</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Vence: 15 de junio, 11:59 PM
                  </p>
                </div>
                <Badge variant="warning" size="sm">
                  5 pendientes
                </Badge>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Examen Parcial: UX/UI</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Vence: 12 de junio, 11:59 PM
                  </p>
                </div>
                <Badge variant="warning" size="sm">
                  8 pendientes
                </Badge>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );

  const renderAlumnoDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Cursos En Progreso</p>
                <p className="text-2xl font-bold">{estadisticas.cursosEnProgreso}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Cursos Completados</p>
                <p className="text-2xl font-bold">{estadisticas.cursosCompletados}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <BarChart2 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Evaluaciones Pendientes</p>
                <p className="text-2xl font-bold">{estadisticas.evaluacionesPendientes}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Calificación Promedio</p>
                <p className="text-2xl font-bold">{estadisticas.calificacionPromedio}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold">Mis Cursos en Progreso</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="pb-5 border-b border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img src={mockCursos[0].imagen} alt={mockCursos[0].titulo} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{mockCursos[0].titulo}</h3>
                    <p className="text-sm text-gray-500">Profesor: María González</p>
                  </div>
                  <Badge variant="primary" size="sm">
                    75% completado
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Última actividad: hace 2 días</span>
                  <Link to={`/cursos/${mockCursos[0].id}`} className="text-xs text-primary-600 hover:text-primary-700">
                    Continuar
                  </Link>
                </div>
              </div>
              
              <div className="pb-5 border-b border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img src={mockCursos[1].imagen} alt={mockCursos[1].titulo} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{mockCursos[1].titulo}</h3>
                    <p className="text-sm text-gray-500">Profesor: Juan Pérez</p>
                  </div>
                  <Badge variant="primary" size="sm">
                    40% completado
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Última actividad: hace 5 días</span>
                  <Link to={`/cursos/${mockCursos[1].id}`} className="text-xs text-primary-600 hover:text-primary-700">
                    Continuar
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img src={mockCursos[2].imagen} alt={mockCursos[2].titulo} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{mockCursos[2].titulo}</h3>
                    <p className="text-sm text-gray-500">Profesor: Laura López</p>
                  </div>
                  <Badge variant="primary" size="sm">
                    10% completado
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Última actividad: hace 1 semana</span>
                  <Link to={`/cursos/${mockCursos[2].id}`} className="text-xs text-primary-600 hover:text-primary-700">
                    Continuar
                  </Link>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Próximas Entregas</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <p className="font-medium">Evaluación Final: HTML y CSS</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Vence: 15 de junio, 11:59 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="p-2 rounded-full bg-error-100 text-error-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <p className="font-medium">Quiz: Componentes en React</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Vence: Mañana, 11:59 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <p className="font-medium">Proyecto Final: UX/UI</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Vence: 30 de junio, 11:59 PM
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cursos Recomendados</h2>
            <Link to="/cursos" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Ver todos <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockCursos.slice(0, 3).map((curso) => (
                <div key={curso.id} className="flex items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img src={curso.imagen} alt={curso.titulo} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{curso.titulo}</h3>
                    <div className="flex items-center mt-1">
                      <Badge variant="success" size="sm" className="mr-2">
                        {curso.nivel}
                      </Badge>
                      <span className="text-sm text-gray-500">{curso.calificacionPromedio} / 5</span>
                    </div>
                  </div>
                  <Link to={`/cursos/${curso.id}`}>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Actividad del Foro</h2>
            <Link to="/foros" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Ver foros <ArrowRight size={16} className="ml-1" />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" alt="Profesor" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">María González publicó en "Dudas sobre HTML y CSS"</p>
                  <p className="text-sm text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" alt="Estudiante" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">Pedro Sánchez respondió a tu pregunta en "React Hooks"</p>
                  <p className="text-sm text-gray-500">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Estudiante" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">Ana Martínez inició un nuevo tema: "Mejores prácticas de UX"</p>
                  <p className="text-sm text-gray-500">Ayer</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          ¡Bienvenido{user?.nombre ? `, ${user.nombre}` : ''}!
        </h1>
        <p className="text-gray-600 mt-1">
          {user?.rol === 'superadmin'
            ? 'Aquí encontrarás un resumen de toda la actividad de la plataforma.'
            : user?.rol === 'profesor'
            ? 'Aquí encontrarás un resumen de tus cursos y estudiantes.'
            : 'Aquí encontrarás un resumen de tu progreso y actividades pendientes.'}
        </p>
      </div>

      {user?.rol === 'superadmin' && renderSuperAdminDashboard()}
      {user?.rol === 'profesor' && renderProfesorDashboard()}
      {user?.rol === 'alumno' && renderAlumnoDashboard()}
    </div>
  );
};