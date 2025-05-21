'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function SkillsForm() {
  const skills = useCVStore((state) => state.skills);
  const setSkills = useCVStore((state) => state.setSkills);

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    setSkills([...skills, trimmed]);
    setSkillInput('');
  };

  return (
    <section>
      <form
        onSubmit={handleAddSkill}
        style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
      >
        <input
          name="skill"
          placeholder="Dodaj umiejętność (np. React)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>

      {skills.length > 0 && (
        <div>
          <h4>Dodane umiejętności:</h4>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {skills.map((skill, index) => (
              <li
                key={index}
                style={{
                  background: '#eee',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
