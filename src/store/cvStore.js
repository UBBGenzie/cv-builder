import { create } from 'zustand';

const useCVStore = create((set) => ({
  personalData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    portfolio: '',
  },
  profile: {
    github: '',
    linkedin: '',
  },
  experience: [],
  education: [],
  certifications: [],
  skills: [],
  projects: [],

  // setters
  setPersonalData: (data) => set({ personalData: data }),
  setProfile: (data) => set({ profile: data }),
  setExperience: (data) => set({ experience: data }),
  setEducation: (data) => set({ education: data }),
  setCertifications: (data) => set({ certifications: data }),
  setSkills: (data) => set({ skills: data }),
  setProjects: (data) => set({ projects: data }),
}));

export default useCVStore;
