import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Award,
  BookOpen
} from 'lucide-react';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Estadisticas: React.FC = () => {
  // Datos para el gráfico de progreso mensual
  const progresoData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Estudiantes Activos',
        data: [65, 78, 90, 85, 95, 110],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Datos para el gráfico de cursos por categoría
  const cursosData = {
    labels: ['Desarrollo Web', 'Diseño', 'Marketing', 'Negocios', 'Idiomas'],
    datasets: [
      {
        label: 'Número de Cursos',
        data: [12, 8, 6, 5, 4],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  };

  // Datos para el gráfico de calificaciones promedio
  const calificacionesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Calificación Promedio',
        data: [8.5, 8.7, 8.4, 8.9, 8.6, 9.0],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
        <p className="text-gray-600 mt-1">
          Análisis y métricas del rendimiento de la plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold">110</p>
                <p className="text-sm text-success-600">+15.8% este mes</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Cursos Activos</p>
                <p className="text-2xl font-bold">35</p>
                <p className="text-sm text-success-600">+4 este mes</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tasa de Finalización</p>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-success-600">+5.2% este mes</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-error-100 text-error-600 mr-4">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Calificación Media</p>
                <p className="text-2xl font-bold">8.7</p>
                <p className="text-sm text-success-600">+0.3 este mes</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Progreso Mensual</h2>
          </CardHeader>
          <CardBody className="p-6">
            <Line 
              data={progresoData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Cursos por Categoría</h2>
          </CardHeader>
          <CardBody className="p-6">
            <Doughnut 
              data={cursosData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Calificaciones Promedio</h2>
          </CardHeader>
          <CardBody className="p-6">
            <Bar 
              data={calificacionesData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 10,
                  },
                },
              }}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};