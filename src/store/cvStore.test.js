import { describe, it, expect } from 'vitest';
import store from './cvStore.js';

const defaults = {
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
};

describe('cvStore resetCV', () => {
  it('resets all fields to defaults', () => {
    const {
      setPersonalData,
      setProfile,
      setExperience,
      resetCV,
    } = store.getState();

    setPersonalData({
      fullName: 'John',
      headline: 'Developer',
      email: 'john@example.com',
      phone: '123',
      location: 'Somewhere',
      portfolio: 'john.com',
      picture: 'pic',
      summary: 'bio',
    });
    setProfile({ foo: 'bar' });
    setExperience([{ company: 'X' }]);

    resetCV();

    const state = store.getState();
    expect(state.personalData).toEqual(defaults.personalData);
    expect(state.profile).toEqual(defaults.profile);
    expect(state.experience).toEqual(defaults.experience);
    expect(state.education).toEqual(defaults.education);
    expect(state.certifications).toEqual(defaults.certifications);
    expect(state.skills).toEqual(defaults.skills);
    expect(state.projects).toEqual(defaults.projects);
    expect(state.languages).toEqual(defaults.languages);
  });
});
