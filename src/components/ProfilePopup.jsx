'use client';
import { useState } from 'react';
import useCVStore from '../store/cvStore';
import Popup from './Popup';

export default function ProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);

  const [newProfile, setNewProfile] = useState({
    network: '',
    username: '',
    website: '',
  });

  const profile = useCVStore((state) => state.profile);
  const setProfile = useCVStore((state) => state.setProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newProfile.network || !newProfile.website) return;

    const updatedProfile = {
      ...profile,
      [newProfile.network.toLowerCase()]: newProfile.website,
    };

    setProfile(updatedProfile);
    setNewProfile({ network: '', username: '', website: '' });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ marginBottom: '1rem' }}>
        Dodaj profil
      </button>

      <Popup
        title="Nowy profil"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleAdd}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            name="network"
            placeholder="Sieć (np. GitHub)"
            onChange={handleChange}
            value={newProfile.network}
          />
          <input
            name="username"
            placeholder="Nazwa użytkownika"
            onChange={handleChange}
            value={newProfile.username}
          />
          <input
            name="website"
            placeholder="Adres URL profilu"
            onChange={handleChange}
            value={newProfile.website}
          />
          <button type="submit">Zapisz</button>
        </form>
      </Popup>

      {Object.entries(profile).filter(([_, url]) => url?.trim() !== '').length >
        0 && (
        <div>
          <h4>Dodane profile:</h4>
          <ul>
            {Object.entries(profile)
              .filter(([_, url]) => url?.trim() !== '')
              .map(([network, url], i) => (
                <li key={i}>
                  <strong>{network}</strong>: <a href={url}>{url}</a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
