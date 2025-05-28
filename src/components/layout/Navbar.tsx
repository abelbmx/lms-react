import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, ChevronDown, LogOut, Settings, User, Book, Users, BarChart, Layers, Home } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Layers className="h-8 w-8 text-primary-600" strokeWidth={1.5} />
              <span className="ml-2 text-xl font-bold text-gray-900">Campus Virtual</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                    Dashboard
                  </Link>
                  <Link to="/cursos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                    Cursos
                  </Link>
                  {(user?.rol === 'superadmin' || user?.rol === 'profesor') && (
                    <Link to="/evaluaciones" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                      Evaluaciones
                    </Link>
                  )}
                  {user?.rol === 'superadmin' && (
                    <Link to="/usuarios" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
                      Usuarios
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link to="/notificaciones" className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500"></span>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <div>
                    <button 
                      onClick={toggleProfileMenu}
                      className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <img 
                        className="h-8 w-8 rounded-full object-cover"
                        src={user?.avatar || 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg'}
                        alt={`${user?.nombre} ${user?.apellido}`}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">{user?.nombre}</span>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Link 
                        to="/perfil" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                      <Link 
                        to="/configuracion" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Iniciar Sesión</Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
                <Link 
                  to="/cursos" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book className="mr-2 h-5 w-5" />
                  Cursos
                </Link>
                {(user?.rol === 'superadmin' || user?.rol === 'profesor') && (
                  <Link 
                    to="/evaluaciones" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Evaluaciones
                  </Link>
                )}
                {user?.rol === 'superadmin' && (
                  <Link 
                    to="/usuarios" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Usuarios
                  </Link>
                )}
                <Link 
                  to="/perfil" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="mr-2 h-5 w-5" />
                  Perfil
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link 
                  to="/login" 
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-white border border-gray-300 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/registro" 
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};