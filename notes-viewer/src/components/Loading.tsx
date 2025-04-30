import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '2rem'
    },
    spinner: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '9999px',
      border: '4px solid rgba(34, 211, 238, 0.3)',
      borderTopColor: '#22d3ee'
    },
    message: {
      marginTop: '1rem',
      color: '#94a3b8',
      fontSize: '0.875rem',
      fontWeight: 500
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={styles.spinner}
      />
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading; 