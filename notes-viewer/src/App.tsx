import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import MarkdownViewer from './components/MarkdownViewer';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="notes/*" element={<MarkdownViewer />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
