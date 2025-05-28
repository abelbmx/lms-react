import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { 
  BookOpen, 
  Clock, 
  Users, 
  FileText,
  Video,
  PenTool,
  Image as ImageIcon,
  Plus,
  Trash2,
  GripVertical
} from 'lucide-react';

interface ModuloForm {
  titulo: string;
  descripcion: string;
  lecciones: {
    titulo: string;
    tipo: 'video' | 'texto' | 'quiz';
    contenido: string;
    duracion: number;
  }[];
}

interface CrearCursoForm {
  titulo: string;
  descripcion: string;
  categoria: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  imagen: string;
  modulos: ModuloForm[];
}

export const CrearCurso: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CrearCursoForm>({
    defaultValues: {
      modulos: [{ 
        titulo: '', 
        descripcion: '',
        lecciones: [{ titulo: '', tipo: 'video', contenido: '', duracion: 0 }]
      }]
    }
  });

  const modulos = watch('modulos');

  const agregarModulo = () => {
    setValue('modulos', [
      ...modulos,
      {
        titulo: '',
        descripcion: '',
        lecciones: [{ titulo: '', tipo: 'video', contenido: '', duracion: 0 }]
      }
    ]);
  };

  const eliminarModulo = (index: number) => {
    const nuevosModulos = modulos.filter((_, i) => i !== index);
    setValue('modulos', nuevosModulos);
  };

  const agregarLeccion = (moduloIndex: number) => {
    const nuevosModulos = [...modulos];
    nuevosModulos[moduloIndex].lecciones.push({
      titulo: '',
      tipo: 'video',
      contenido: '',
      duracion: 0
    });
    setValue('modulos', nuevosModulos);
  };

  const eliminarLeccion = (moduloIndex: number, leccionIndex: number) => {
    const nuevosModulos = [...modulos];
    nuevosModulos[moduloIndex].lecciones = nuevosModulos[moduloIndex].lecciones.filter(
      (_, i) => i !== leccionIndex
    );
    setValue('modulos', nuevosModulos);
  };

  const onSubmit = (data: CrearCursoForm) => {
    console.log(data);
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Curso</h1>
        <p className="text-gray-600 mt-1">
          Completa el formulario para crear un nuevo curso en la plataforma
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información básica del curso */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Información Básica</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Título del Curso"
              placeholder="Ej: Introducción a React"
              error={errors.titulo?.message}
              {...register('titulo', { required: 'El título es obligatorio' })}
              leftIcon={<BookOpen className="w-5 h-5 text-gray-400" />}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={4}
                placeholder="Describe el contenido y objetivos del curso..."
                {...register('descripcion', { required: 'La descripción es obligatoria' })}
              />
              {errors.descripcion && (
                <p className="mt-1 text-sm text-error-600">{errors.descripcion.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Categoría"
                placeholder="Ej: Desarrollo Web"
                error={errors.categoria?.message}
                {...register('categoria', { required: 'La categoría es obligatoria' })}
                leftIcon={<FileText className="w-5 h-5 text-gray-400" />}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('nivel', { required: 'El nivel es obligatorio' })}
                >
                  <option value="">Selecciona un nivel</option>
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
                {errors.nivel && (
                  <p className="mt-1 text-sm text-error-600">{errors.nivel.message}</p>
                )}
              </div>
            </div>

            <Input
              label="URL de la Imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              error={errors.imagen?.message}
              {...register('imagen', { required: 'La imagen es obligatoria' })}
              leftIcon={<ImageIcon className="w-5 h-5 text-gray-400" />}
            />
          </CardBody>
        </Card>

        {/* Módulos y lecciones */}
        <div className="space-y-4">
          {modulos.map((modulo, moduloIndex) => (
            <Card key={moduloIndex}>
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Módulo {moduloIndex + 1}
                </h3>
                {moduloIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => eliminarModulo(moduloIndex)}
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    Eliminar Módulo
                  </Button>
                )}
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Título del Módulo"
                  placeholder="Ej: Fundamentos de React"
                  {...register(`modulos.${moduloIndex}.titulo`)}
                  leftIcon={<BookOpen className="w-5 h-5 text-gray-400" />}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción del Módulo
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={3}
                    placeholder="Describe el contenido de este módulo..."
                    {...register(`modulos.${moduloIndex}.descripcion`)}
                  />
                </div>

                {/* Lecciones */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Lecciones</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => agregarLeccion(moduloIndex)}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Agregar Lección
                    </Button>
                  </div>

                  {modulo.lecciones.map((_, leccionIndex) => (
                    <div
                      key={leccionIndex}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <GripVertical className="w-5 h-5 text-gray-400 mr-2" />
                          <h5 className="font-medium">Lección {leccionIndex + 1}</h5>
                        </div>
                        {leccionIndex > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarLeccion(moduloIndex, leccionIndex)}
                            icon={<Trash2 className="w-4 h-4" />}
                          >
                            Eliminar
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Título de la Lección"
                          placeholder="Ej: Introducción a los Componentes"
                          {...register(
                            `modulos.${moduloIndex}.lecciones.${leccionIndex}.titulo`
                          )}
                          leftIcon={<PenTool className="w-5 h-5 text-gray-400" />}
                        />

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Lección
                          </label>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            {...register(
                              `modulos.${moduloIndex}.lecciones.${leccionIndex}.tipo`
                            )}
                          >
                            <option value="video">Video</option>
                            <option value="texto">Texto</option>
                            <option value="quiz">Evaluación</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Input
                          label="Contenido"
                          placeholder="URL del video o contenido de la lección"
                          {...register(
                            `modulos.${moduloIndex}.lecciones.${leccionIndex}.contenido`
                          )}
                          leftIcon={<Video className="w-5 h-5 text-gray-400" />}
                        />
                      </div>

                      <div className="mt-4">
                        <Input
                          type="number"
                          label="Duración (minutos)"
                          {...register(
                            `modulos.${moduloIndex}.lecciones.${leccionIndex}.duracion`
                          )}
                          leftIcon={<Clock className="w-5 h-5 text-gray-400" />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}

          <Button
            variant="outline"
            fullWidth
            onClick={agregarModulo}
            icon={<Plus className="w-5 h-5" />}
          >
            Agregar Módulo
          </Button>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Crear Curso
          </Button>
        </div>
      </form>
    </div>
  );
};