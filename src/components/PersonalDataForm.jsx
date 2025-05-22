'use client';

import { useEffect, useState } from 'react';
import useCVStore from '../store/cvStore';
import { Trash2 } from 'lucide-react';

export default function PersonalDataForm() {
  const personalData = useCVStore((state) => state.personalData);
  const setPersonalData = useCVStore((state) => state.setPersonalData);
  const hasHydrated = useCVStore((state) => state.hasHydrated);

  const [formData, setFormData] = useState(personalData);

  useEffect(() => {
    if (hasHydrated) {
      setFormData(personalData);
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

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, picture: '' }));
  };

  if (!hasHydrated) return null;

  const inputStyle = {
    fontSize: '16px',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#1e1e1e',
    color: '#FAFAFA',
    width: '100%',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    marginBottom: '0.5rem',
    color: '#FAFAFA',
  };

  const fileButtonStyle = {
    marginTop: '0.5rem',
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#FAFAFA',
    border: '1px solid #555',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '14px',
  };

  const fileInputHidden = {
    display: 'none',
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>Imię i nazwisko</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Nagłówek (np. Frontend Developer)</label>
        <input
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Email + Portfolio w jednej linii */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Strona / portfolio</label>
          <input
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Telefon + Lokalizacja w jednej linii */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Telefon</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Lokalizacja</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Zdjęcie */}
      <div>
        <label style={labelStyle}>Zdjęcie</label>
        {formData.picture ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
              <img
                src={formData.picture}
                alt="Zdjęcie"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid #444',
                }}
              />
            </label>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <label htmlFor="file-upload" style={fileButtonStyle}>
                Zmień zdjęcie
              </label>
              <button
                type="button"
                onClick={handleRemovePhoto}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                }}
                title="Usuń zdjęcie"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={fileInputHidden}
            />
          </div>
        ) : (
          <>
            <div style={{ marginTop: '0.5rem' }}>
              <label htmlFor="file-upload" style={fileButtonStyle}>
                Wybierz plik
              </label>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={fileInputHidden}
            />
          </>
        )}
      </div>

      {/* Podsumowanie */}
      <div>
        <label style={labelStyle}>Podsumowanie / Bio</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          style={{ ...inputStyle, height: '120px' }}
        />
      </div>
    </form>
  );
}
