import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockUsers } from '../../mocks/usuarios';
import { 
  Plus, 
  Search, 
  Filter,
  UserPlus,
  Users as UsersIcon,
  Shield,
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  User,
  Calendar
} from 'lucide-react';

export const GestionUsuarios: React.FC = () => {
  const { user } = useAuth();
  const [busqueda, setBusqueda] = useState('');
  const [rolFiltrado, setRolFiltrado] = useState('');
  const [estadoFiltrado, setEstadoFiltrado] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(null);

  if (user?.rol !== 'superadmin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Shield className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceso Restringido</h2>
        <p className="text-gray-600 text-center max-w-md">
          No tienes permisos para acceder a la gestión de usuarios. Esta sección está reservada para administradores.
        </p>
      </div>
    );
  }

  const usuariosFiltrados = mockUsers.filter(u => {
    const coincideNombre = 
      `${u.nombre} ${u.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase());
    const coincidenFiltros = 
      (!rolFiltrado || u.rol === rolFiltrado) &&
      (!estadoFiltrado || u.estado === estadoFiltrado);
    return coincideNombre && coincidenFiltros;
  });

  const getRoleBadgeVariant = (rol: string) => {
    switch (rol) {
      case 'superadmin':
        return 'error';
      case 'profesor':
        return 'warning';
      case 'alumno':
        return 'success';
      default:
        return 'default';
    }
  };

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'success';
      case 'inactivo':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Administra los usuarios y sus roles en la plataforma
          </p>
        </div>
        <Button variant="primary" className="mt-4 md:mt-0">
          <UserPlus size={18} className="mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <UsersIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Usuarios</p>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Profesores</p>
                <p className="text-2xl font-bold">
                  {mockUsers.filter(u => u.rol === 'profesor').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold">
                  {mockUsers.filter(u => u.estado === 'activo').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-6">
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Buscar usuarios por nombre o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <select
                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  value={rolFiltrado}
                  onChange={(e) => setRolFiltrado(e.target.value)}
                >
                  <option value="">Todos los roles</option>
                  <option value="superadmin">Administrador</option>
                  <option value="profesor">Profesor</option>
                  <option value="alumno">Alumno</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter size={16} className="text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  value={estadoFiltrado}
                  onChange={(e) => setEstadoFiltrado(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Lista de Usuarios</h2>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosFiltrados.map((usuario) => (
                <tr 
                  key={usuario.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={usuario.avatar || 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg'}
                        alt={`${usuario.nombre} ${usuario.apellido}`}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {usuario.nombre} {usuario.apellido}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{usuario.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getRoleBadgeVariant(usuario.rol)} size="sm">
                      {usuario.rol === 'superadmin' ? 'Administrador' : 
                       usuario.rol === 'profesor' ? 'Profesor' : 'Alumno'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={getEstadoBadgeVariant(usuario.estado)}
                      size="sm"
                    >
                      {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.fechaRegistro).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                          onClick={() => setUsuarioSeleccionado(
                            usuarioSeleccionado === usuario.id ? null : usuario.id
                          )}
                        >
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>

                      {usuarioSeleccionado === usuario.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="py-1">
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                              onClick={() => {/* Implementar edición */}}
                            >
                              <Edit size={16} className="mr-2" />
                              Editar Usuario
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                              onClick={() => {/* Implementar envío de email */}}
                            >
                              <Mail size={16} className="mr-2" />
                              Enviar Email
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-gray-100 flex items-center"
                              onClick={() => {/* Implementar eliminación */}}
                            >
                              <Trash2 size={16} className="mr-2" />
                              Eliminar Usuario
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};