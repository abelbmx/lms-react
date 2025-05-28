import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Bell,
  BookOpen,
  MessageSquare,
  Award,
  Calendar,
  BarChart2,
  CheckCircle,
  Trash2
} from 'lucide-react';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'exito' | 'advertencia' | 'error';
  fecha: string;
  leida: boolean;
  link?: string;
}

export const Notificaciones: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      titulo: 'Nueva evaluación disponible',
      mensaje: 'La evaluación "HTML y CSS Básico" ya está disponible para realizar.',
      tipo: 'info',
      fecha: '2024-03-15T10:30:00Z',
      leida: false,
      link: '/evaluaciones/1'
    },
    {
      id: '2',
      titulo: 'Calificación publicada',
      mensaje: 'Tu evaluación de "Introducción a React" ha sido calificada.',
      tipo: 'exito',
      fecha: '2024-03-14T15:45:00Z',
      leida: false,
      link: '/evaluaciones/2/resultado'
    },
    {
      id: '3',
      titulo: 'Recordatorio de clase',
      mensaje: 'Tu próxima clase de "Desarrollo Web Avanzado" comienza en 1 hora.',
      tipo: 'advertencia',
      fecha: '2024-03-14T09:00:00Z',
      leida: true,
      link: '/cursos/3'
    },
    {
      id: '4',
      titulo: 'Nueva respuesta en el foro',
      mensaje: 'Han respondido a tu pregunta sobre "Configuración de Node.js".',
      tipo: 'info',
      fecha: '2024-03-13T18:20:00Z',
      leida: true,
      link: '/foros/4'
    },
    {
      id: '5',
      titulo: 'Logro desbloqueado',
      mensaje: '¡Felicitaciones! Has completado tu primer curso.',
      tipo: 'exito',
      fecha: '2024-03-12T14:10:00Z',
      leida: true,
      link: '/perfil/logros'
    },
  ]);

  const marcarComoLeida = (id: string) => {
    setNotificaciones(notificaciones.map(notif => 
      notif.id === id ? { ...notif, leida: true } : notif
    ));
  };

  const eliminarNotificacion = (id: string) => {
    setNotificaciones(notificaciones.filter(notif => notif.id !== id));
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones(notificaciones.map(notif => ({ ...notif, leida: true })));
  };

  const eliminarTodasLasLeidas = () => {
    setNotificaciones(notificaciones.filter(notif => !notif.leida));
  };

  const getIconoNotificacion = (tipo: string) => {
    switch (tipo) {
      case 'info':
        return <BookOpen size={20} className="text-primary-600" />;
      case 'exito':
        return <Award size={20} className="text-success-600" />;
      case 'advertencia':
        return <Calendar size={20} className="text-warning-600" />;
      case 'error':
        return <BarChart2 size={20} className="text-error-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case 'info':
        return 'primary';
      case 'exito':
        return 'success';
      case 'advertencia':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
            <p className="text-gray-600 mt-1">
              Tienes {notificacionesNoLeidas} notificaciones sin leer
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={marcarTodasComoLeidas}
              icon={<CheckCircle size={16} />}
            >
              Marcar todas como leídas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={eliminarTodasLasLeidas}
              icon={<Trash2 size={16} />}
            >
              Eliminar leídas
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Todas las notificaciones</h2>
            <div className="flex gap-2">
              <Badge variant="primary" size="sm">
                Nuevas: {notificacionesNoLeidas}
              </Badge>
              <Badge variant="secondary" size="sm">
                Total: {notificaciones.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-200">
            {notificaciones.map((notificacion) => (
              <div
                key={notificacion.id}
                className={`p-4 transition-colors ${
                  !notificacion.leida ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-gray-100 mr-4">
                    {getIconoNotificacion(notificacion.tipo)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {notificacion.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {notificacion.mensaje}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500">
                            {new Date(notificacion.fecha).toLocaleDateString()} a las{' '}
                            {new Date(notificacion.fecha).toLocaleTimeString()}
                          </span>
                          <Badge
                            variant={getBadgeVariant(notificacion.tipo)}
                            size="sm"
                          >
                            {notificacion.tipo.charAt(0).toUpperCase() + notificacion.tipo.slice(1)}
                          </Badge>
                          {!notificacion.leida && (
                            <Badge variant="primary" size="sm">
                              Nueva
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notificacion.leida && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => marcarComoLeida(notificacion.id)}
                          >
                            Marcar como leída
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarNotificacion(notificacion.id)}
                          icon={<Trash2 size={16} />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};