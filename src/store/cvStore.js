import { create } from 'zustand';

const useCVStore = create((set) => ({
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
  profile: {}, // dynamiczne profile jako obiekt { github: url, linkedin: url, ... }

  experience: [],
  education: [],
  certifications: [],
  skills: [],
  projects: [],
  languages: [],

  // setters
  setPersonalData: (data) => set({ personalData: data }),
  setProfile: (data) => set({ profile: data }),
  setExperience: (data) => set({ experience: data }),
  setEducation: (data) => set({ education: data }),
  setCertifications: (data) => set({ certifications: data }),
  setSkills: (data) => set({ skills: data }),
  setProjects: (data) => set({ projects: data }),
  setLanguages: (data) => set({ languages: data }),
}));

export default useCVStore;
