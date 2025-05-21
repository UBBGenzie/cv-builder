'use client';

import useCVStore from '../store/cvStore';

export default function ResetCVButton() {
  const resetCV = useCVStore((state) => state.resetCV);
  const hasHydrated = useCVStore((state) => state.hasHydrated);

  const handleReset = () => {
    if (confirm('Czy na pewno chcesz wyczyścić wszystkie dane CV?')) {
      resetCV?.(); // zabezpieczenie
      localStorage.removeItem('cv-builder-storage');
      window.location.reload(); // reload, aby odczytać pusty Zustand
    }
  };

  if (!hasHydrated) return null; // czekamy na odczyt z localStorage

  return (
    <button
      onClick={handleReset}
      style={{
        marginTop: '2rem',
        backgroundColor: '#ffcccc',
        padding: '0.5rem 1rem',
        border: '1px solid #ff0000',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      🧹 Wyczyść dane CV
    </button>
  );
}
