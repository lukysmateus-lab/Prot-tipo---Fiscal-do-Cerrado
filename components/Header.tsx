import React from 'react';
import { ICONS } from '../constants';
import { User } from '../types';

interface HeaderProps {
  currentUser: User;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  fontSize: string;
  setFontSize: (size: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, theme, toggleTheme, fontSize, setFontSize }) => {
  const fontSizes = [
    { label: 'P', value: 'text-sm' },
    { label: 'M', value: 'text-base' },
    { label: 'G', value: 'text-lg' },
  ];

  return (
    <header className="bg-brand-surface-light dark:bg-brand-surface-dark shadow-md p-3 sm:p-4 flex justify-between items-center sticky top-0 z-20">
      <h1 className={`text-lg sm:text-xl font-bold text-brand-green-dark dark:text-brand-green-light`}>
        Fiscal do Cerrado
      </h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
         <div className="flex items-center space-x-1 bg-brand-orange/20 text-brand-orange-dark font-bold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
            <span>{currentUser.points}</span>
            <span>pts</span>
         </div>
         <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-full p-0.5">
           {fontSizes.map(size => (
              <button 
                key={size.value} 
                onClick={() => setFontSize(size.value)} 
                className={`w-6 h-6 rounded-full text-xs font-bold transition-colors ${fontSize === size.value ? 'bg-brand-green text-white' : 'text-brand-text-secondary'}`}
              >
                {size.label}
              </button>
           ))}
         </div>
         <button onClick={toggleTheme} className="text-brand-text-secondary dark:text-brand-text-secondary">
           {theme === 'light' ? ICONS.moon : ICONS.sun}
         </button>
      </div>
    </header>
  );
};

export default Header;