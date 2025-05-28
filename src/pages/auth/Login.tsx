import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Layers, Mail, Lock, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setErrorMessage('Credenciales inválidas. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Layers className="h-12 w-12 text-primary-600" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="font-medium text-primary-600 hover:text-primary-500">
              Regístrate
            </Link>
          </p>
        </div>
        
        {errorMessage && (
          <div className="p-4 mb-4 text-sm text-error-700 bg-error-100 rounded-lg flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Correo Electrónico"
              type="email"
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              fullWidth
              placeholder="correo@ejemplo.com"
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Dirección de correo inválida',
                },
              })}
              error={errors.email?.message}
            />
            
            <Input
              label="Contraseña"
              type="password"
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              fullWidth
              placeholder="Tu contraseña"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              error={errors.password?.message}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              className="py-3"
            >
              Iniciar Sesión
            </Button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Para probar el sistema puedes usar:
            </p>
            <p className="mt-1">
              <strong>Administrador:</strong> admin@sistema.com <br />
              <strong>Profesor:</strong> maria@profesores.com <br />
              <strong>Alumno:</strong> carlos@alumnos.com
            </p>
            <p className="mt-1">
              <strong>Contraseña:</strong> 123456
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};