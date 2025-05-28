import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCursos } from '../../mocks/cursos';
import { mockUsers } from '../../mocks/usuarios';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Clock, 
  Users, 
  BookOpen, 
  Star, 
  ChevronRight, 
  Play, 
  FileText, 
  CheckCircle, 
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export const DetalleCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const curso = mockCursos.find(c => c.id === id);
  const [moduloSeleccionado, setModuloSeleccionado] = useState(curso?.modulos[0].id || '');
  const [inscrito, setInscrito] = useState(false);
  
  if (!curso) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Curso no encontrado</h2>
        <p className="text-gray-600 mb-6">El curso que estás buscando no existe o ha sido eliminado.</p>
        <Link to="/cursos">
          <Button variant="primary">Ver todos los cursos</Button>
        </Link>
      </div>
    );
  }

  const profesor = mockUsers.find(u => u.id === curso.profesorId);
  const moduloActual = curso.modulos.find(m => m.id === moduloSeleccionado);
  
  const handleInscribirse = () => {
    setInscrito(true);
  };

  const getMobileDescriptionHeight = () => {
    const totalHeight = window.innerHeight;
    return totalHeight * 0.6; // 60% de la altura de la pantalla
  };

  return (
    <div className="pb-16 md:pb-0">
      {/* Banner del curso */}
      <div 
        className="rounded-xl mb-6 overflow-hidden h-64 md:h-80 lg:h-96 relative"
        style={{
          backgroundImage: `url(${curso.imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
          <div className="flex items-center mb-2 space-x-2">
            <Badge variant="primary" size="sm">{curso.categoria}</Badge>
            <Badge
              variant={
                curso.nivel === 'principiante'
                  ? 'success'
                  : curso.nivel === 'intermedio'
                  ? 'warning'
                  : 'error'
              }
              size="sm"
            >
              {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            {curso.titulo}
          </h1>
          <p className="text-white text-opacity-90 text-sm md:text-base mb-4 max-w-2xl">
            {curso.descripcion}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span className="text-sm">{Math.floor(curso.duracion / 60)} horas</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-1" />
              <span className="text-sm">{curso.modulos.length} módulos</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span className="text-sm">45 estudiantes</span>
            </div>
            <div className="flex items-center">
              <Star size={16} fill="currentColor" className="mr-1 text-yellow-400" />
              <span className="text-sm">{curso.calificacionPromedio}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">Actualizado: {new Date(curso.fechaCreacion).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información del profesor */}
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={profesor?.avatar || 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg'}
                    alt={profesor?.nombre || 'Profesor'}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Profesor</p>
                  <h3 className="text-lg font-semibold text-gray-900">{profesor?.nombre} {profesor?.apellido}</h3>
                  <p className="text-sm text-gray-600">
                    Experto en {curso.categoria}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Contenido del curso */}
          <Card>
            <CardHeader className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Contenido del Curso</h2>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {curso.modulos.map((modulo, index) => (
                  <div key={modulo.id} className="overflow-hidden">
                    <button
                      className={`w-full px-6 py-4 flex items-center justify-between text-left ${
                        moduloSeleccionado === modulo.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setModuloSeleccionado(modulo.id)}
                    >
                      <div className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 text-sm flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900">{modulo.titulo}</h3>
                          <p className="text-sm text-gray-500">
                            {modulo.lecciones.length} lecciones • {modulo.lecciones.reduce((acc, lec) => acc + lec.duracion, 0)} min
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={20}
                        className={`transition-transform ${
                          moduloSeleccionado === modulo.id ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    
                    {moduloSeleccionado === modulo.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50"
                      >
                        <div className="divide-y divide-gray-200">
                          {modulo.lecciones.map((leccion) => (
                            <div key={leccion.id} className="px-6 py-3 pl-14">
                              <div className="flex items-center">
                                {leccion.tipo === 'video' ? (
                                  <Play size={16} className="mr-2 text-primary-600" />
                                ) : leccion.tipo === 'texto' ? (
                                  <FileText size={16} className="mr-2 text-primary-600" />
                                ) : (
                                  <BarChart2 size={16} className="mr-2 text-primary-600" />
                                )}
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900">
                                    {leccion.titulo}
                                  </h4>
                                  <p className="text-xs text-gray-500">{leccion.duracion} min</p>
                                </div>
                                {leccion.completada && (
                                  <CheckCircle size={16} className="text-success-500" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          
          {/* Lo que aprenderás */}
          <Card>
            <CardHeader className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Lo que aprenderás</h2>
            </CardHeader>
            <CardBody className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-success-500 mr-2 flex-shrink-0" />
                  <span>Dominar los fundamentos de {curso.categoria}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-success-500 mr-2 flex-shrink-0" />
                  <span>Crear proyectos prácticos desde cero</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-success-500 mr-2 flex-shrink-0" />
                  <span>Implementar buenas prácticas profesionales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-success-500 mr-2 flex-shrink-0" />
                  <span>Resolver problemas comunes del mundo real</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-success-500 mr-2 flex-shrink-0" />
                  <span>Trabajar con las últimas tecnologías y herramientas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-success-500 mr-2 flex-shrink-0" />
                  <span>Prepararte para roles profesionales en el área</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          {/* Requisitos */}
          <Card>
            <CardHeader className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Requisitos</h2>
            </CardHeader>
            <CardBody className="p-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 bg-gray-500 rounded-full mt-1.5 mr-2.5"></div>
                  <span>Conocimientos básicos de programación</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 bg-gray-500 rounded-full mt-1.5 mr-2.5"></div>
                  <span>Familiaridad con conceptos de desarrollo web</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 bg-gray-500 rounded-full mt-1.5 mr-2.5"></div>
                  <span>Computadora con acceso a internet</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          {/* Opiniones y valoraciones */}
          <Card>
            <CardHeader className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Opiniones y valoraciones</h2>
              <div className="flex items-center">
                <Star size={20} fill="currentColor" className="text-yellow-400" />
                <span className="ml-1 text-lg font-semibold">{curso.calificacionPromedio}</span>
                <span className="ml-1 text-sm text-gray-500">(25 opiniones)</span>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-start">
                    <img
                      src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                      alt="Estudiante"
                      className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">Carlos Rodríguez</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < 5 ? 'currentColor' : 'none'}
                              className="text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Hace 2 semanas</p>
                      <p className="text-gray-700">
                        Excelente curso! El profesor explica todo con mucha claridad y los ejercicios prácticos son muy útiles. Definitivamente recomendado para cualquiera que quiera aprender {curso.categoria}.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-start">
                    <img
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                      alt="Estudiante"
                      className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">Ana Martínez</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < 4 ? 'currentColor' : 'none'}
                              className="text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Hace 1 mes</p>
                      <p className="text-gray-700">
                        Muy buen curso en general. La parte teórica está bien explicada, aunque me hubiera gustado más ejercicios prácticos. El soporte en los foros es excelente.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start">
                    <img
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                      alt="Estudiante"
                      className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">Pedro Sánchez</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < 5 ? 'currentColor' : 'none'}
                              className="text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Hace 2 meses</p>
                      <p className="text-gray-700">
                        Este curso superó mis expectativas. El nivel de detalle es impresionante y los proyectos son realmente útiles para el mundo real. He aprendido mucho más de lo que esperaba.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">Ver todas las opiniones</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="mb-6">
              <div className="p-6">
                {inscrito ? (
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-success-100 text-success-600 mb-4">
                      <CheckCircle size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">¡Estás inscrito!</h3>
                    <p className="text-gray-600 mb-4">
                      Ya puedes acceder a todo el contenido del curso.
                    </p>
                    <Link to={`/cursos/${curso.id}/aprender`}>
                      <Button variant="primary" fullWidth>
                        Continuar Aprendiendo
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Inscríbete Gratis</h3>
                      <p className="text-gray-600">
                        Comienza tu viaje de aprendizaje hoy mismo
                      </p>
                    </div>
                    <Button variant="primary" fullWidth onClick={handleInscribirse}>
                      Inscribirme al Curso
                    </Button>
                  </>
                )}
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <BookOpen size={20} className="text-gray-500 mr-3" />
                    <span>{curso.modulos.length} módulos</span>
                  </div>
                  <div className="flex items-center">
                    <Play size={20} className="text-gray-500 mr-3" />
                    <span>
                      {curso.modulos.reduce(
                        (acc, modulo) => acc + modulo.lecciones.filter(l => l.tipo === 'video').length,
                        0
                      )}{' '}
                      videos
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-500 mr-3" />
                    <span>
                      {curso.modulos.reduce(
                        (acc, modulo) => acc + modulo.lecciones.filter(l => l.tipo === 'texto').length,
                        0
                      )}{' '}
                      lecturas
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BarChart2 size={20} className="text-gray-500 mr-3" />
                    <span>
                      {curso.modulos.reduce(
                        (acc, modulo) => acc + modulo.lecciones.filter(l => l.tipo === 'quiz').length,
                        0
                      )}{' '}
                      evaluaciones
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={20} className="text-gray-500 mr-3" />
                    <span>{Math.floor(curso.duracion / 60)} horas en total</span>
                  </div>
                  <div className="flex items-center">
                    <User size={20} className="text-gray-500 mr-3" />
                    <span>Acceso completo de por vida</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <CardHeader className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Comparte este curso</h3>
              </CardHeader>
              <CardBody className="p-6">
                <div className="flex justify-between">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 text-[#1877F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 text-[#1DA1F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.05 10.05 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 text-[#0A66C2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 text-[#E60023]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4">
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="block w-full pr-20 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={`https://campusvirtual.com/cursos/${curso.id}`}
                      readOnly
                    />
                    <button className="absolute inset-y-0 right-0 px-4 bg-primary-600 text-white text-sm font-medium rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                      Copiar
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center md:hidden">
        {inscrito ? (
          <Link to={`/cursos/${curso.id}/aprender`} className="w-full">
            <Button variant="primary" fullWidth>
              Continuar Aprendiendo
            </Button>
          </Link>
        ) : (
          <Button variant="primary" fullWidth onClick={handleInscribirse}>
            Inscribirme al Curso
          </Button>
        )}
      </div>
    </div>
  );
};

// Importación necesaria para la función
import { BarChart2 } from 'lucide-react';