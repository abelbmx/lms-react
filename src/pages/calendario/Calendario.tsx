import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users
} from 'lucide-react';

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

interface Evento {
  id: string;
  titulo: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  tipo: 'clase' | 'evaluacion' | 'evento';
  descripcion?: string;
  ubicacion?: string;
  participantes?: number;
}

export const Calendario: React.FC = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [eventos] = useState<Evento[]>([
    {
      id: '1',
      titulo: 'Clase: Introducción a React',
      fecha: new Date(2024, 2, 15),
      horaInicio: '10:00',
      horaFin: '11:30',
      tipo: 'clase',
      descripcion: 'Fundamentos de React y creación de componentes',
      ubicacion: 'Aula Virtual 1',
      participantes: 25
    },
    {
      id: '2',
      titulo: 'Evaluación: HTML y CSS',
      fecha: new Date(2024, 2, 18),
      horaInicio: '15:00',
      horaFin: '16:30',
      tipo: 'evaluacion',
      descripcion: 'Evaluación final del módulo de HTML y CSS',
      participantes: 30
    },
    {
      id: '3',
      titulo: 'Webinar: Tendencias en Desarrollo Web',
      fecha: new Date(2024, 2, 20),
      horaInicio: '18:00',
      horaFin: '19:30',
      tipo: 'evento',
      descripcion: 'Charla sobre las últimas tendencias en desarrollo web',
      ubicacion: 'Sala de Conferencias Virtual',
      participantes: 100
    },
  ]);

  const obtenerDiasEnMes = (fecha: Date) => {
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
  };

  const obtenerPrimerDiaSemana = (fecha: Date) => {
    return new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
  };

  const cambiarMes = (incremento: number) => {
    setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() + incremento, 1));
  };

  const obtenerEventosDelDia = (dia: number) => {
    return eventos.filter(evento => 
      evento.fecha.getDate() === dia &&
      evento.fecha.getMonth() === fechaActual.getMonth() &&
      evento.fecha.getFullYear() === fechaActual.getFullYear()
    );
  };

  const getEventoBadgeVariant = (tipo: 'clase' | 'evaluacion' | 'evento') => {
    switch (tipo) {
      case 'clase':
        return 'primary';
      case 'evaluacion':
        return 'warning';
      case 'evento':
        return 'success';
      default:
        return 'default';
    }
  };

  const diasEnMes = obtenerDiasEnMes(fechaActual);
  const primerDiaSemana = obtenerPrimerDiaSemana(fechaActual);
  const hoy = new Date();

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tus clases, evaluaciones y eventos
          </p>
        </div>
        <Button variant="primary" className="mt-4 md:mt-0">
          <Plus size={18} className="mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cambiarMes(-1)}
                  icon={<ChevronLeft size={16} />}
                />
                <h2 className="text-lg font-semibold">
                  {MESES[fechaActual.getMonth()]} {fechaActual.getFullYear()}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cambiarMes(1)}
                  icon={<ChevronRight size={16} />}
                />
              </div>
              <div className="flex space-x-2">
                <Badge variant="primary" size="sm">Clases</Badge>
                <Badge variant="warning" size="sm">Evaluaciones</Badge>
                <Badge variant="success" size="sm">Eventos</Badge>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {DIAS.map((dia) => (
                  <div
                    key={dia}
                    className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500"
                  >
                    {dia.slice(0, 3)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {Array.from({ length: 42 }).map((_, index) => {
                  const dia = index - primerDiaSemana + 1;
                  const esDiaActual = dia > 0 && dia <= diasEnMes;
                  const eventosDelDia = esDiaActual ? obtenerEventosDelDia(dia) : [];
                  const esHoy = 
                    dia === hoy.getDate() &&
                    fechaActual.getMonth() === hoy.getMonth() &&
                    fechaActual.getFullYear() === hoy.getFullYear();

                  return (
                    <div
                      key={index}
                      className={`bg-white min-h-[100px] p-2 ${
                        !esDiaActual ? 'text-gray-300' : 
                        esHoy ? 'bg-primary-50' : ''
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        esHoy ? 'text-primary-600' : 'text-gray-900'
                      }`}>
                        {esDiaActual ? dia : ''}
                      </span>
                      <div className="mt-1 space-y-1">
                        {eventosDelDia.map((evento) => (
                          <div
                            key={evento.id}
                            className={`text-xs p-1 rounded-md truncate
                              ${evento.tipo === 'clase' ? 'bg-primary-100 text-primary-700' :
                                evento.tipo === 'evaluacion' ? 'bg-warning-100 text-warning-700' :
                                'bg-success-100 text-success-700'
                              }`}
                          >
                            {evento.titulo}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Próximos Eventos</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {eventos
                  .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
                  .map((evento) => (
                    <div
                      key={evento.id}
                      className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="p-2 rounded-lg bg-gray-100 mr-3">
                          <CalendarIcon size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{evento.titulo}</h3>
                          <Badge
                            variant={getEventoBadgeVariant(evento.tipo)}
                            size="sm"
                            className="mt-1"
                          >
                            {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                          </Badge>
                          {evento.descripcion && (
                            <p className="text-sm text-gray-600 mt-1">
                              {evento.descripcion}
                            </p>
                          )}
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock size={14} className="mr-1" />
                              {evento.horaInicio} - {evento.horaFin}
                            </div>
                            {evento.ubicacion && (
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin size={14} className="mr-1" />
                                {evento.ubicacion}
                              </div>
                            )}
                            {evento.participantes && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Users size={14} className="mr-1" />
                                {evento.participantes} participantes
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};