import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { login as loginService, obtenerUsuarioActual } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const inicializarAuth = async () => {
      try {
        const token = localStorage.getItem('lms_token');
        if (token) {
          const user = await obtenerUsuarioActual();
          setUser(user);
        }
      } catch (error) {
        console.error('Error al inicializar la autenticación:', error);
        localStorage.removeItem('lms_token');
      } finally {
        setLoading(false);
      }
    };

    inicializarAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await loginService(email, password);
      localStorage.setItem('lms_token', token);
      setUser(user);
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intente nuevamente.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('lms_token');
    setUser(null);
  };

  const value = {
    isAuthenticated: !!user,
    user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};