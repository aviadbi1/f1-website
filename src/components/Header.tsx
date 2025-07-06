import React, { useState } from 'react';
import { Zap, Trophy, Calendar, Radio, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'standings', label: 'Championships', icon: Trophy },
    { id: 'schedule', label: 'Race Calendar', icon: Calendar },
    { id: 'live', label: 'Live Tracker', icon: Radio },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#008250]/20 text-gray-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-[#008250] animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-[#008250] blur-md opacity-50 animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#008250] via-[#116dff] to-[#008250] bg-clip-text text-transparent">
              F1 NEXUS
            </h1>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <nav
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } absolute top-full left-0 right-0 bg-white/90 md:bg-transparent md:static md:flex md:space-x-8 flex-col md:flex-row space-y-4 md:space-y-0 p-4 md:p-0`}
          >
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  setMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === id
                    ? 'bg-[#008250]/20 border border-[#008250]/50 text-[#008250] shadow-lg shadow-[#008250]/25'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;