import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockEvaluaciones } from '../../mocks/evaluaciones';
import { 
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';

export const ResultadoEvaluacion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const evaluacion = mockEvaluaciones.find(e => e.id === id);

  // Simulación de resultados
  const resultados = {
    puntuacionTotal: 85,
    tiempoUtilizado: '45 minutos',
    preguntasCorrectas: 8,
    preguntasIncorrectas: 2,
    respuestas: [
      { preguntaId: 'p1-1', correcta: true, puntos: 10 },
      { preguntaId: 'p1-2', correcta: true, puntos: 10 },
      { preguntaId: 'p2-1', correcta: false, puntos: 0 },
      // ... más respuestas
    ]
  };

  if (!evaluacion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle size={48} className="text-warning-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Evaluación no encontrada
        </h2>
        <p className="text-gray-600">
          La evaluación que buscas no existe o ha sido eliminada.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <Link
          to="/evaluaciones"
          className="text-primary-600 hover:text-primary-700 flex items-center mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Volver a evaluaciones
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Resultados: {evaluacion.titulo}
        </h1>
        <p className="text-gray-600 mt-1">{evaluacion.descripcion}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Resumen de Resultados</h2>
            </CardHeader>
            <CardBody>
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <span className="text-3xl font-bold">{resultados.puntuacionTotal}%</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resultados.puntuacionTotal >= 70 ? '¡Excelente trabajo!' : 'Sigue intentando'}
                </h3>
                <p className="text-gray-600">
                  Has {resultados.puntuacionTotal >= 70 ? 'aprobado' : 'reprobado'} esta evaluación
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">Tiempo utilizado</p>
                  <p className="text-lg font-semibold">{resultados.tiempoUtilizado}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">Preguntas correctas</p>
                  <p className="text-lg font-semibold text-success-600">
                    {resultados.preguntasCorrectas}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-1">Preguntas incorrectas</p>
                  <p className="text-lg font-semibold text-error-600">
                    {resultados.preguntasIncorrectas}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Revisión de Respuestas</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {evaluacion.preguntas.map((pregunta, index) => (
                  <div
                    key={pregunta.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Pregunta {index + 1}
                        </h3>
                        <p className="text-gray-600 mt-1">{pregunta.texto}</p>
                      </div>
                      <Badge
                        variant={resultados.respuestas[index]?.correcta ? 'success' : 'error'}
                        size="sm"
                      >
                        {resultados.respuestas[index]?.puntos} puntos
                      </Badge>
                    </div>

                    {pregunta.tipo === 'opcion_multiple' && (
                      <div className="space-y-2">
                        {pregunta.opciones?.map((opcion) => (
                          <div
                            key={opcion.id}
                            className={`
                              p-3 rounded-lg flex items-center
                              ${
                                opcion.esCorrecta
                                  ? 'bg-success-50 text-success-700'
                                  : 'bg-gray-50 text-gray-700'
                              }
                            `}
                          >
                            {opcion.esCorrecta ? (
                              <CheckCircle size={16} className="text-success-500 mr-2" />
                            ) : (
                              <XCircle size={16} className="text-gray-400 mr-2" />
                            )}
                            {opcion.texto}
                          </div>
                        ))}
                      </div>
                    )}

                    {resultados.respuestas[index]?.correcta ? (
                      <div className="mt-4 p-3 bg-success-50 text-success-700 rounded-lg flex items-start">
                        <CheckCircle size={16} className="mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">¡Correcto!</p>
                          <p className="text-sm mt-1">
                            Has respondido correctamente esta pregunta.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-lg flex items-start">
                        <XCircle size={16} className="mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Incorrecto</p>
                          <p className="text-sm mt-1">
                            La respuesta correcta era: "{pregunta.opciones?.find(o => o.esCorrecta)?.texto}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Acciones</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  fullWidth
                  className="justify-start"
                  icon={<Download size={16} />}
                >
                  Descargar resultados
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start"
                  icon={<Share2 size={16} />}
                >
                  Compartir resultados
                </Button>
                {resultados.puntuacionTotal < 70 && (
                  <Link to={`/evaluaciones/${id}`}>
                    <Button
                      variant="outline"
                      fullWidth
                      className="justify-start"
                      icon={<Award size={16} />}
                    >
                      Intentar nuevamente
                    </Button>
                  </Link>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Recursos Adicionales</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Link to={`/cursos/${evaluacion.cursoId}`}>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start"
                  >
                    Repasar material del curso
                  </Button>
                </Link>
                <Link to="/foros">
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start"
                  >
                    Discutir en el foro
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};