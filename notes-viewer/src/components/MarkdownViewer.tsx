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
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color)',
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    fileIcon: {
      color: 'var(--text-color)',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600,
      color: 'var(--text-color)',
    },
    metadata: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: 'var(--text-color)',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    content: {
      flex: 1,
      padding: '2rem',
      overflowY: 'auto' as const,
      backgroundColor: 'var(--bg-color)',
    },
    heading1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      margin: '2rem 0 1.5rem',
      color: 'var(--text-color)',
    },
    heading2: {
      fontSize: '2rem',
      fontWeight: 600,
      margin: '2rem 0 1.25rem',
      color: 'var(--text-color)',
    },
    heading3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      margin: '1.5rem 0 1rem',
      color: 'var(--text-color)',
    },
    link: {
      color: 'var(--link-color)',
      textDecoration: 'none',
      '&:hover': {
        color: 'var(--link-hover)',
        textDecoration: 'underline',
      },
    },
    blockquote: {
      borderLeft: '4px solid var(--border-color)',
      margin: '1.5rem 0',
      padding: '0.5rem 1rem',
      backgroundColor: 'var(--hover-color)',
      color: 'var(--text-color)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      margin: '1rem 0'
    },
    tableHeader: {
      padding: '0.75rem',
      borderBottom: '2px solid var(--border-color)',
      backgroundColor: 'var(--hover-color)',
      color: 'var(--text-color)',
    },
    tableCell: {
      padding: '0.75rem',
      borderBottom: '1px solid var(--border-color)',
      color: 'var(--text-color)',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      margin: '1.5rem 0',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: 'var(--bg-color)',
    },
    loadingSpinner: {
      width: '3rem',
      height: '3rem',
      border: '4px solid var(--border-color)',
      borderTop: '4px solid var(--link-color)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    loadingText: {
      marginTop: '1rem',
      color: 'var(--text-color)',
    },
    errorContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '2rem',
      backgroundColor: 'var(--bg-color)',
    },
    errorIcon: {
      color: 'var(--text-color)',
      marginBottom: '1rem',
    },
    errorMessage: {
      margin: '0.5rem 0',
      color: 'var(--text-color)',
    },
    errorDetail: {
      margin: 0,
      color: 'var(--text-color)',
      textAlign: 'center' as const,
    },
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
        // For GitHub Pages deployment, we need to include the repository name in the path
        const baseUrl = process.env.NODE_ENV === 'production'
          ? '/notes'  // GitHub Pages deployment
          : '/notes-viewer';  // Local development with Vite
        
        // Ensure the filePath starts with the correct base path
        const normalizedFilePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
        const response = await fetch(`${baseUrl}/${normalizedFilePath}`);
        
        if (!response.ok) {
          console.error(`Failed to load file: ${baseUrl}/${normalizedFilePath}`);
          throw new Error('Failed to load file');
        }
        
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
                <code className={className} style={{ backgroundColor: 'var(--code-bg)', padding: '0.2em 0.4em', borderRadius: '0.375rem', fontSize: '0.875em', color: 'var(--code-text)' }}>
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
            p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-color)' }} {...props} />,
            ol: ({node, ...props}) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-color)' }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
            hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default MarkdownViewer;