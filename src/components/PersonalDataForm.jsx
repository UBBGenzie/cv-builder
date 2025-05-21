'use client';

import { useEffect, useState } from 'react';
import useCVStore from '../store/cvStore';

export default function PersonalDataForm() {
  const personalData = useCVStore((state) => state.personalData);
  const setPersonalData = useCVStore((state) => state.setPersonalData);
  const hasHydrated = useCVStore((state) => state.hasHydrated);

  const [formData, setFormData] = useState(personalData);

  // autosave do Zustand przy każdej zmianie formData
  useEffect(() => {
    if (hasHydrated) {
      setFormData(personalData); // załaduj dane po rehydratacji
    }
  }, [hasHydrated]);

  useEffect(() => {
    if (hasHydrated) {
      setPersonalData(formData);
    }
  }, [formData, setPersonalData, hasHydrated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, picture: base64 }));
    };
    reader.readAsDataURL(file);
  };

  if (!hasHydrated) return null;

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input
        name="fullName"
        placeholder="Imię i nazwisko"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        name="headline"
        placeholder="Nagłówek (np. Frontend Developer)"
        value={formData.headline}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Telefon"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Lokalizacja"
        value={formData.location}
        onChange={handleChange}
      />
      <input
        name="portfolio"
        placeholder="Strona / portfolio"
        value={formData.portfolio}
        onChange={handleChange}
      />
      <label>
        Zdjęcie (plik):
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </label>
      <textarea
        name="summary"
        placeholder="Podsumowanie / Bio"
        value={formData.summary}
        onChange={handleChange}
      />
    </form>
  );
}
