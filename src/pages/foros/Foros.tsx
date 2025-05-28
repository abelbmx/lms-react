import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { 
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Eye,
  Clock,
  Filter,
  BookOpen
} from 'lucide-react';

interface Tema {
  id: string;
  titulo: string;
  descripcion: string;
  autor: {
    nombre: string;
    avatar: string;
  };
  fecha: string;
  categoria: string;
  respuestas: number;
  vistas: number;
  likes: number;
  resuelto: boolean;
  ultimaActividad: string;
}

export const Foros: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const temas: Tema[] = [
    {
      id: '1',
      titulo: 'Problema con la instalación de Node.js',
      descripcion: 'Estoy teniendo problemas al instalar Node.js en Windows 11...',
      autor: {
        nombre: 'Carlos Rodríguez',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
      },
      fecha: '2024-03-15T10:30:00Z',
      categoria: 'Soporte Técnico',
      respuestas: 5,
      vistas: 120,
      likes: 8,
      resuelto: true,
      ultimaActividad: '2024-03-15T15:45:00Z'
    },
    {
      id: '2',
      titulo: '¿Cuál es la mejor manera de aprender React?',
      descripcion: 'Soy nuevo en React y me gustaría saber cuál es la mejor ruta de aprendizaje...',
      autor: {
        nombre: 'Ana Martínez',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
      },
      fecha: '2024-03-14T16:20:00Z',
      categoria: 'Desarrollo Web',
      respuestas: 12,
      vistas: 345,
      likes: 25,
      resuelto: false,
      ultimaActividad: '2024-03-15T18:30:00Z'
    },
    {
      id: '3',
      titulo: 'Recursos para diseño UX/UI',
      descripcion: 'Busco recomendaciones de herramientas y recursos para mejorar mis diseños...',
      autor: {
        nombre: 'Pedro Sánchez',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      fecha: '2024-03-13T09:15:00Z',
      categoria: 'Diseño',
      respuestas: 8,
      vistas: 210,
      likes: 15,
      resuelto: true,
      ultimaActividad: '2024-03-14T11:20:00Z'
    },
  ];

  const categorias = [
    'Desarrollo Web',
    'Diseño',
    'Soporte Técnico',
    'Discusión General',
    'Anuncios'
  ];

  const temasFiltrados = temas.filter(tema => {
    const coincideBusqueda = 
      tema.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      tema.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincidenFiltros = !categoriaSeleccionada || tema.categoria === categoriaSeleccionada;
    return coincideBusqueda && coincidenFiltros;
  });

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Foros de Discusión</h1>
          <p className="text-gray-600 mt-1">
            Participa en las discusiones y comparte tus conocimientos
          </p>
        </div>
        <Button variant="primary" className="mt-4 md:mt-0">
          <Plus size={18} className="mr-2" />
          Nuevo Tema
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="md:col-span-3">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Buscar en los foros..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <select
                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Temas Activos</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
          {temasFiltrados.map((tema) => (
            <Card key={tema.id} className="hover:shadow-md transition-shadow">
              <CardBody className="p-6">
                <div className="flex items-start">
                  <img
                    src={tema.autor.avatar}
                    alt={tema.autor.nombre}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {tema.titulo}
                          {tema.resuelto && (
                            <Badge variant="success" size="sm" className="ml-2">
                              Resuelto
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {tema.descripcion}
                        </p>
                      </div>
                      <Badge variant="primary" size="sm">
                        {tema.categoria}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MessageCircle size={16} className="mr-1" />
                        {tema.respuestas} respuestas
                      </span>
                      <span className="flex items-center">
                        <Eye size={16} className="mr-1" />
                        {tema.vistas} vistas
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp size={16} className="mr-1" />
                        {tema.likes} likes
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        Última actividad: {new Date(tema.ultimaActividad).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Categorías Populares</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      categoriaSeleccionada === categoria
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Recursos Útiles</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <a
                  href="#"
                  className="block p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-600 mr-3">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Guía de Inicio</h3>
                      <p className="text-sm text-gray-500">
                        Aprende a usar los foros efectivamente
                      </p>
                    </div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="block p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-600 mr-3">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">FAQ</h3>
                      <p className="text-sm text-gray-500">
                        Preguntas frecuentes
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};