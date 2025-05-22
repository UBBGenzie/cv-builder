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

const CertificationPopup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    description: '',
    link: '',
  });

  const certifications = useCVStore((state) => state.certifications);
  const setCertifications = useCVStore((state) => state.setCertifications);

  useImperativeHandle(ref, () => ({
    editItem: (index) => {
      const item = certifications[index];
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

    if (editingIndex !== null) {
      const updated = [...certifications];
      updated[editingIndex] = formData;
      setCertifications(updated);
    } else {
      setCertifications([...certifications, formData]);
    }

    setFormData({
      name: '',
      issuer: '',
      date: '',
      description: '',
      link: '',
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj
        certyfikat
      </button>

      <Popup
        title={editingIndex !== null ? 'Edytuj certyfikat' : 'Nowy certyfikat'}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingIndex(null);
          setFormData({
            name: '',
            issuer: '',
            date: '',
            description: '',
            link: '',
          });
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
            <label style={labelStyle}>Organizator</label>
            <input
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Data</label>
            <input
              name="date"
              type="date"
              value={formData.date}
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

export default CertificationPopup;
