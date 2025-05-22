'use client';
import useCVStore from '../store/cvStore';
import { Trash2 } from 'lucide-react';

export default function ResetCVButton() {
  const resetCV = useCVStore((state) => state.resetCV);
  const hasHydrated = useCVStore((state) => state.hasHydrated);

  const handleReset = () => {
    if (confirm('Czy na pewno chcesz wyczyścić wszystkie dane CV?')) {
      resetCV?.();
      localStorage.removeItem('cv-builder-storage');
      window.location.reload();
    }
  };

  if (!hasHydrated) return null;

  return (
    <button
      onClick={handleReset}
      title="Wyczyść dane"
      style={{
        background: 'transparent',
        border: 'none',
        color: '#FAFAFA',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.75rem',
        width: '2.75rem',
        borderRadius: '6px',
      }}
    >
      <Trash2 size={28} />
    </button>
  );
}
