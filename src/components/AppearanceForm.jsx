'use client';
import { useState, useEffect } from 'react';
import useCVStore from '../store/cvStore';
import { inputStyle, labelStyle, formStyle } from '../styles/formStyles';

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#84cc16', '#22c55e', '#14b8a6', '#06b6d4',
  '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

const FONTS = [
  'Arial',
  'Cambria',
  'Garamond',
  'IBM Plex Sans',
  'IBM Plex Serif',
  'Lato',
  'Lora',
  'Merriweather',
  'Open Sans',
  'Playfair Display',
  'PT Sans',
  'PT Serif',
  'Roboto Condensed',
  'Times New Roman',
];

export default function AppearanceForm() {
  const appearance = useCVStore((s) => s.appearance);
  const setAppearance = useCVStore((s) => s.setAppearance);
  const hasHydrated = useCVStore((s) => s.hasHydrated);

  const [formData, setFormData] = useState(appearance);

  useEffect(() => {
    if (hasHydrated) {
      setFormData(appearance);
    }
  }, [hasHydrated]);

  useEffect(() => {
    if (hasHydrated) {
      setAppearance(formData);
    }
  }, [formData, setAppearance, hasHydrated]);

  const handleColorChange = (color) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'fontSize' ? parseInt(value, 10) : parseFloat(value) || value }));
  };

  if (!hasHydrated) return null;

  return (
    <form style={formStyle}>
      <div>
        <label style={labelStyle}>Akcent kolorystyczny</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {COLORS.map((c) => (
            <div
              key={c}
              onClick={() => handleColorChange(c)}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                backgroundColor: c,
                border: c === formData.color ? '2px solid #fff' : '1px solid #333',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <label style={labelStyle}>Font</label>
        <select name="font" value={formData.font} onChange={handleChange} style={inputStyle}>
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Rozmiar czcionki: {formData.fontSize}px</label>
        <input
          type="range"
          name="fontSize"
          min="12"
          max="24"
          value={formData.fontSize}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label style={labelStyle}>Wysokość linii: {formData.lineHeight.toFixed(1)}</label>
        <input
          type="range"
          name="lineHeight"
          min="1"
          max="2"
          step="0.1"
          value={formData.lineHeight}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
    </form>
  );
}
