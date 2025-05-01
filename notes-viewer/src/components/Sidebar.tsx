import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FileTree from './FileTree';
import { FiFolder, FiRefreshCw, FiSettings, FiHome, FiBarChart2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { FileItem } from '../utils/scanDirectory';

interface SidebarProps {
  fileStructure: FileItem[];
  loading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  fileStructure, 
  loading, 
  isRefreshing, 
  onRefresh,
  isOpen,
  onClose 
}) => {
  const location = useLocation();

  // Auto-close sidebar when location changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, onClose, isOpen]);

  const styles = {
    sidebar: {
      position: 'fixed' as const,
      width: '280px',
      height: '100%',
      backgroundColor: 'var(--bg-color)',
      borderRight: '1px solid var(--border-color)',
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      zIndex: 20,
      top: '4rem',
      left: 0,
      boxSizing: 'border-box' as const
    },
    sidebarContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      padding: '1rem',
      width: '100%',
      boxSizing: 'border-box' as const,
      maxWidth: '320px'
    },
    sidebarHeader: {
      padding: '1rem',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      width: '100%'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    headerControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconButton: {
      background: 'none',
      border: 'none',
      color: 'var(--text-color)',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: 'var(--hover-color)',
      },
    },
    navigation: {
      padding: '1rem',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    navLink: (isActive: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      color: 'var(--text-color)',
      textDecoration: 'none',
      backgroundColor: isActive ? 'var(--hover-color)' : 'transparent',
      '&:hover': {
        backgroundColor: 'var(--hover-color)',
      },
    }),
    navIcon: {
      color: 'var(--text-color)',
    },
    fileTreeContainer: {
      flex: 1,
      overflow: 'auto',
      padding: '1rem',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    },
    loadingSpinner: {
      width: '2rem',
      height: '2rem',
      border: '3px solid var(--border-color)',
      borderTop: '3px solid var(--link-color)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    loadingText: {
      marginTop: '1rem',
      color: 'var(--text-color)',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center' as const,
    },
    emptyStateIcon: {
      marginBottom: '1rem',
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ 
            duration: 0.15,
            ease: 'easeInOut'
          }}
          style={styles.sidebar}
        >
          <div style={styles.sidebarContent}>
            <div style={styles.sidebarHeader}>
              <div style={styles.headerTitle}>
                <FiFolder size={20} />
                <h2 style={{ 
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>My notes</h2>
              </div>
              <div style={styles.headerControls}>
                <button
                  onClick={onRefresh}
                  style={styles.iconButton}
                  title="Refresh"
                >
                  <FiRefreshCw
                    style={{ 
                      animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                </button>
                <button 
                  style={styles.iconButton} 
                  title="Settings"
                >
                  <FiSettings size={16} />
                </button>
              </div>
            </div>

            <div style={styles.navigation}>
              <Link
                to="/"
                style={styles.navLink(location.pathname === '/')}
              >
                <FiHome style={styles.navIcon} />
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard"
                style={styles.navLink(location.pathname === '/dashboard')}
              >
                <FiBarChart2 style={styles.navIcon} />
                <span>Dashboard</span>
              </Link>
            </div>

            <div style={styles.fileTreeContainer}>
              {loading ? (
                <div style={styles.loadingContainer}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={styles.loadingSpinner}
                  />
                  <p style={styles.loadingText}>Loading your files...</p>
                </div>
              ) : fileStructure.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyStateIcon}>
                    <FiFolder style={{ color: '#64748b' }} size={24} />
                  </div>
                  <h3 style={{ color: '#e2e8f0', fontWeight: 500 }}>No notes available</h3>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Add notes to populate your workspace.
                  </p>
                </div>
              ) : (
                <FileTree items={fileStructure} />
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 