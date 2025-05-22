'use client';
import useCVStore from '../store/cvStore';
import { Pencil, Trash2 } from 'lucide-react';

export default function ItemList({ storeKey, titleKey, popupRef }) {
  const data = useCVStore((state) => state[storeKey]);
  const setData = useCVStore((state) => state[`set${capitalize(storeKey)}`]);

  const handleDelete = (indexToRemove) => {
    const updated = data.filter((_, i) => i !== indexToRemove);
    setData(updated);
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
      {data.map((item, index) => (
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
          <span>{item[titleKey] || '(brak tytułu)'}</span>
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
                color: '#EF4444', // czerwony
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
