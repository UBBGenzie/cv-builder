'use client';

export default function Section({ title, icon: Icon, children }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '18px',
          marginBottom: '1rem',
        }}
      >
        {Icon && <Icon size={20} />} {title}
      </h2>
      {children}
    </section>
  );
}
