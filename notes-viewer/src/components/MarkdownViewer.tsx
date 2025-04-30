import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useLocation } from 'react-router-dom';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { FiFileText, FiAlertCircle, FiClock, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  inline?: boolean;
}

interface HeadingProps {
  children?: React.ReactNode;
  level?: number;
  [key: string]: any;
}

interface LinkProps {
  children?: React.ReactNode;
  href?: string;
}

const MarkdownViewer: React.FC = () => {
  const { '*': filePath } = useParams();
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastModified, setLastModified] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%',
      backgroundColor: '#1a1f2e',
      color: '#f1f5f9'
    },
    header: {
      padding: '1.5rem 2rem',
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
      backgroundColor: '#1a1f2e'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    fileIcon: {
      color: '#60a5fa',
      flexShrink: 0
    },
    titleContainer: {
      flex: 1,
      minWidth: 0
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#f1f5f9',
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const
    },
    metadata: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginTop: '0.5rem',
      color: '#94a3b8',
      fontSize: '0.875rem'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    content: {
      flex: 1,
      padding: '2rem',
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      lineHeight: 1.7,
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: '#f1f5f9',
        marginTop: '2rem',
        marginBottom: '1rem',
        position: 'relative' as const,
        scrollMarginTop: '100px'
      },
      '& h1': {
        fontSize: '2rem',
        borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
        paddingBottom: '0.5rem'
      },
      '& h2': { fontSize: '1.75rem' },
      '& h3': { fontSize: '1.5rem' },
      '& h4': { fontSize: '1.25rem' },
      '& p': {
        marginBottom: '1.5rem',
        color: '#e2e8f0'
      },
      '& a': {
        color: '#60a5fa',
        textDecoration: 'none',
        transition: 'color 0.2s',
        '&:hover': {
          color: '#93c5fd'
        }
      },
      '& ul, & ol': {
        paddingLeft: '1.5rem',
        marginBottom: '1.5rem',
        color: '#e2e8f0'
      },
      '& li': {
        marginBottom: '0.5rem'
      },
      '& code': {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        padding: '0.2em 0.4em',
        borderRadius: '0.375rem',
        fontSize: '0.875em',
        color: '#60a5fa'
      },
      '& pre': {
        margin: '1.5rem 0',
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: '#1e293b',
        overflow: 'auto'
      },
      '& blockquote': {
        borderLeft: '4px solid #60a5fa',
        paddingLeft: '1rem',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: '1.5rem',
        color: '#94a3b8',
        fontStyle: 'italic'
      },
      '& table': {
        width: '100%',
        marginBottom: '1.5rem',
        borderCollapse: 'collapse' as const
      },
      '& th, & td': {
        padding: '0.75rem',
        borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
        textAlign: 'left' as const
      },
      '& th': {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        color: '#f1f5f9',
        fontWeight: 600
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem'
      },
      '& hr': {
        border: 'none',
        borderTop: '1px solid rgba(30, 41, 59, 0.5)',
        margin: '2rem 0'
      }
    },
    errorContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center' as const
    },
    errorIcon: {
      color: '#ef4444',
      marginBottom: '1rem'
    },
    errorMessage: {
      color: '#f1f5f9',
      fontSize: '1.25rem',
      marginBottom: '0.5rem'
    },
    errorDetail: {
      color: '#94a3b8',
      fontSize: '0.875rem'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem'
    },
    loadingSpinner: {
      width: '3rem',
      height: '3rem',
      border: '4px solid rgba(96, 165, 250, 0.1)',
      borderTopColor: '#60a5fa',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      marginTop: '1rem',
      color: '#94a3b8',
      fontSize: '0.875rem'
    },
    heading1: {
      fontSize: '2rem',
      fontWeight: 600,
      marginTop: '2rem',
      marginBottom: '1rem',
      color: '#f1f5f9',
      scrollMarginTop: '100px'
    },
    heading2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      marginTop: '1.75rem',
      marginBottom: '0.75rem',
      color: '#f1f5f9',
      scrollMarginTop: '100px'
    },
    heading3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
      color: '#f1f5f9',
      scrollMarginTop: '100px'
    },
    link: {
      color: '#60a5fa',
      textDecoration: 'none',
      transition: 'color 0.2s',
      '&:hover': {
        color: '#93c5fd'
      }
    },
    blockquote: {
      borderLeft: '4px solid #60a5fa',
      paddingLeft: '1rem',
      marginLeft: 0,
      marginRight: 0,
      marginBottom: '1.5rem',
      color: '#94a3b8',
      fontStyle: 'italic'
    },
    table: {
      width: '100%',
      marginBottom: '1.5rem',
      borderCollapse: 'collapse' as const
    },
    tableHeader: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      color: '#f1f5f9',
      fontWeight: 600,
      padding: '0.75rem',
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
      textAlign: 'left' as const
    },
    tableCell: {
      padding: '0.75rem',
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
      textAlign: 'left' as const
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem'
    }
  };

  // Function to convert heading text to ID
  const slugify = (text: React.ReactNode): string => {
    if (typeof text === 'string') {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, '-');
    }
    // If text is a React node, convert it to string
    const textString = React.Children.toArray(text)
      .map(child => {
        if (typeof child === 'string') return child;
        if (React.isValidElement(child)) {
          const props = child.props as { children?: React.ReactNode };
          if (props.children) {
            return React.Children.toArray(props.children).join('');
          }
        }
        return '';
      })
      .join('')
      .trim();
    
    return textString
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  };

  // Handle hash navigation
  useEffect(() => {
    if (location.hash && contentRef.current) {
      const id = location.hash.slice(1); // Remove the # from the hash
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, content]);

  useEffect(() => {
    const fetchContent = async () => {
      if (!filePath) return;
      
      try {
        setIsLoading(true);
        // The filePath should already include the full path from public
        const response = await fetch(`/${filePath}`);
        if (!response.ok) throw new Error('Failed to load file');
        
        const text = await response.text();
        // Check if the content is actually markdown
        if (text.includes('<!DOCTYPE html>') || text.includes('<html')) {
          throw new Error('Invalid markdown content');
        }
        setContent(text);
        
        const lastModified = response.headers.get('last-modified');
        if (lastModified) {
          setLastModified(new Date(lastModified).toLocaleString());
        }
        
        setError('');
      } catch (err) {
        setError('Failed to load the markdown file');
        setContent('');
        console.error('Error loading file:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [filePath]);

  const fileName = filePath?.split('/').pop() || '';

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.loadingContainer}
      >
        <div style={styles.loadingSpinner} />
        <p style={styles.loadingText}>Loading document...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.errorContainer}
      >
        <FiAlertCircle size={48} style={styles.errorIcon} />
        <h2 style={styles.errorMessage}>Failed to load document</h2>
        <p style={styles.errorDetail}>{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <FiFileText size={24} style={styles.fileIcon} />
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>{fileName}</h1>
            <div style={styles.metadata}>
              <div style={styles.metaItem}>
                <FiCalendar size={14} />
                <span>Created: {new Date().toLocaleDateString()}</span>
              </div>
              {lastModified && (
                <div style={styles.metaItem}>
                  <FiClock size={14} />
                  <span>Modified: {lastModified}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div ref={contentRef} style={styles.content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children, ...props }: HeadingProps) => {
              const id = slugify(children);
              return (
                <h1 id={id} style={styles.heading1} {...props}>
                  {children}
                </h1>
              );
            },
            h2: ({ children, ...props }: HeadingProps) => {
              const id = slugify(children);
              return (
                <h2 id={id} style={styles.heading2} {...props}>
                  {children}
                </h2>
              );
            },
            h3: ({ children, ...props }: HeadingProps) => {
              const id = slugify(children);
              return (
                <h3 id={id} style={styles.heading3} {...props}>
                  {children}
                </h3>
              );
            },
            code({ className, children, inline }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '0.2em 0.4em', borderRadius: '0.375rem', fontSize: '0.875em', color: '#60a5fa' }}>
                  {children}
                </code>
              );
            },
            a: ({ children, href, ...props }: LinkProps) => {
              // Handle both internal hash links and external links
              const isHashLink = href && href.startsWith('#');
              const linkProps = isHashLink
                ? {
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      const id = href.slice(1);
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        // Update URL without triggering a page reload
                        window.history.pushState(null, '', href);
                      }
                    },
                  }
                : {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  };

              return (
                <a href={href} style={styles.link} {...linkProps} {...props}>
                  {children}
                </a>
              );
            },
            blockquote: ({node, ...props}) => <blockquote style={styles.blockquote} {...props} />,
            table: ({node, ...props}) => <table style={styles.table} {...props} />,
            th: ({node, ...props}) => <th style={styles.tableHeader} {...props} />,
            td: ({node, ...props}) => <td style={styles.tableCell} {...props} />,
            img: ({node, ...props}) => <img style={styles.image} {...props} />,
            p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', color: '#e2e8f0' }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: '#e2e8f0' }} {...props} />,
            ol: ({node, ...props}) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: '#e2e8f0' }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
            hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid rgba(30, 41, 59, 0.5)', margin: '2rem 0' }} {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default MarkdownViewer;