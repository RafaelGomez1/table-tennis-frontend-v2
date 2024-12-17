import React, { useState } from 'react';
import { Navigation, type View } from './components/Navigation';
import { BookingsView } from './components/BookingsView';
import { CompetitionView } from './components/CompetitionView';

function App() {
  const [currentView, setCurrentView] = useState<View>('bookings');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Tennis Taula Sant Andreu</h1>
        </div>
      </header>

      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'bookings' ? <BookingsView /> : <CompetitionView />}
      </main>
    </div>
  );
}

export default App;