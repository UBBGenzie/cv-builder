'use client';
import useCVStore from '../store/cvStore';
import { Pencil, Trash2 } from 'lucide-react';

export default function ProjectsList({ popupRef }) {
  const projects = useCVStore((state) => state.projects);
  const setProjects = useCVStore((state) => state.setProjects);

  const handleDelete = (indexToRemove) => {
    const updated = projects.filter((_, i) => i !== indexToRemove);
    setProjects(updated);
  };

  return (
    <div
      style={{
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {projects.map((item, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #333',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: '#1E1E1E',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{item.name || 'Projekt bez nazwy'}</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => popupRef.current?.editItem(index)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#FAFAFA',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Edytuj"
              title="Edytuj"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => handleDelete(index)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Usuń"
              title="Usuń"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
