'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';

export default function ExperiencePopup() {
  const experience = useCVStore((state) => state.experience);
  const setExperience = useCVStore((state) => state.setExperience);

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    dateRange: '',
    link: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.position || !formData.company) return;
    setExperience([...experience, formData]);
    setFormData({
      position: '',
      company: '',
      location: '',
      dateRange: '',
      link: '',
      description: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '1rem' }}>
        Dodaj doświadczenie
      </button>

      <Popup
        title="Nowe doświadczenie"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleAdd}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            name="position"
            placeholder="Stanowisko"
            onChange={handleChange}
            value={formData.position}
          />
          <input
            name="company"
            placeholder="Firma / Projekt"
            onChange={handleChange}
            value={formData.company}
          />
          <input
            name="location"
            placeholder="Lokalizacja"
            onChange={handleChange}
            value={formData.location}
          />
          <input
            name="dateRange"
            placeholder="Okres (np. 2022–2023)"
            onChange={handleChange}
            value={formData.dateRange}
          />
          <input
            name="link"
            placeholder="Link (np. GitHub)"
            onChange={handleChange}
            value={formData.link}
          />
          <textarea
            name="description"
            placeholder="Opis"
            onChange={handleChange}
            value={formData.description}
          />
          <button type="submit">Zapisz</button>
        </form>
      </Popup>

      {/* Podgląd dodanych */}
      {experience.length > 0 && (
        <div>
          <h4>Dodane doświadczenia:</h4>
          <ul>
            {experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.position}</strong> w {exp.company} ({exp.dateRange}
                )
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
