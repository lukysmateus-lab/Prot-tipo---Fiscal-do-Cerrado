
import React from 'react';
import { Page } from '../types';
import { ICONS } from '../constants';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
  isActive: boolean;
  onClick: () => void;
}> = ({ page, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-brand-green-dark dark:text-brand-green-light' : 'text-brand-text-secondary dark:text-gray-400'
    }`}
  >
    {icon}
    <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>{page}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-lg mx-auto bg-brand-surface-light dark:bg-brand-surface-dark border-t border-gray-200 dark:border-gray-700 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] flex justify-around">
      <NavItem
        page={Page.Report}
        icon={ICONS.denuncia}
        isActive={activePage === Page.Report}
        onClick={() => setActivePage(Page.Report)}
      />
      <NavItem
        page={Page.Solutions}
        icon={ICONS.solucionar}
        isActive={activePage === Page.Solutions}
        onClick={() => setActivePage(Page.Solutions)}
      />
      <NavItem
        page={Page.Engage}
        icon={ICONS.participar}
        isActive={activePage === Page.Engage}
        onClick={() => setActivePage(Page.Engage)}
      />
      <NavItem
        page={Page.Profile}
        icon={ICONS.perfil}
        isActive={activePage === Page.Profile}
        onClick={() => setActivePage(Page.Profile)}
      />
    </nav>
  );
};

export default BottomNav;