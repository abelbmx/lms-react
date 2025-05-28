import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Book, 
  Users, 
  BarChart, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings,
  BookOpen,
  PenTool,
  GraduationCap 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const sidebarLinks = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <Home size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
    {
      title: 'Cursos',
      path: '/cursos',
      icon: <Book size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
    {
      title: 'Mis Lecciones',
      path: '/mis-lecciones',
      icon: <BookOpen size={20} />,
      roles: ['alumno'],
    },
    {
      title: 'Creación de Cursos',
      path: '/crear-curso',
      icon: <PenTool size={20} />,
      roles: ['superadmin', 'profesor'],
    },
    {
      title: 'Evaluaciones',
      path: '/evaluaciones',
      icon: <BarChart size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
    {
      title: 'Gestión de Usuarios',
      path: '/usuarios',
      icon: <Users size={20} />,
      roles: ['superadmin'],
    },
    {
      title: 'Estadísticas',
      path: '/estadisticas',
      icon: <GraduationCap size={20} />,
      roles: ['superadmin', 'profesor'],
    },
    {
      title: 'Calendario',
      path: '/calendario',
      icon: <Calendar size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
    {
      title: 'Foros',
      path: '/foros',
      icon: <MessageSquare size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
    {
      title: 'Notificaciones',
      path: '/notificaciones',
      icon: <Bell size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
    {
      title: 'Configuración',
      path: '/configuracion',
      icon: <Settings size={20} />,
      roles: ['superadmin', 'profesor', 'alumno'],
    },
  ];

  const filteredLinks = sidebarLinks.filter(link => 
    user && link.roles.includes(user.rol)
  );

  return (
    <div className="bg-white h-full shadow-md w-64 flex-shrink-0 hidden md:block">
      <div className="p-4">
        
        <div className="space-y-1">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
                transition-colors duration-200
                ${isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span className="mr-3">{link.icon}</span>
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};