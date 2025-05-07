'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function ProjectsForm() {
  const projects = useCVStore((state) => state.projects);
  const setProjects = useCVStore((state) => state.setProjects);

  const [entry, setEntry] = useState({
    name: '',
    description: '',
    techStack: '',
    link: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!entry.name || !entry.description) return;
    setProjects([...projects, entry]);
    setEntry({
      name: '',
      description: '',
      techStack: '',
      link: '',
      date: '',
    });
  };

  return (
    <section>
      <form
        onSubmit={handleAddProject}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          name="name"
          placeholder="Nazwa projektu"
          onChange={handleChange}
          value={entry.name}
        />
        <textarea
          name="description"
          placeholder="Opis projektu"
          onChange={handleChange}
          value={entry.description}
        />
        <input
          name="techStack"
          placeholder="Stack technologiczny (np. React, Node.js)"
          onChange={handleChange}
          value={entry.techStack}
        />
        <input
          name="link"
          placeholder="Link do projektu (np. GitHub, demo)"
          onChange={handleChange}
          value={entry.link}
        />
        <input
          name="date"
          placeholder="Data / okres (np. 2023)"
          onChange={handleChange}
          value={entry.date}
        />
        <button type="submit">Dodaj projekt</button>
      </form>

      {projects.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Dodane projekty:</h4>
          <ul>
            {projects.map((proj, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{proj.name}</strong> ({proj.date})<br />
                {proj.description}
                <br />
                <em>{proj.techStack}</em>
                <br />
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noreferrer">
                    {proj.link}
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
