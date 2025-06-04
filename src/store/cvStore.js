'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let store;

const getInitialState = () => ({
  personalData: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    portfolio: '',
    picture: '',
    summary: '',
  },
  profile: {},
  experience: [],
  education: [],
  certifications: [],
  skills: [],
  projects: [],
  languages: [],
  appearance: {
    color: '#dc2626', // red-600
    font: 'Arial',
    fontSize: 14,
    lineHeight: 1.4,
  },
  hasHydrated: false,
});

const storeConfig = (set) => ({
  ...getInitialState(),

  setPersonalData: (data) => set({ personalData: data }),
  setProfile: (data) => set({ profile: data }),
  setExperience: (data) => set({ experience: data }),
  setEducation: (data) => set({ education: data }),
  setCertifications: (data) => set({ certifications: data }),
  setSkills: (data) => set({ skills: data }),
  setProjects: (data) => set({ projects: data }),
  setLanguages: (data) => set({ languages: data }),
  setAppearance: (data) => set({ appearance: data }),

  setHasHydrated: () => set({ hasHydrated: true }),
  resetCV: () => set(getInitialState()),
});

// twórz store tylko raz (w przeglądarce)
const dynamicLocalStorage = {
  getItem: (name) => {
    const email = window.localStorage.getItem('cv-builder-email') || 'anonymous';
    return window.localStorage.getItem(`${name}-${email}`);
  },
  setItem: (name, value) => {
    const email = window.localStorage.getItem('cv-builder-email') || 'anonymous';
    window.localStorage.setItem(`${name}-${email}`, value);
  },
  removeItem: (name) => {
    const email = window.localStorage.getItem('cv-builder-email') || 'anonymous';
    window.localStorage.removeItem(`${name}-${email}`);
  },
};

store =
  typeof window !== 'undefined'
    ? create(
        persist(storeConfig, {
          name: 'cv-builder-storage',
          storage: dynamicLocalStorage,
          onRehydrateStorage: () => (state) => {
            state.setHasHydrated?.();
          },
        })
      )
    : create(storeConfig); // fallback dla SSR

export default store;
