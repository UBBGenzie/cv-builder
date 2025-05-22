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

const ItemPopup = forwardRef(({ storeKey, fields, title }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const initialState = Object.fromEntries(fields.map((f) => [f.name, '']));
  const [formData, setFormData] = useState(initialState);

  const data = useCVStore((state) => state[storeKey]);
  const setData = useCVStore((state) => state[`set${capitalize(storeKey)}`]);

  useImperativeHandle(ref, () => ({
    editItem: (index) => {
      setFormData(data[index]);
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
    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = formData;
      setData(updated);
    } else {
      setData([...data, formData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj{' '}
        {title}
      </button>

      <Popup
        title={editingIndex !== null ? `Edytuj ${title}` : `Nowe ${title}`}
        isOpen={isOpen}
        onClose={resetForm}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          {fields.map(({ name, label, type }) => (
            <div key={name}>
              <label style={labelStyle}>{label}</label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  style={{ ...inputStyle, height: '100px' }}
                />
              ) : (
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  style={inputStyle}
                />
              )}
            </div>
          ))}
          <button type="submit" style={saveButtonStyle}>
            Zapisz
          </button>
        </form>
      </Popup>
    </>
  );
});

export default ItemPopup;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
