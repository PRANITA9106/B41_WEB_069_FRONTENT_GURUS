import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

export const Footer = () => {
  const { themeMode } = useContext(ThemeContext);
  return (
    <footer className={`${themeMode ? 'light' : 'dark'}`}>
      <p className='text-center'>&copy; 2024 My App. All Rights Reserved.</p>
    </footer>
  );
};
