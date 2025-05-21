'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';

export default function SkillsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: '3',
  });

  const skills = useCVStore((state) => state.skills);
  const setSkills = useCVStore((state) => state.setSkills);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    setSkills([...skills, formData]);
    setFormData({ name: '', description: '', level: '3' });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '1rem' }}>
        Dodaj umiejętność
      </button>

      <Popup
        title="Nowa umiejętność"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleAdd}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            name="name"
            placeholder="Nazwa (np. React)"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            name="description"
            placeholder="Opis (opcjonalnie)"
            onChange={handleChange}
            value={formData.description}
          />
          <label>
            Poziom:
            <select name="level" onChange={handleChange} value={formData.level}>
              <option value="1">1 – Początkujący</option>
              <option value="2">2 – Podstawowy</option>
              <option value="3">3 – Średniozaawansowany</option>
              <option value="4">4 – Zaawansowany</option>
              <option value="5">5 – Ekspert</option>
            </select>
          </label>
          <button type="submit">Zapisz</button>
        </form>
      </Popup>

      {skills.length > 0 && (
        <div>
          <h4>Dodane umiejętności:</h4>
          <ul>
            {skills.map((s, i) => (
              <li key={i}>
                <strong>{s.name}</strong> (poziom {s.level})<br />
                {s.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
