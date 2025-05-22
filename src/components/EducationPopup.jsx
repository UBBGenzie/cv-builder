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

const EducationPopup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    dateRange: '',
    location: '',
    description: '',
  });

  const education = useCVStore((state) => state.education);
  const setEducation = useCVStore((state) => state.setEducation);

  useImperativeHandle(ref, () => ({
    editItem: (index) => {
      const item = education[index];
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
    if (!formData.school || !formData.degree) return;

    if (editingIndex !== null) {
      const updated = [...education];
      updated[editingIndex] = formData;
      setEducation(updated);
    } else {
      setEducation([...education, formData]);
    }

    setFormData({
      school: '',
      degree: '',
      field: '',
      dateRange: '',
      location: '',
      description: '',
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj
        edukację
      </button>

      <Popup
        title={editingIndex !== null ? 'Edytuj edukację' : 'Nowa edukacja'}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingIndex(null);
          setFormData({
            school: '',
            degree: '',
            field: '',
            dateRange: '',
            location: '',
            description: '',
          });
        }}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Szkoła</label>
            <input
              name="school"
              value={formData.school}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Stopień</label>
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Kierunek</label>
            <input
              name="field"
              value={formData.field}
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

export default EducationPopup;
