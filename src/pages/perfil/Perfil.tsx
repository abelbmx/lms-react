import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { 
  Award,
  BookOpen,
  Calendar,
  Clock,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Star,
  User as UserIcon,
  Users
} from 'lucide-react';
import { mockCursos } from '../../mocks/cursos';

export const Perfil: React.FC = () => {
  const { user } = useAuth();

  const logros = [
    {
      id: '1',
      titulo: 'Primer Curso Completado',
      descripcion: 'Completaste tu primer curso en la plataforma',
      fecha: '2024-01-15',
      icono: <GraduationCap size={24} className="text-primary-600" />
    },
    {
      id: '2',
      titulo: 'Estudiante Dedicado',
      descripcion: '10 horas de estudio acumuladas',
      fecha: '2024-02-01',
      icono: <Clock size={24} className="text-success-600" />
    },
    {
      id: '3',
      titulo: 'Colaborador Activo',
      descripcion: '5 respuestas útiles en el foro',
      fecha: '2024-02-15',
      icono: <Users size={24} className="text-warning-600" />
    }
  ];

  const estadisticas = {
    cursosCompletados: 3,
    horasEstudio: 45,
    calificacionPromedio: 9.2,
    participacionForos: 12
  };

  return (
    <div className="pb-16 md:pb-0">
      {/* Encabezado del perfil */}
      <div className="relative mb-6">
        <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg"></div>
        <div className="absolute -bottom-6 left-6 flex items-end">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg'}
            alt={user?.nombre}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className="ml-4 mb-2">
            <h1 className="text-2xl font-bold text-white">
              {user?.nombre} {user?.apellido}
            </h1>
            <p className="text-primary-100">{user?.rol}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            icon={<Edit size={16} />}
          >
            Editar Perfil
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información personal */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <UserIcon size={20} className="mr-2" />
                Información Personal
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center mt-1">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <div className="flex items-center mt-1">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <p>Madrid, España</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Miembro desde</p>
                  <div className="flex items-center mt-1">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <p>{new Date(user?.fechaRegistro || '').toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rol</p>
                  <div className="flex items-center mt-1">
                    <UserIcon size={16} className="text-gray-400 mr-2" />
                    <Badge
                      variant={
                        user?.rol === 'superadmin'
                          ? 'error'
                          : user?.rol === 'profesor'
                          ? 'warning'
                          : 'success'
                      }
                      size="sm"
                    >
                      {user?.rol}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Award size={20} className="mr-2" />
                Estadísticas
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <BookOpen size={24} className="mx-auto text-primary-600 mb-2" />
                  <p className="text-2xl font-bold text-primary-600">
                    {estadisticas.cursosCompletados}
                  </p>
                  <p className="text-sm text-gray-600">Cursos Completados</p>
                </div>
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <Clock size={24} className="mx-auto text-success-600 mb-2" />
                  <p className="text-2xl font-bold text-success-600">
                    {estadisticas.horasEstudio}h
                  </p>
                  <p className="text-sm text-gray-600">Horas de Estudio</p>
                </div>
                <div className="text-center p-4 bg-warning-50 rounded-lg">
                  <Star size={24} className="mx-auto text-warning-600 mb-2" />
                  <p className="text-2xl font-bold text-warning-600">
                    {estadisticas.calificacionPromedio}
                  </p>
                  <p className="text-sm text-gray-600">Calificación Media</p>
                </div>
                <div className="text-center p-4 bg-error-50 rounded-lg">
                  <Users size={24} className="mx-auto text-error-600 mb-2" />
                  <p className="text-2xl font-bold text-error-600">
                    {estadisticas.participacionForos}
                  </p>
                  <p className="text-sm text-gray-600">Participaciones</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Cursos en progreso */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <BookOpen size={20} className="mr-2" />
                Cursos en Progreso
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {mockCursos.slice(0, 3).map((curso) => (
                  <div
                    key={curso.id}
                    className="flex items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={curso.imagen}
                      alt={curso.titulo}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{curso.titulo}</h3>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant={
                            curso.nivel === 'principiante'
                              ? 'success'
                              : curso.nivel === 'intermedio'
                              ? 'warning'
                              : 'error'
                          }
                          size="sm"
                          className="mr-2"
                        >
                          {curso.nivel}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {Math.floor(curso.duracion / 60)} horas
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: '60%' }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">60% completado</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logros */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Award size={20} className="mr-2" />
                Logros
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {logros.map((logro) => (
                  <div
                    key={logro.id}
                    className="flex items-start p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="p-2 bg-gray-50 rounded-lg mr-3">
                      {logro.icono}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{logro.titulo}</h3>
                      <p className="text-sm text-gray-500">{logro.descripcion}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Obtenido el {new Date(logro.fecha).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Certificaciones */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <GraduationCap size={20} className="mr-2" />
                Certificaciones
              </h2>
            </CardHeader>
            <CardBody>
              <div className="text-center py-8">
                <GraduationCap size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Aún no has obtenido ninguna certificación
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Ver cursos certificados
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};