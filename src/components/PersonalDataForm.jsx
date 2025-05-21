'use client';
import useCVStore from '../store/cvStore';
import { useEffect, useState } from 'react';

export default function PersonalDataForm() {
  const personalData = useCVStore((state) => state.personalData);
  const setPersonalData = useCVStore((state) => state.setPersonalData);

  const [formData, setFormData] = useState(personalData);

  // autosave do Zustand przy każdej zmianie formData
  useEffect(() => {
    setPersonalData(formData);
  }, [formData, setPersonalData]);

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
