import React, { useState } from 'react';
import { Calendar, Grid, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
  description: string;
}

interface CalendarDate {
  daysInMonth: number;
  startingDayOfWeek: number;
  year: number;
  month: number;
}

const EventsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2023, 9, 1)); // October 2023

  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Club de Lectura Virtual',
      date: '2023-10-15',
      time: '18:00 - 20:00',
      location: 'En línea',
      attendees: 24,
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=250&fit=crop',
      category: 'Virtual',
      description: 'Únete a nuestra comunidad de lectores para discutir el libro del mes'
    },
    {
      id: 2,
      title: 'Feria del Libro',
      date: '2023-10-22',
      time: '10:00 - 18:00',
      location: 'Centro Cultural',
      attendees: 150,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      category: 'Presencial',
      description: 'La feria más grande de la ciudad con autores invitados'
    },
    {
      id: 3,
      title: 'Taller de Escritura Creativa',
      date: '2023-10-18',
      time: '16:00 - 19:00',
      location: 'Biblioteca Central',
      attendees: 30,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
      category: 'Taller',
      description: 'Aprende técnicas de escritura con profesionales'
    },
    {
      id: 4,
      title: 'Presentación de Autor',
      date: '2023-10-25',
      time: '19:00 - 21:00',
      location: 'Auditorio Municipal',
      attendees: 80,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=250&fit=crop',
      category: 'Presentación',
      description: 'Conoce al autor bestseller y su nueva obra'
    },
    {
      id: 5,
      title: 'Club de Poesía',
      date: '2023-10-12',
      time: '17:00 - 19:00',
      location: 'Café Literario',
      attendees: 15,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      category: 'Virtual',
      description: 'Comparte y escucha poesía en un ambiente acogedor'
    },
    {
      id: 6,
      title: 'Intercambio de Libros',
      date: '2023-10-28',
      time: '11:00 - 15:00',
      location: 'Parque Central',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=250&fit=crop',
      category: 'Presencial',
      description: 'Trae tus libros y descubre nuevas lecturas'
    }
  ];

  // Calendar functions
  const getDaysInMonth = (date: Date): CalendarDate => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDay = (day: number): Event[] => {
    const { year, month } = getDaysInMonth(currentDate);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Eventos
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre y únete a nuestras actividades literarias
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <Grid size={20} />
            <span className="hidden sm:inline">Vista de Cuadrícula</span>
            <span className="sm:hidden">Cuadrícula</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              viewMode === 'calendar'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <Calendar size={20} />
            <span className="hidden sm:inline">Vista de Calendario</span>
            <span className="sm:hidden">Calendario</span>
          </button>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-500" />
                      <span>{new Date(event.date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-indigo-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-indigo-500" />
                      <span>{event.attendees} asistentes</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                    Registrarse
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {monthNames[month]} {year}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {/* Day Headers */}
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-700 py-2 text-xs sm:text-base"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {[...Array(startingDayOfWeek)].map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Calendar Days */}
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDay(day);
                const hasEvents = dayEvents.length > 0;

                return (
                  <div
                    key={day}
                    className={`aspect-square border-2 rounded-xl p-1 sm:p-2 ${
                      hasEvents
                        ? 'border-indigo-300 bg-indigo-50'
                        : 'border-gray-200 bg-white'
                    } hover:shadow-md transition-all`}
                  >
                    <div className="h-full flex flex-col">
                      <div
                        className={`text-xs sm:text-sm font-semibold mb-1 ${
                          hasEvents ? 'text-indigo-600' : 'text-gray-700'
                        }`}
                      >
                        {day}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        {dayEvents.map((event, idx) => (
                          <div
                            key={event.id}
                            className="bg-indigo-600 text-white text-xs rounded px-1 py-0.5 mb-1 truncate"
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Events Legend */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Eventos del mes
              </h3>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full sm:w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-gray-900">{event.title}</h4>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;