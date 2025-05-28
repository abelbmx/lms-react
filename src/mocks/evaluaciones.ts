import { Evaluacion } from '../types';

export const mockEvaluaciones: Evaluacion[] = [
  {
    id: '1',
    cursoId: '1',
    titulo: 'Evaluación Final: HTML y CSS',
    descripcion: 'Evaluación de los conceptos básicos de HTML y CSS cubiertos en el curso.',
    tiempoLimite: 60, // 60 minutos
    intentosPermitidos: 2,
    fechaInicio: '2023-02-01T00:00:00Z',
    fechaFin: '2023-12-31T23:59:59Z',
    preguntas: [
      {
        id: 'p1-1',
        evaluacionId: '1',
        texto: '¿Cuál es la etiqueta HTML correcta para crear un enlace?',
        tipo: 'opcion_multiple',
        puntaje: 1,
        opciones: [
          { id: 'op1-1-1', preguntaId: 'p1-1', texto: '<a>', esCorrecta: true },
          { id: 'op1-1-2', preguntaId: 'p1-1', texto: '<link>', esCorrecta: false },
          { id: 'op1-1-3', preguntaId: 'p1-1', texto: '<href>', esCorrecta: false },
          { id: 'op1-1-4', preguntaId: 'p1-1', texto: '<url>', esCorrecta: false },
        ],
      },
      {
        id: 'p1-2',
        evaluacionId: '1',
        texto: 'CSS significa Cascading Style Sheets.',
        tipo: 'verdadero_falso',
        puntaje: 1,
        opciones: [
          { id: 'op1-2-1', preguntaId: 'p1-2', texto: 'Verdadero', esCorrecta: true },
          { id: 'op1-2-2', preguntaId: 'p1-2', texto: 'Falso', esCorrecta: false },
        ],
      },
      {
        id: 'p1-3',
        evaluacionId: '1',
        texto: 'Explica la diferencia entre las clases e IDs en CSS.',
        tipo: 'respuesta_corta',
        puntaje: 2,
        respuestaCorrecta: 'Las clases pueden aplicarse a múltiples elementos mientras que los IDs deben ser únicos en la página.',
      },
    ],
  },
  {
    id: '2',
    cursoId: '2',
    titulo: 'Componentes en React',
    descripcion: 'Evaluación sobre los tipos de componentes y ciclo de vida en React.',
    tiempoLimite: 45, // 45 minutos
    intentosPermitidos: 3,
    fechaInicio: '2023-03-01T00:00:00Z',
    fechaFin: '2023-12-31T23:59:59Z',
    preguntas: [
      {
        id: 'p2-1',
        evaluacionId: '2',
        texto: '¿Qué son los hooks en React?',
        tipo: 'respuesta_corta',
        puntaje: 2,
        respuestaCorrecta: 'Los hooks son funciones que permiten usar estado y otras características de React en componentes funcionales.',
      },
      {
        id: 'p2-2',
        evaluacionId: '2',
        texto: '¿Cuál de los siguientes NO es un hook de React?',
        tipo: 'opcion_multiple',
        puntaje: 1,
        opciones: [
          { id: 'op2-2-1', preguntaId: 'p2-2', texto: 'useState', esCorrecta: false },
          { id: 'op2-2-2', preguntaId: 'p2-2', texto: 'useEffect', esCorrecta: false },
          { id: 'op2-2-3', preguntaId: 'p2-2', texto: 'useContext', esCorrecta: false },
          { id: 'op2-2-4', preguntaId: 'p2-2', texto: 'useHistory', esCorrecta: true },
        ],
      },
    ],
  },
];