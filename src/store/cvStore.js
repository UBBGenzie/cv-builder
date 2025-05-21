'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let store;

const storeConfig = (set) => ({
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

  setPersonalData: (data) => set({ personalData: data }),
  setProfile: (data) => set({ profile: data }),
  setExperience: (data) => set({ experience: data }),
  setEducation: (data) => set({ education: data }),
  setCertifications: (data) => set({ certifications: data }),
  setSkills: (data) => set({ skills: data }),
  setProjects: (data) => set({ projects: data }),
  setLanguages: (data) => set({ languages: data }),

  hasHydrated: false,
  setHasHydrated: () => set({ hasHydrated: true }),
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
