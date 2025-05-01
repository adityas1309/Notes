import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import FileTree from './FileTree';
import { scanDirectory } from '../utils/scanDirectory';
import {
  FiMenu, FiX, FiFolder, FiRefreshCw, FiSettings, FiHome, FiBarChart2
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const location = useLocation();

  // Close sidebar on location change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const loadFileStructure = async () => {
    try {
      setLoading(true);
      const structure = await scanDirectory();
      setFileStructure(structure);
    } catch (error) {
      console.error('Error loading file structure:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshFileStructure = async () => {
    setIsRefreshing(true);
    await loadFileStructure();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadFileStructure();
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color)',
      position: 'relative' as const,
    },
    mobileHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: 'var(--bg-color)',
      borderBottom: '1px solid var(--border-color)',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    menuButton: {
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
    title: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600,
      color: 'var(--text-color)',
    },
    mainContainer: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
      marginTop: '4rem', // Add margin for fixed header
    },
    sidebar: {
      position: 'fixed' as const,
      top: '4rem',
      left: 0,
      width: '280px',
      height: 'calc(100vh - 4rem)',
      backgroundColor: 'var(--bg-color)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column' as const,
      zIndex: 90,
      transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
    },
    sidebarContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      padding: '1rem',
    },
    sidebarHeader: {
      padding: '1rem',
      borderBottom: '1px solid var(--border-color)',
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
    mainContent: {
      flex: 1,
      overflow: 'auto',
      backgroundColor: 'var(--bg-color)',
      marginLeft: sidebarOpen ? '280px' : '0',
      transition: 'margin-left 0.3s ease-in-out',
    },
    overlay: {
      position: 'fixed' as const,
      top: '4rem',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 80,
      display: sidebarOpen ? 'block' : 'none',
    },
  };

  return (
    <div style={styles.container}>
      {/* Mobile Header */}
      <header style={styles.mobileHeader}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={styles.menuButton}
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <h1 style={styles.title}>notes Viewer</h1>
        <div style={{ width: '1.5rem' }} />
      </header>

      <div style={styles.mainContainer}>
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <>
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
                      <FiFolder size={20} style={{ flexShrink: 0 }} />
                      <h2 style={{ 
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        margin: 0,
                        flex: 1,
                        minWidth: 0
                      }}>My notes</h2>
                    </div>
                    <div style={styles.headerControls}>
                      <button
                        onClick={refreshFileStructure}
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
                      <button style={styles.iconButton} title="Settings">
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

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={styles.overlay}
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main style={styles.mainContent}>
          <Outlet context={{ fileStructure }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
