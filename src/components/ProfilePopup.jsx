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

const ProfilePopup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({
    network: '',
    username: '',
    url: '',
  });

  const profile = useCVStore((state) => state.profile);
  const setProfile = useCVStore((state) => state.setProfile);

  useImperativeHandle(ref, () => ({
    editItem: (network) => {
      const data = profile[network];
      if (!data) return;
      setFormData({
        network: network || '',
        username: data.username || '',
        url: data.url || '',
      });
      setEditingKey(network);
      setIsOpen(true);
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.network || !formData.username) return;

    const updated = { ...profile };
    if (editingKey && editingKey !== formData.network) {
      delete updated[editingKey];
    }
    updated[formData.network] = {
      username: formData.username,
      url: formData.url,
    };
    setProfile(updated);

    setFormData({ network: '', username: '', url: '' });
    setEditingKey(null);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={addButtonStyle}>
        <span style={{ fontSize: '20px', lineHeight: 0 }}>＋</span> Dodaj profil
      </button>

      <Popup
        title={editingKey ? 'Edytuj profil' : 'Nowy profil'}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingKey(null);
          setFormData({ network: '', username: '', url: '' });
        }}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Nazwa sieci (np. LinkedIn)</label>
            <input
              name="network"
              value={formData.network || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Nazwa użytkownika</label>
            <input
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Link</label>
            <input
              name="url"
              value={formData.url || ''}
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

export default ProfilePopup;
