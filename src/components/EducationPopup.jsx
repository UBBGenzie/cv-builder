'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';

export default function EducationPopup() {
  const education = useCVStore((state) => state.education);
  const setEducation = useCVStore((state) => state.setEducation);

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    mode: '',
    dateRange: '',
    summary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.school || !formData.degree) return;
    setEducation([...education, formData]);
    setFormData({
      school: '',
      degree: '',
      field: '',
      mode: '',
      dateRange: '',
      summary: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '1rem' }}>
        Dodaj edukację
      </button>

      <Popup
        title="Nowa edukacja"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleAdd}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            name="school"
            placeholder="Uczelnia"
            onChange={handleChange}
            value={formData.school}
          />
          <input
            name="degree"
            placeholder="Stopień (np. Inżynier)"
            onChange={handleChange}
            value={formData.degree}
          />
          <input
            name="field"
            placeholder="Kierunek"
            onChange={handleChange}
            value={formData.field}
          />
          <input
            name="mode"
            placeholder="Tryb (np. stacjonarne)"
            onChange={handleChange}
            value={formData.mode}
          />
          <input
            name="dateRange"
            placeholder="Okres (np. 2021–2025)"
            onChange={handleChange}
            value={formData.dateRange}
          />
          <textarea
            name="summary"
            placeholder="Opis / podsumowanie"
            onChange={handleChange}
            value={formData.summary}
          />
          <button type="submit">Zapisz</button>
        </form>
      </Popup>

      {education.length > 0 && (
        <div>
          <h4>Dodane wpisy edukacji:</h4>
          <ul>
            {education.map((edu, i) => (
              <li key={i}>
                <strong>{edu.degree}</strong> – {edu.field} ({edu.dateRange})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
