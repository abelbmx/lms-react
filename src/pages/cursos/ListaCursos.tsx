import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Search, Filter, Star, Users, Clock, BookOpen, Plus } from 'lucide-react';
import { mockCursos } from '../../mocks/cursos';

export const ListaCursos: React.FC = () => {
  const { user } = useAuth();
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltrada, setCategoriaFiltrada] = useState<string>('');
  const [nivelFiltrado, setNivelFiltrado] = useState<string>('');

  const categoriasUnicas = Array.from(new Set(mockCursos.map(curso => curso.categoria)));
  const niveles = ['principiante', 'intermedio', 'avanzado'];

  const cursosFiltrados = mockCursos.filter(curso => {
    const coincideBusqueda = curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
                           curso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincidenFiltros = 
      (categoriaFiltrada === '' || curso.categoria === categoriaFiltrada) &&
      (nivelFiltrado === '' || curso.nivel === nivelFiltrado);
    
    return coincideBusqueda && coincidenFiltros;
  });

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaFiltrada('');
    setNivelFiltrado('');
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catálogo de Cursos</h1>
          <p className="text-gray-600 mt-1">
            Explora nuestra variedad de cursos disponibles
          </p>
        </div>
        
        {(user?.rol === 'superadmin' || user?.rol === 'profesor') && (
          <Link to="/crear-curso" className="mt-4 md:mt-0">
            <Button variant="primary" className="w-full md:w-auto">
              <Plus size={18} className="mr-2" />
              Crear Curso
            </Button>
          </Link>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Buscar cursos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <select
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                value={categoriaFiltrada}
                onChange={(e) => setCategoriaFiltrada(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categoriasUnicas.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                value={nivelFiltrado}
                onChange={(e) => setNivelFiltrado(e.target.value)}
              >
                <option value="">Todos los niveles</option>
                {niveles.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
            </div>
            
            {(busqueda || categoriaFiltrada || nivelFiltrado) && (
              <Button
                variant="outline"
                size="sm"
                className="md:self-center"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursosFiltrados.length > 0 ? (
          cursosFiltrados.map((curso) => (
            <Link to={`/cursos/${curso.id}`} key={curso.id}>
              <Card hoverable className="h-full flex flex-col">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={curso.imagen}
                    alt={curso.titulo}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={
                        curso.nivel === 'principiante'
                          ? 'success'
                          : curso.nivel === 'intermedio'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                    >
                      {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" className="mr-1" />
                      <span className="text-sm">{curso.calificacionPromedio}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{curso.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {curso.descripcion}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock size={16} className="mr-1" />
                      <span>{Math.floor(curso.duracion / 60)} horas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen size={16} className="mr-1" />
                        <span>{curso.modulos.length} módulos</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={16} className="mr-1" />
                        <span>45 estudiantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron cursos</h3>
            <p className="text-gray-600 mb-4">
              No hay cursos que coincidan con tus criterios de búsqueda.
            </p>
            <Button variant="outline" onClick={limpiarFiltros}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};