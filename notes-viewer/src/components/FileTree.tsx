import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileItem } from '../utils/scanDirectory';
import { FiChevronRight, FiChevronDown, FiFolder, FiFile, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FileTreeProps {
  items: FileItem[];
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ items, level = 0 }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const styles = {
    list: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem',
      width: '100%'
    },
    listItem: {
      position: 'relative' as const,
      width: '100%'
    },
    folderButton: (isExpanded: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      textAlign: 'left' as const,
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      transition: 'all 0.2s',
      backgroundColor: isExpanded ? 'var(--hover-color)' : 'transparent',
      color: 'var(--text-color)',
      cursor: 'pointer',
      border: 'none',
      minWidth: 0
    }),
    fileName: {
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
      fontSize: '0.95em',
      flex: '1 1 auto',
      minWidth: 0,
      marginRight: '1rem',
      wordBreak: 'break-all' as const,
      color: 'var(--text-color)'
    },
    fileLink: (isActive: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      transition: 'all 0.2s',
      backgroundColor: isActive ? 'var(--hover-color)' : 'transparent',
      color: isActive ? 'var(--link-color)' : 'var(--text-color)',
      textDecoration: 'none',
      position: 'relative' as const,
      boxShadow: isActive ? 'inset 0 0 0 1px var(--link-color)' : 'none',
      '&:hover': {
        backgroundColor: 'var(--hover-color)',
        color: 'var(--link-color)'
      },
      width: '100%',
      minWidth: 0,
      paddingRight: '2rem'
    }),
    fileIcon: {
      marginRight: '0.75rem',
      marginLeft: '0.25rem',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      width: '20px',
      color: 'var(--text-color)'
    },
    folderIcon: {
      marginRight: '0.5rem',
      flexShrink: 0,
      color: 'var(--link-color)',
      width: '20px'
    },
    chevronIcon: {
      marginRight: '0.5rem',
      flexShrink: 0,
      color: 'var(--text-color)',
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subTree: {
      marginLeft: '1.5rem',
      paddingLeft: '0.5rem',
      borderLeft: '2px solid var(--border-color)',
      width: 'calc(100% - 1.5rem)'
    },
    activeIndicator: {
      position: 'absolute' as const,
      right: '0.75rem',
      width: '0.375rem',
      height: '0.375rem',
      backgroundColor: 'var(--link-color)',
      borderRadius: '9999px'
    },
    fileNameContainer: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      flex: 1,
      overflow: 'hidden'
    }
  };

  const toggleExpand = (path: string) => {
    setExpanded(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.md') || fileName.endsWith('.markdown')) {
      return <FiFileText style={{ color: 'var(--link-color)', fontSize: '1.2em' }} />;
    }
    return <FiFile style={{ color: 'var(--text-color)' }} />;
  };

  return (
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item.path} style={styles.listItem}>
          {item.type === 'directory' ? (
            <div>
              <button
                onClick={() => toggleExpand(item.path)}
                style={styles.folderButton(expanded[item.path])}
              >
                <motion.span
                  animate={{ rotate: expanded[item.path] ? 90 : 0 }}
                  style={styles.chevronIcon}
                >
                  {expanded[item.path] ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )}
                </motion.span>
                <FiFolder style={styles.folderIcon} />
                <div style={styles.fileNameContainer}>
                  <span style={styles.fileName}>{item.name}</span>
                </div>
              </button>

              <AnimatePresence>
                {expanded[item.path] && item.children && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={styles.subTree}>
                      <FileTree items={item.children} level={level + 1} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to={`/notes${item.path}`}
              style={styles.fileLink(location.pathname === `/notes${item.path}`)}
            >
              <span style={styles.fileIcon}>
                {getFileIcon(item.name)}
              </span>
              <div style={styles.fileNameContainer}>
                <span style={styles.fileName}>{item.name}</span>
              </div>
              {location.pathname === `/notes${item.path}` && (
                <motion.div 
                  layoutId="activeFileIndicator"
                  style={styles.activeIndicator}
                  initial={false}
                />
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileTree;