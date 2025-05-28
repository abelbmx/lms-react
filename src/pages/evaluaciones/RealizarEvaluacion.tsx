import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockEvaluaciones } from '../../mocks/evaluaciones';
import { 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  Play
} from 'lucide-react';

export const RealizarEvaluacion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const evaluacion = mockEvaluaciones.find(e => e.id === id);
  
  const [iniciada, setIniciada] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [tiempoRestante, setTiempoRestante] = useState(0);

  useEffect(() => {
    if (evaluacion && iniciada) {
      setTiempoRestante(evaluacion.tiempoLimite * 60);
    }
  }, [evaluacion, iniciada]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (iniciada && tiempoRestante > 0) {
      timer = setInterval(() => {
        setTiempoRestante(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            enviarEvaluacion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [iniciada, tiempoRestante]);

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

  if (!iniciada) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <h2 className="text-xl font-semibold">{evaluacion.titulo}</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p className="text-gray-600">{evaluacion.descripcion}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tiempo límite:</span>
                  <span className="font-medium">{evaluacion.tiempoLimite} minutos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Preguntas:</span>
                  <span className="font-medium">{evaluacion.preguntas.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Intentos permitidos:</span>
                  <span className="font-medium">{evaluacion.intentosPermitidos}</span>
                </div>
              </div>

              <div className="bg-warning-50 p-4 rounded-lg">
                <p className="text-warning-700 text-sm">
                  <strong>Importante:</strong> Una vez iniciada la evaluación, el tiempo comenzará a correr y no podrás pausarla. Asegúrate de tener el tiempo necesario para completarla.
                </p>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => setIniciada(true)}
                className="mt-6"
                icon={<Play size={18} />}
              >
                Comenzar Evaluación
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const pregunta = evaluacion.preguntas[preguntaActual];

  const formatTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  };

  const handleRespuesta = (respuesta: string) => {
    setRespuestas(prev => ({
      ...prev,
      [pregunta.id]: respuesta
    }));
  };

  const siguientePregunta = () => {
    if (preguntaActual < evaluacion.preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1);
    }
  };

  const preguntaAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(prev => prev - 1);
    }
  };

  const enviarEvaluacion = () => {
    // Aquí iría la lógica para enviar las respuestas al backend
    navigate(`/evaluaciones/${id}/resultado`);
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{evaluacion.titulo}</h1>
        <p className="text-gray-600 mt-1">{evaluacion.descripcion}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  Pregunta {preguntaActual + 1} de {evaluacion.preguntas.length}
                </span>
                <Badge variant="primary" size="sm" className="ml-2">
                  {pregunta.puntaje} puntos
                </Badge>
              </div>
              <div className="flex items-center text-warning-600">
                <Clock size={20} className="mr-2" />
                <span className="font-medium">{formatTiempo(tiempoRestante)}</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="text-lg mb-6">{pregunta.texto}</div>

              {pregunta.tipo === 'opcion_multiple' && (
                <div className="space-y-4">
                  {pregunta.opciones?.map((opcion) => (
                    <label
                      key={opcion.id}
                      className={`
                        block p-4 border rounded-lg cursor-pointer transition-colors
                        ${
                          respuestas[pregunta.id] === opcion.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={pregunta.id}
                          value={opcion.id}
                          checked={respuestas[pregunta.id] === opcion.id}
                          onChange={() => handleRespuesta(opcion.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-3">{opcion.texto}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {pregunta.tipo === 'verdadero_falso' && (
                <div className="space-y-4">
                  {pregunta.opciones?.map((opcion) => (
                    <label
                      key={opcion.id}
                      className={`
                        block p-4 border rounded-lg cursor-pointer transition-colors
                        ${
                          respuestas[pregunta.id] === opcion.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={pregunta.id}
                          value={opcion.id}
                          checked={respuestas[pregunta.id] === opcion.id}
                          onChange={() => handleRespuesta(opcion.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-3">{opcion.texto}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {pregunta.tipo === 'respuesta_corta' && (
                <textarea
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleRespuesta(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="Escribe tu respuesta aquí..."
                />
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={preguntaAnterior}
                  disabled={preguntaActual === 0}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Anterior
                </Button>
                {preguntaActual === evaluacion.preguntas.length - 1 ? (
                  <Button variant="primary" onClick={enviarEvaluacion}>
                    Finalizar Evaluación
                  </Button>
                ) : (
                  <Button variant="primary" onClick={siguientePregunta}>
                    Siguiente
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <h2 className="text-lg font-semibold">Navegación</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-5 gap-2">
                {evaluacion.preguntas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPreguntaActual(index)}
                    className={`
                      p-2 text-center rounded-lg font-medium
                      ${
                        index === preguntaActual
                          ? 'bg-primary-600 text-white'
                          : respuestas[evaluacion.preguntas[index].id]
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Respondidas:</span>
                  <span className="font-medium">
                    {Object.keys(respuestas).length} de {evaluacion.preguntas.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(Object.keys(respuestas).length / evaluacion.preguntas.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                className="mt-6"
                onClick={enviarEvaluacion}
              >
                Finalizar Evaluación
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};