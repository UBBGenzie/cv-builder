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
store =
  typeof window !== 'undefined'
    ? create(
        persist(storeConfig, {
          name: 'cv-builder-storage',
          onRehydrateStorage: () => (state) => {
            state.setHasHydrated?.();
          },
        })
      )
    : create(storeConfig); // fallback dla SSR

export default store;
