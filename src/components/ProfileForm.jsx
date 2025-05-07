'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function ProfileForm() {
  const setProfile = useCVStore((state) => state.setProfile);
  const [formData, setFormData] = useState({
    github: '',
    linkedin: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    console.log('Zapisano profile:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <input
        name="github"
        placeholder="GitHub (np. https://github.com/lorinnio)"
        onChange={handleChange}
        value={formData.github}
      />
      <input
        name="linkedin"
        placeholder="LinkedIn (np. https://linkedin.com/in/lorinnio)"
        onChange={handleChange}
        value={formData.linkedin}
      />
      <input
        name="website"
        placeholder="Strona / blog / portfolio"
        onChange={handleChange}
        value={formData.website}
      />
      <button type="submit">Zapisz profile</button>
    </form>
  );
}
