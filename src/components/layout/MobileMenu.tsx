import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, BarChart, User, Menu } from 'lucide-react';

export const MobileMenu: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `
            inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50
            ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}
          `}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">Inicio</span>
        </NavLink>
        <NavLink
          to="/cursos"
          className={({ isActive }) => `
            inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50
            ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}
          `}
        >
          <Book className="w-6 h-6 mb-1" />
          <span className="text-xs">Cursos</span>
        </NavLink>
        <NavLink
          to="/evaluaciones"
          className={({ isActive }) => `
            inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50
            ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}
          `}
        >
          <BarChart className="w-6 h-6 mb-1" />
          <span className="text-xs">Evaluaciones</span>
        </NavLink>
        <NavLink
          to="/perfil"
          className={({ isActive }) => `
            inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50
            ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}
          `}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Perfil</span>
        </NavLink>
      </div>
    </div>
  );
};