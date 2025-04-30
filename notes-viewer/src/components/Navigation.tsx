import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiSettings } from 'react-icons/fi';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const styles = {
    nav: {
      padding: '1rem',
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)'
    },
    navList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s',
      textDecoration: 'none',
      color: '#f1f5f9'
    },
    activeNavItem: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)'
    },
    icon: {
      marginRight: '0.5rem'
    }
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li>
          <Link 
            to="/" 
            style={{
              ...styles.navItem,
              ...(isActive('/') ? styles.activeNavItem : {})
            }}
          >
            <FiHome style={styles.icon} />
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/search" 
            style={{
              ...styles.navItem,
              ...(isActive('/search') ? styles.activeNavItem : {})
            }}
          >
            <FiSearch style={styles.icon} />
            Search
          </Link>
        </li>
        <li>
          <Link 
            to="/settings" 
            style={{
              ...styles.navItem,
              ...(isActive('/settings') ? styles.activeNavItem : {})
            }}
          >
            <FiSettings style={styles.icon} />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 