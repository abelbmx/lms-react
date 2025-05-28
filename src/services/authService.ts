import { User } from '../types';
import { mockUsers } from '../mocks/usuarios';

// Simula la autenticación con datos de prueba
export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // En un entorno real, esta función enviaría una solicitud al backend
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email);
      
      // Simula la validación de contraseña (en producción se haría en el backend)
      if (user && password === '123456') {
        // Genera un token falso para simulación
        const token = `token_${Math.random().toString(36).substring(2)}`;
        // Almacena el usuario en localStorage para mantener consistencia
        localStorage.setItem('lms_user', JSON.stringify(user));
        resolve({ user, token });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 800); // Simula un delay de red
  });
};

export const registro = async (userData: Partial<User>): Promise<{ user: User; token: string }> => {
  // Simula el registro con datos de prueba
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: `user_${Math.random().toString(36).substring(2)}`,
        nombre: userData.nombre || '',
        apellido: userData.apellido || '',
        email: userData.email || '',
        rol: userData.rol || 'alumno',
        fechaRegistro: new Date().toISOString(),
        estado: 'activo',
      };
      
      const token = `token_${Math.random().toString(36).substring(2)}`;
      // Almacena el usuario en localStorage
      localStorage.setItem('lms_user', JSON.stringify(newUser));
      resolve({ user: newUser, token });
    }, 800);
  });
};

export const obtenerUsuarioActual = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem('lms_token');
      const storedUser = localStorage.getItem('lms_user');
      
      if (token && storedUser) {
        resolve(JSON.parse(storedUser));
      } else {
        reject(new Error('No autorizado'));
      }
    }, 500);
  });
};

export const verificarPermisos = (requiredRoles: string[], userRole: string): boolean => {
  return requiredRoles.includes(userRole);
};