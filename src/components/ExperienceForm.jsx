'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function ExperienceForm() {
  const experience = useCVStore((state) => state.experience);
  const setExperience = useCVStore((state) => state.setExperience);

  const [entry, setEntry] = useState({
    position: '',
    company: '',
    location: '',
    dateRange: '',
    description: '',
    link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!entry.position || !entry.company) return;
    setExperience([...experience, entry]);
    setEntry({
      position: '',
      company: '',
      location: '',
      dateRange: '',
      description: '',
      link: '',
    });
  };

  return (
    <section>
      <form
        onSubmit={handleAddExperience}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          name="position"
          placeholder="Stanowisko"
          onChange={handleChange}
          value={entry.position}
        />
        <input
          name="company"
          placeholder="Firma / Projekt"
          onChange={handleChange}
          value={entry.company}
        />
        <input
          name="location"
          placeholder="Lokalizacja"
          onChange={handleChange}
          value={entry.location}
        />
        <input
          name="dateRange"
          placeholder="Zakres dat (np. 2023–2024)"
          onChange={handleChange}
          value={entry.dateRange}
        />
        <input
          name="link"
          placeholder="Link do projektu (opcjonalnie)"
          onChange={handleChange}
          value={entry.link}
        />
        <textarea
          name="description"
          placeholder="Opis doświadczenia"
          onChange={handleChange}
          value={entry.description}
        />
        <button type="submit">Dodaj doświadczenie</button>
      </form>

      {experience.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Dodane doświadczenia:</h4>
          <ul>
            {experience.map((exp, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{exp.position}</strong> w <em>{exp.company}</em> (
                {exp.dateRange})
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
