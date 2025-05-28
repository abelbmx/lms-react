export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'superadmin' | 'profesor' | 'alumno';
  avatar?: string;
  fechaRegistro: string;
  estado: 'activo' | 'inactivo';
}

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  profesorId: string;
  categoria: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  duracion: number; // en minutos
  fechaCreacion: string;
  estado: 'borrador' | 'publicado' | 'archivado';
  calificacionPromedio?: number;
  modulos: Modulo[];
}

export interface Modulo {
  id: string;
  cursoId: string;
  titulo: string;
  descripcion: string;
  orden: number;
  lecciones: Leccion[];
}

export interface Leccion {
  id: string;
  moduloId: string;
  titulo: string;
  tipo: 'video' | 'texto' | 'quiz';
  contenido: string;
  duracion: number; // en minutos
  orden: number;
  completada?: boolean;
}

export interface Evaluacion {
  id: string;
  cursoId: string;
  titulo: string;
  descripcion: string;
  tiempoLimite: number; // en minutos
  intentosPermitidos: number;
  fechaInicio?: string;
  fechaFin?: string;
  preguntas: Pregunta[];
}

export interface Pregunta {
  id: string;
  evaluacionId: string;
  texto: string;
  tipo: 'opcion_multiple' | 'verdadero_falso' | 'respuesta_corta' | 'relacionar';
  puntaje: number;
  opciones?: Opcion[];
  respuestaCorrecta?: string;
}

export interface Opcion {
  id: string;
  preguntaId: string;
  texto: string;
  esCorrecta: boolean;
}

export interface IntentoEvaluacion {
  id: string;
  evaluacionId: string;
  estudianteId: string;
  fechaInicio: string;
  fechaFin?: string;
  puntuacionTotal: number;
  porcentajeCompletado: number;
  aprobado: boolean;
  respuestas: RespuestaEstudiante[];
}

export interface RespuestaEstudiante {
  id: string;
  intentoId: string;
  preguntaId: string;
  respuesta: string;
  esCorrecta: boolean;
  puntajeObtenido: number;
}

export interface ProgresoEstudiante {
  id: string;
  estudianteId: string;
  cursoId: string;
  fechaInicio: string;
  fechaUltimoAcceso: string;
  porcentajeCompletado: number;
  leccionesCompletadas: number;
  evaluacionesCompletadas: number;
  calificacionPromedio: number;
}

export interface Notificacion {
  id: string;
  usuarioId: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'exito' | 'advertencia' | 'error';
  leida: boolean;
  fecha: string;
  link?: string;
}

export interface ComentarioForo {
  id: string;
  cursoId: string;
  usuarioId: string;
  titulo: string;
  contenido: string;
  fecha: string;
  respuestas: RespuestaForo[];
}

export interface RespuestaForo {
  id: string;
  comentarioId: string;
  usuarioId: string;
  contenido: string;
  fecha: string;
}

export interface EventoCalendario {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: string;
  horaInicio?: string;
  horaFin?: string;
  tipo: 'clase' | 'plazo' | 'evaluacion' | 'evento';
  cursoId?: string;
  color: string;
}