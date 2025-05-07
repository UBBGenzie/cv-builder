'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function EducationForm() {
  const education = useCVStore((state) => state.education);
  const setEducation = useCVStore((state) => state.setEducation);

  const [entry, setEntry] = useState({
    school: '',
    degree: '',
    field: '',
    mode: '',
    dateRange: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!entry.school || !entry.degree) return;
    setEducation([...education, entry]);
    setEntry({
      school: '',
      degree: '',
      field: '',
      mode: '',
      dateRange: '',
    });
  };

  return (
    <section>
      <form
        onSubmit={handleAddEducation}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          name="school"
          placeholder="Uczelnia"
          onChange={handleChange}
          value={entry.school}
        />
        <input
          name="degree"
          placeholder="Stopień (np. Inżynier, Magister)"
          onChange={handleChange}
          value={entry.degree}
        />
        <input
          name="field"
          placeholder="Kierunek"
          onChange={handleChange}
          value={entry.field}
        />
        <input
          name="mode"
          placeholder="Tryb (np. dzienny, zaoczny)"
          onChange={handleChange}
          value={entry.mode}
        />
        <input
          name="dateRange"
          placeholder="Zakres dat (np. 2021–2025)"
          onChange={handleChange}
          value={entry.dateRange}
        />
        <button type="submit">Dodaj edukację</button>
      </form>

      {education.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Dodane wpisy edukacji:</h4>
          <ul>
            {education.map((edu, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{edu.degree}</strong> – {edu.field} ({edu.dateRange})
                <br />
                {edu.school} ({edu.mode})
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
