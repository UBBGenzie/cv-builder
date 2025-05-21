'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';

export default function ProjectsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: '',
    link: '',
    date: '',
    summary: '',
  });

  const projects = useCVStore((state) => state.projects);
  const setProjects = useCVStore((state) => state.setProjects);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    setProjects([...projects, formData]);
    setFormData({
      name: '',
      description: '',
      techStack: '',
      link: '',
      date: '',
      summary: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '1rem' }}>
        Dodaj projekt
      </button>

      <Popup
        title="Nowy projekt"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleAdd}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            name="name"
            placeholder="Nazwa projektu"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            name="description"
            placeholder="Opis projektu"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            name="techStack"
            placeholder="Technologie (np. React, Node.js)"
            onChange={handleChange}
            value={formData.techStack}
          />
          <input
            name="link"
            placeholder="Link (np. GitHub, demo)"
            onChange={handleChange}
            value={formData.link}
          />
          <input
            name="date"
            placeholder="Data / okres (np. 2023)"
            onChange={handleChange}
            value={formData.date}
          />
          <textarea
            name="summary"
            placeholder="Podsumowanie projektu"
            onChange={handleChange}
            value={formData.summary}
          />
          <button type="submit">Zapisz</button>
        </form>
      </Popup>

      {projects.length > 0 && (
        <div>
          <h4>Dodane projekty:</h4>
          <ul>
            {projects.map((p, i) => (
              <li key={i}>
                <strong>{p.name}</strong> ({p.date}) – {p.techStack}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
