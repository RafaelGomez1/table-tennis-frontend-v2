import React from 'react';

export type View = 'bookings' | 'competition';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-start">
          <div className="flex">
            <button
              onClick={() => onViewChange('bookings')}
              className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                currentView === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Agendas
            </button>
            <button
              onClick={() => onViewChange('competition')}
              className={`ml-8 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                currentView === 'competition'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Competición
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}