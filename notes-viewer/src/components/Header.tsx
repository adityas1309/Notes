import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar }) => {
  const styles = {
    mobileHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#1a1f2e',
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
      zIndex: 30
    },
    menuButton: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#f1f5f9'
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  };

  return (
    <header style={styles.mobileHeader}>
      <button 
        onClick={onToggleSidebar}
        style={styles.menuButton}
      >
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>
      <h1 style={styles.title}>notes Viewer</h1>
      <div style={{ width: '1.5rem' }} />
    </header>
  );
};

export default Header; 