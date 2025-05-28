import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { 
  Bell, 
  Globe, 
  Lock, 
  Mail, 
  Moon, 
  Palette, 
  Shield, 
  User,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';

export const Configuracion: React.FC = () => {
  const { user } = useAuth();
  const [notificacionesEmail, setNotificacionesEmail] = useState(true);
  const [notificacionesPush, setNotificacionesPush] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('es');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const handleGuardarCambios = () => {
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 3000);
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">
          Administra tus preferencias y configuración de la cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Perfil y Cuenta */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <User size={20} className="mr-2" />
                Perfil y Cuenta
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg'}
                  alt="Foto de perfil"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <Button variant="outline" size="sm">
                    Cambiar foto
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG, GIF o PNG. Máximo 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  defaultValue={user?.nombre}
                  placeholder="Tu nombre"
                />
                <Input
                  label="Apellido"
                  defaultValue={user?.apellido}
                  placeholder="Tu apellido"
                />
              </div>

              <Input
                label="Email"
                type="email"
                defaultValue={user?.email}
                placeholder="tu@email.com"
                leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
              />

              <div className="relative">
                <Input
                  label="Contraseña actual"
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-2 top-9 p-1"
                >
                  {mostrarPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nueva contraseña"
                  type="password"
                  placeholder="Nueva contraseña"
                />
                <Input
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="Confirmar contraseña"
                />
              </div>
            </CardBody>
          </Card>

          {/* Notificaciones */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Bell size={20} className="mr-2" />
                Notificaciones
              </h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Notificaciones por email
                  </h3>
                  <p className="text-sm text-gray-500">
                    Recibe actualizaciones importantes en tu correo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificacionesEmail}
                    onChange={(e) => setNotificacionesEmail(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Notificaciones push
                  </h3>
                  <p className="text-sm text-gray-500">
                    Recibe notificaciones en tiempo real
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificacionesPush}
                    onChange={(e) => setNotificacionesPush(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </CardBody>
          </Card>

          {/* Apariencia */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Palette size={20} className="mr-2" />
                Apariencia
              </h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Modo oscuro</h3>
                  <p className="text-sm text-gray-500">
                    Cambia entre modo claro y oscuro
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={modoOscuro}
                    onChange={(e) => setModoOscuro(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Idioma */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Globe size={20} className="mr-2" />
                Idioma
              </h2>
            </CardHeader>
            <CardBody>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={idiomaSeleccionado}
                onChange={(e) => setIdiomaSeleccionado(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
              </select>
            </CardBody>
          </Card>

          {/* Privacidad */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Shield size={20} className="mr-2" />
                Privacidad
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Perfil público</h3>
                  <p className="text-sm text-gray-500">
                    Mostrar tu perfil a otros usuarios
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Mostrar progreso
                  </h3>
                  <p className="text-sm text-gray-500">
                    Compartir tu progreso en los cursos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </CardBody>
          </Card>

          {/* Botones de acción */}
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={handleGuardarCambios}
              className="relative"
            >
              {guardadoExitoso ? (
                <span className="flex items-center justify-center">
                  <Check size={18} className="mr-2" />
                  Cambios guardados
                </span>
              ) : (
                'Guardar cambios'
              )}
            </Button>
            <Button variant="outline" fullWidth>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};