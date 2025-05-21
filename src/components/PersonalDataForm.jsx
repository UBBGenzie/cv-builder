'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';

export default function PersonalDataForm() {
  const setPersonalData = useCVStore((state) => state.setPersonalData);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    portfolio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonalData(formData);
    console.log('Zapisano dane osobowe:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <input
        name="firstName"
        placeholder="Imię"
        onChange={handleChange}
        value={formData.firstName}
      />
      <input
        name="lastName"
        placeholder="Nazwisko"
        onChange={handleChange}
        value={formData.lastName}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        name="phone"
        placeholder="Telefon"
        onChange={handleChange}
        value={formData.phone}
      />
      <input
        name="location"
        placeholder="Lokalizacja"
        onChange={handleChange}
        value={formData.location}
      />
      <input
        name="portfolio"
        placeholder="Strona / portfolio"
        onChange={handleChange}
        value={formData.portfolio}
      />
      <button type="submit">Zapisz dane</button>
    </form>
  );
}
