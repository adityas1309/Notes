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
      minHeight: '100vh',
      backgroundColor: '#1a1f2e',
      color: '#f1f5f9',
      display: 'flex',
      flexDirection: 'column' as const
    },
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
    },
    mainContainer: {
      display: 'flex',
      flex: 1,
      height: 'calc(100vh - 4rem)',
      backgroundColor: '#1a1f2e',
      position: 'relative' as const,
      overflow: 'hidden'
    },
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
      boxSizing: 'border-box' as const
    },
    sidebarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      width: '100%',
      minHeight: '40px'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#f1f5f9',
      overflow: 'hidden',
      flex: '1 1 auto'
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
      height: '32px',
      flexShrink: 0
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
    },
    mainContent: {
      flex: 1,
      marginLeft: sidebarOpen ? '320px' : '0',
      transition: 'margin-left 0.15s ease-in-out',
      backgroundColor: '#1a1f2e',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'auto'
    },
    contentHeader: {
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
      padding: '1rem',
      backgroundColor: '#1a1f2e'
    },
    contentTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#f1f5f9'
    },
    content: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#1a1f2e',
      overflowY: 'auto' as const
    },
    navigation: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem',
      marginBottom: '1rem',
      width: '100%'
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
    }
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
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 10
                }}
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
