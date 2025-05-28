import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockCursos } from '../../mocks/cursos';
import { 
  Play,
  BookOpen,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Download,
  ExternalLink,
  HelpCircle,
  Award
} from 'lucide-react';

export const AprendizajeCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const curso = mockCursos.find(c => c.id === id);
  const [moduloActual, setModuloActual] = useState(0);
  const [leccionActual, setLeccionActual] = useState(0);
  const [leccionesCompletadas, setLeccionesCompletadas] = useState<string[]>([]);

  if (!curso) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <HelpCircle size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Curso no encontrado
        </h2>
        <p className="text-gray-600">
          El curso que estás buscando no existe o ha sido eliminado.
        </p>
      </div>
    );
  }

  const modulo = curso.modulos[moduloActual];
  const leccion = modulo.lecciones[leccionActual];

  const marcarLeccionComoCompletada = () => {
    if (!leccionesCompletadas.includes(leccion.id)) {
      setLeccionesCompletadas([...leccionesCompletadas, leccion.id]);
    }
  };

  const avanzarLeccion = () => {
    marcarLeccionComoCompletada();
    if (leccionActual < modulo.lecciones.length - 1) {
      setLeccionActual(leccionActual + 1);
    } else if (moduloActual < curso.modulos.length - 1) {
      setModuloActual(moduloActual + 1);
      setLeccionActual(0);
    } else {
      // Curso completado
      mostrarCertificado();
    }
  };

  const retrocederLeccion = () => {
    if (leccionActual > 0) {
      setLeccionActual(leccionActual - 1);
    } else if (moduloActual > 0) {
      setModuloActual(moduloActual - 1);
      setLeccionActual(curso.modulos[moduloActual - 1].lecciones.length - 1);
    }
  };

  const calcularProgreso = () => {
    const totalLecciones = curso.modulos.reduce(
      (acc, mod) => acc + mod.lecciones.length,
      0
    );
    return Math.round((leccionesCompletadas.length / totalLecciones) * 100);
  };

  const mostrarCertificado = () => {
    const progreso = calcularProgreso();
    if (progreso === 100) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full mx-4">
            <div className="text-center">
              <Award size={64} className="mx-auto text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Felicitaciones!
              </h2>
              <p className="text-gray-600 mb-6">
                Has completado exitosamente el curso "{curso.titulo}"
              </p>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate('/mis-lecciones')}
                >
                  Ver mis cursos
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.print()}
                >
                  Descargar certificado
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pb-16 md:pb-0">
      {/* Banner del curso */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenido principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Área de contenido */}
          <Card>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {leccion.tipo === 'video' ? (
                <div className="text-center text-white">
                  <Play size={48} className="mx-auto mb-4" />
                  <p>Video: {leccion.titulo}</p>
                </div>
              ) : leccion.tipo === 'texto' ? (
                <div className="p-8 bg-white w-full h-full overflow-y-auto">
                  <h2 className="text-xl font-semibold mb-4">{leccion.titulo}</h2>
                  <div className="prose max-w-none">
                    {leccion.contenido}
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <BarChart2 size={48} className="mx-auto mb-4" />
                  <p>Evaluación: {leccion.titulo}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Navegación de lecciones */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={retrocederLeccion}
              disabled={moduloActual === 0 && leccionActual === 0}
              icon={<ChevronLeft size={16} />}
            >
              Anterior
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Lección {leccionActual + 1} de {modulo.lecciones.length}
              </p>
              <h2 className="font-medium">{leccion.titulo}</h2>
            </div>
            <Button
              variant="primary"
              onClick={avanzarLeccion}
              disabled={
                moduloActual === curso.modulos.length - 1 &&
                leccionActual === modulo.lecciones.length - 1 &&
                leccionesCompletadas.includes(leccion.id)
              }
            >
              {moduloActual === curso.modulos.length - 1 &&
              leccionActual === modulo.lecciones.length - 1
                ? 'Finalizar Curso'
                : 'Siguiente'}
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>

          {/* Recursos adicionales */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Recursos de la Lección</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <Download size={20} className="text-gray-400 mr-3" />
                    <div>
                      <h3 className="font-medium">Material de apoyo</h3>
                      <p className="text-sm text-gray-500">PDF, 2.5MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Descargar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <ExternalLink size={20} className="text-gray-400 mr-3" />
                    <div>
                      <h3 className="font-medium">Recursos externos</h3>
                      <p className="text-sm text-gray-500">Enlaces útiles</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver enlaces
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Comentarios */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Comentarios</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                    alt="Usuario"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={3}
                      placeholder="Escribe un comentario..."
                    ></textarea>
                    <Button variant="primary" size="sm" className="mt-2">
                      Enviar comentario
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                      alt="Usuario"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Ana Martínez</h3>
                          <span className="text-sm text-gray-500">Hace 2 horas</span>
                        </div>
                        <p className="text-gray-600">
                          Excelente explicación. Me ayudó mucho a entender el concepto.
                        </p>
                      </div>
                      <div className="flex items-center mt-2 space-x-4">
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Responder
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Me gusta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progreso del curso */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Progreso del Curso</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-600 mb-2">
                    <span className="text-xl font-bold">{calcularProgreso()}%</span>
                  </div>
                  <p className="text-sm text-gray-600">Completado</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Lecciones completadas:</span>
                  <span className="font-medium">
                    {leccionesCompletadas.length}/{curso.modulos.reduce(
                      (acc, mod) => acc + mod.lecciones.length,
                      0
                    )}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calcularProgreso()}%` }}
                  ></div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Contenido del curso */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Contenido del Curso</h2>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200">
                {curso.modulos.map((mod, modIndex) => (
                  <div key={mod.id}>
                    <div className="p-4 bg-gray-50">
                      <h3 className="font-medium">
                        Módulo {modIndex + 1}: {mod.titulo}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {mod.lecciones.map((lec, lecIndex) => (
                        <button
                          key={lec.id}
                          className={`w-full text-left p-4 hover:bg-gray-50 flex items-center ${
                            modIndex === moduloActual && lecIndex === leccionActual
                              ? 'bg-primary-50'
                              : ''
                          }`}
                          onClick={() => {
                            setModuloActual(modIndex);
                            setLeccionActual(lecIndex);
                          }}
                        >
                          {lec.tipo === 'video' ? (
                            <Play size={16} className="text-primary-600 mr-2" />
                          ) : lec.tipo === 'texto' ? (
                            <BookOpen size={16} className="text-primary-600 mr-2" />
                          ) : (
                            <BarChart2 size={16} className="text-primary-600 mr-2" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{lec.titulo}</p>
                            <div className="flex items-center mt-1">
                              <Clock size={12} className="text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">
                                {lec.duracion} min
                              </span>
                            </div>
                          </div>
                          {leccionesCompletadas.includes(lec.id) && (
                            <CheckCircle size={16} className="text-success-500 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Ayuda */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">¿Necesitas ayuda?</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Link to="/foros">
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start"
                    icon={<MessageSquare size={16} />}
                  >
                    Preguntar en el foro
                  </Button>
                </Link>
                <Link to="/soporte">
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start"
                    icon={<HelpCircle size={16} />}
                  >
                    Centro de ayuda
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Mostrar certificado cuando el curso está completado */}
      {calcularProgreso() === 100 && mostrarCertificado()}
    </div>
  );
};