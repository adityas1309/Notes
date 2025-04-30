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
      width: '320px',
      height: 'calc(100vh - 4rem)',
      backgroundColor: '#1a1f2e',
      borderRight: '1px solid rgba(30, 41, 59, 0.5)',
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      zIndex: 20,
      top: '4rem',
      left: 0,
      boxSizing: 'border-box' as const
    },
    sidebarContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%',
      padding: '1rem',
      width: '100%',
      boxSizing: 'border-box' as const,
      maxWidth: '320px'
    },
    sidebarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      width: '100%'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#f1f5f9',
      minWidth: 0,
      flex: 1
    },
    headerControls: {
      display: 'flex',
      gap: '0.75rem',
      flexShrink: 0
    },
    iconButton: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px'
    },
    navigation: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    navLink: (isActive: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      color: isActive ? '#60a5fa' : '#94a3b8',
      textDecoration: 'none',
      backgroundColor: isActive ? 'rgba(30, 58, 138, 0.3)' : 'transparent',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      '&:hover': {
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        color: '#60a5fa'
      }
    }),
    navIcon: {
      fontSize: '1.25rem'
    },
    fileTreeContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem',
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      flex: 1,
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box' as const
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 0'
    },
    loadingSpinner: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '9999px',
      border: '4px solid rgba(34, 211, 238, 0.3)',
      borderTopColor: '#22d3ee'
    },
    loadingText: {
      marginTop: '1rem',
      color: '#94a3b8'
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '3rem 0'
    },
    emptyStateIcon: {
      width: '4rem',
      height: '4rem',
      backgroundColor: '#1e293b',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 0.75rem auto'
    }
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
                }}>My Notes</h2>
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