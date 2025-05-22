'use client';

import { useEffect, useRef, useState } from 'react';

export default function Popup({ title, isOpen, onClose, children }) {
  const contentRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => setAnimate(true), 10); // trigger enter animation
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      setAnimate(false);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        ref={contentRef}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#FAFAFA',
          padding: '2rem',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          transform: animate ? 'scale(1)' : 'scale(0.95)',
          opacity: animate ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{ fontSize: '24px', margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FAFAFA',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            aria-label="Zamknij popup"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
