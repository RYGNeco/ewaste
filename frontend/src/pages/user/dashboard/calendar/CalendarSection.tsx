import React, { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'pickup' | 'rygneco' | 'promotion' | 'challenge';
  description: string;
}

const CalendarSection: React.FC = () => {
  const [view, setView] = useState<'week' | 'month' | 'agenda'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enabledTypes, setEnabledTypes] = useState({
    pickup: true,
    rygneco: true,
    promotion: true,
    challenge: true
  });

  // Mock events data
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Device Pickup',
      date: '2025-08-02',
      type: 'pickup',
      description: 'Scheduled pickup at 123 Main St'
    },
    {
      id: 2,
      title: 'Recycling Challenge',
      date: '2025-08-05',
      type: 'challenge',
      description: 'Community e-waste collection drive'
    },
    // Add more mock events as needed
  ]);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const dayEvents = events.filter(
        event => event.date === dateStr && enabledTypes[event.type as keyof typeof enabledTypes]
      );

      const isToday = 
        today.getDate() === day &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 ${
            isToday ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex justify-between">
            <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>{day}</span>
            {dayEvents.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            )}
          </div>
          <div className="mt-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="text-xs p-1 mb-1 rounded bg-teal-100 truncate"
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex h-full gap-6">
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Calendar</h2>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md ${
                view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                view === 'agenda' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setView('agenda')}
            >
              Agenda
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <button
            className="px-3 py-1 rounded-md bg-gray-200"
            onClick={() => {
              setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
            }}
          >
            Previous
          </button>
          <h3 className="text-lg font-medium">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            className="px-3 py-1 rounded-md bg-gray-200"
            onClick={() => {
              setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
            }}
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium bg-gray-50">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>

      <div className="w-64">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-medium mb-4">Calendar Types</h3>
          <div className="space-y-3">
            {Object.entries(enabledTypes).map(([type, enabled]) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => {
                    setEnabledTypes(prev => ({
                      ...prev,
                      [type]: !prev[type as keyof typeof enabledTypes]
                    }));
                  }}
                  className="mr-2"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
