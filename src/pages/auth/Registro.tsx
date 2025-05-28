import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registro } from '../../services/authService';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Layers, User, Mail, Lock, AlertTriangle } from 'lucide-react';

interface RegistroFormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistroFormData>();
  const password = watch('password');

  const onSubmit = async (data: RegistroFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      
      const { user, token } = await registro({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        rol: 'alumno',
      });
      
      localStorage.setItem('lms_token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error durante el registro:', error);
      setErrorMessage('Ocurrió un error durante el registro. Intente nuevamente.');
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
            Crear una cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Inicia sesión
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Nombre"
                type="text"
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
                fullWidth
                placeholder="Tu nombre"
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos 2 caracteres',
                  },
                })}
                error={errors.nombre?.message}
              />
              
              <Input
                label="Apellido"
                type="text"
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
                fullWidth
                placeholder="Tu apellido"
                {...register('apellido', {
                  required: 'El apellido es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'El apellido debe tener al menos 2 caracteres',
                  },
                })}
                error={errors.apellido?.message}
              />
            </div>
            
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
              placeholder="Al menos 6 caracteres"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              error={errors.password?.message}
            />
            
            <Input
              label="Confirmar Contraseña"
              type="password"
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              fullWidth
              placeholder="Repite tu contraseña"
              {...register('confirmPassword', {
                required: 'Por favor confirma tu contraseña',
                validate: (value) => 
                  value === password || 'Las contraseñas no coinciden',
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              className="py-3"
            >
              Crear Cuenta
            </Button>
          </div>
          
          <div className="text-xs text-center text-gray-500">
            Al registrarte, aceptas nuestros{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Términos de Servicio
            </a>{' '}
            y{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Política de Privacidad
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};