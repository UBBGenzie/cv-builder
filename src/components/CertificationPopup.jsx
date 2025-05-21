'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';

export default function CertificationPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    link: '',
    description: '',
  });

  const certifications = useCVStore((state) => state.certifications);
  const setCertifications = useCVStore((state) => state.setCertifications);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) return;
    setCertifications([...certifications, formData]);
    setFormData({
      title: '',
      issuer: '',
      date: '',
      link: '',
      description: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '1rem' }}>
        Dodaj certyfikat
      </button>

      <Popup
        title="Nowy certyfikat"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleAdd}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            name="title"
            placeholder="Tytuł certyfikatu"
            onChange={handleChange}
            value={formData.title}
          />
          <input
            name="issuer"
            placeholder="Organizator (np. Udemy)"
            onChange={handleChange}
            value={formData.issuer}
          />
          <input
            name="date"
            placeholder="Data (np. 2024-05)"
            onChange={handleChange}
            value={formData.date}
          />
          <input
            name="link"
            placeholder="Link do certyfikatu"
            onChange={handleChange}
            value={formData.link}
          />
          <textarea
            name="description"
            placeholder="Opis certyfikatu"
            onChange={handleChange}
            value={formData.description}
          />
          <button type="submit">Zapisz</button>
        </form>
      </Popup>

      {certifications.length > 0 && (
        <>
          <h3>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <strong>{cert.title}</strong> – {cert.issuer} ({cert.date})<br />
              {cert.link && <a href={cert.link}>{cert.link}</a>}
              <br />
              {cert.description && <p>{cert.description}</p>}
            </div>
          ))}
        </>
      )}
    </>
  );
}
