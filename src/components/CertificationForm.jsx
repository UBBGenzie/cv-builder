'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function CertificationForm() {
  const certifications = useCVStore((state) => state.certifications);
  const setCertifications = useCVStore((state) => state.setCertifications);

  const [entry, setEntry] = useState({
    title: '',
    issuer: '',
    date: '',
    link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (!entry.title || !entry.issuer) return;
    setCertifications([...certifications, entry]);
    setEntry({
      title: '',
      issuer: '',
      date: '',
      link: '',
    });
  };

  return (
    <section>
      <form
        onSubmit={handleAddCertificate}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          name="title"
          placeholder="Tytuł certyfikatu"
          onChange={handleChange}
          value={entry.title}
        />
        <input
          name="issuer"
          placeholder="Organizator (np. Udemy, Google)"
          onChange={handleChange}
          value={entry.issuer}
        />
        <input
          name="date"
          placeholder="Data (np. 2024-03)"
          onChange={handleChange}
          value={entry.date}
        />
        <input
          name="link"
          placeholder="Link do certyfikatu (opcjonalnie)"
          onChange={handleChange}
          value={entry.link}
        />
        <button type="submit">Dodaj certyfikat</button>
      </form>

      {certifications.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Dodane certyfikaty:</h4>
          <ul>
            {certifications.map((cert, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{cert.title}</strong> – {cert.issuer} ({cert.date})
                <br />
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noreferrer">
                    {cert.link}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
