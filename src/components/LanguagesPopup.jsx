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

const LanguagesPopup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 1,
  });

  const languages = useCVStore((state) => state.languages);
  const setLanguages = useCVStore((state) => state.setLanguages);

  useImperativeHandle(ref, () => ({
    editItem: (index) => {
      const item = languages[index];
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
    if (!formData.name) return;

    const parsedLevel = parseInt(formData.level);
    const updatedItem = {
      ...formData,
      level: isNaN(parsedLevel) ? 1 : parsedLevel,
    };

    if (editingIndex !== null) {
      const updated = [...languages];
      updated[editingIndex] = updatedItem;
      setLanguages(updated);
    } else {
      setLanguages([...languages, updatedItem]);
    }

    setFormData({ name: '', description: '', level: 1 });
    setEditingIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj język
      </button>

      <Popup
        title={editingIndex !== null ? 'Edytuj język' : 'Nowy język'}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingIndex(null);
          setFormData({ name: '', description: '', level: 1 });
        }}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Nazwa</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Poziom (1-5)</label>
            <input
              name="level"
              type="number"
              min="1"
              max="5"
              value={formData.level}
              onChange={handleChange}
              style={inputStyle}
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

export default LanguagesPopup;
