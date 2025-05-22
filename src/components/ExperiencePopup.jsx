// ExperiencePopup.jsx
'use client';
import { useState, forwardRef, useImperativeHandle } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';
import {
  inputStyle,
  labelStyle,
  formStyle,
  saveButtonStyle,
  addButtonStyle,
} from '../styles/formStyles';

const ExperiencePopup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    dateRange: '',
    location: '',
    link: '',
    description: '',
  });

  const experience = useCVStore((state) => state.experience);
  const setExperience = useCVStore((state) => state.setExperience);

  useImperativeHandle(ref, () => ({
    editItem: (index) => {
      const item = experience[index];
      setFormData(item);
      setEditingIndex(index);
      setIsOpen(true);
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.position || !formData.company) return;

    if (editingIndex !== null) {
      const updated = [...experience];
      updated[editingIndex] = formData;
      setExperience(updated);
    } else {
      setExperience([...experience, formData]);
    }

    setFormData({
      position: '',
      company: '',
      dateRange: '',
      location: '',
      link: '',
      description: '',
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj
        doświadczenie
      </button>

      <Popup
        title={
          editingIndex !== null ? 'Edytuj doświadczenie' : 'Nowe doświadczenie'
        }
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingIndex(null);
          setFormData({
            position: '',
            company: '',
            dateRange: '',
            location: '',
            link: '',
            description: '',
          });
        }}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Stanowisko</label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Firma</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Okres</label>
            <input
              name="dateRange"
              value={formData.dateRange}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Lokalizacja</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Link</label>
            <input
              name="link"
              value={formData.link}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Opis</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
            />
          </div>
          <button type="submit" style={saveButtonStyle}>
            Zapisz
          </button>
        </form>
      </Popup>
    </>
  );
});

export default ExperiencePopup;
