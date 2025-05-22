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

const ProjectsPopup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    dateRange: '',
    description: '',
  });

  const projects = useCVStore((state) => state.projects);
  const setProjects = useCVStore((state) => state.setProjects);

  useImperativeHandle(ref, () => ({
    editItem: (index) => {
      const item = projects[index];
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
      const updated = [...projects];
      updated[editingIndex] = formData;
      setProjects(updated);
    } else {
      setProjects([...projects, formData]);
    }

    setFormData({
      name: '',
      link: '',
      dateRange: '',
      description: '',
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj
        projekt
      </button>

      <Popup
        title={editingIndex !== null ? 'Edytuj projekt' : 'Nowy projekt'}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingIndex(null);
          setFormData({
            name: '',
            link: '',
            dateRange: '',
            description: '',
          });
        }}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Nazwa projektu</label>
            <input
              name="name"
              value={formData.name}
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
            <label style={labelStyle}>Okres</label>
            <input
              name="dateRange"
              value={formData.dateRange}
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

export default ProjectsPopup;
