import React from 'react';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
      <div className="text-4xl">🍶</div>
      <h1 className="text-2xl font-bold text-gray-900">Calo 醬</h1>
    </header>
  );
};
