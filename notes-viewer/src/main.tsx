import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Force dark mode and set base styles
document.documentElement.classList.add('dark');
document.documentElement.style.colorScheme = 'dark';
document.body.className = 'bg-gray-900 text-gray-100 min-h-screen min-w-[320px] m-0 font-sans antialiased';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
