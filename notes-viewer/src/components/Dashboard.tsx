import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiFolder, FiFileText, FiFile, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FileItem } from '../utils/scanDirectory';

interface DashboardContext {
  fileStructure: FileItem[];
}

const Dashboard: React.FC = () => {
  const { fileStructure } = useOutletContext<DashboardContext>();

  const calculateStats = (items: FileItem[]) => {
    let totalFiles = 0;
    let totalFolders = 0;
    let totalMdFiles = 0;
    const folderNames: string[] = [];

    const traverse = (items: FileItem[]) => {
      items.forEach(item => {
        if (item.type === 'directory') {
          totalFolders++;
          folderNames.push(item.name);
          if (item.children) {
            traverse(item.children);
          }
        } else {
          totalFiles++;
          if (item.name.endsWith('.md') || item.name.endsWith('.markdown')) {
            totalMdFiles++;
          }
        }
      });
    };

    traverse(items);
    return { totalFiles, totalFolders, totalMdFiles, folderNames };
  };

  const stats = calculateStats(fileStructure);

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: 'var(--bg-color)',
      borderRadius: '0.5rem',
      color: 'var(--text-color)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '2rem'
    },
    headerIcon: {
      color: 'var(--link-color)',
      fontSize: '1.5rem'
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: 'var(--text-color)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'var(--hover-color)',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem'
    },
    statIcon: {
      fontSize: '1.5rem',
      color: 'var(--link-color)'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 600,
      color: 'var(--text-color)'
    },
    statLabel: {
      color: 'var(--text-color)',
      opacity: 0.7,
      fontSize: '0.875rem'
    },
    foldersSection: {
      marginTop: '2rem'
    },
    foldersTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: 'var(--text-color)'
    },
    foldersList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem'
    },
    folderItem: {
      backgroundColor: 'var(--hover-color)',
      padding: '1rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: 'var(--text-color)',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: 'var(--hover-color)',
        opacity: 0.8
      }
    },
    folderIcon: {
      color: 'var(--link-color)'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={styles.container}
    >
      <div style={styles.header}>
        <FiBarChart2 style={styles.headerIcon} />
        <h2 style={styles.headerTitle}>Dashboard</h2>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <FiFolder style={styles.statIcon} />
          <div style={styles.statValue}>{stats.totalFolders}</div>
          <div style={styles.statLabel}>Total Folders</div>
        </div>
        <div style={styles.statCard}>
          <FiFile style={styles.statIcon} />
          <div style={styles.statValue}>{stats.totalFiles}</div>
          <div style={styles.statLabel}>Total Files</div>
        </div>
        <div style={styles.statCard}>
          <FiFileText style={styles.statIcon} />
          <div style={styles.statValue}>{stats.totalMdFiles}</div>
          <div style={styles.statLabel}>Markdown Files</div>
        </div>
      </div>

      <div style={styles.foldersSection}>
        <h3 style={styles.foldersTitle}>Folders</h3>
        <div style={styles.foldersList}>
          {stats.folderNames.map((folder, index) => (
            <motion.div
              key={index}
              style={styles.folderItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiFolder style={styles.folderIcon} />
              <span>{folder}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard; 