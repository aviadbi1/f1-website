import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DriversStandings from './components/DriversStandings';
import ConstructorsStandings from './components/ConstructorsStandings';
import RaceSchedule from './components/RaceSchedule';
import LiveTracker from './components/LiveTracker';
import './styles/animations.css';

function App() {
  const [activeSection, setActiveSection] = useState('standings');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      
      <main className="relative z-10">
        {activeSection === 'standings' && (
          <div className="fade-in">
            <DriversStandings />
            <ConstructorsStandings />
          </div>
        )}
        
        {activeSection === 'schedule' && (
          <div className="fade-in">
            <RaceSchedule />
          </div>
        )}
        
        {activeSection === 'live' && (
          <div className="fade-in">
            <LiveTracker />
          </div>
        )}
      </main>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}

export default App;