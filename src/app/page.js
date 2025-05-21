'use client';
import PersonalDataForm from '../components/PersonalDataForm';
import ProfileForm from '../components/ProfileForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import CertificationForm from '../components/CertificationForm';
import CVPreview from '../components/CVPreview';

export default function Home() {
  return (
    <main style={{ display: 'flex', height: '100vh' }}>
      {
        /* Lewy panel – formularze /}*/
        <div
          style={{
            width: '40%',
            overflowY: 'scroll',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h2>Dane osobowe</h2>
          <PersonalDataForm />
          <h2>Profile</h2>
          <ProfileForm />
          <h2>Doświadczenie</h2>
          <ExperienceForm />
          <h2>Edukacja</h2>
          <EducationForm />
          <h2>Projekty</h2>
          <ProjectsForm />
          <h2>Umiejętności</h2>
          <SkillsForm />
          <h2>Certyfikaty</h2>
          <CertificationForm />
        </div>

        /* {/ Prawy panel – podgląd */
      }
      <div
        style={{
          width: '60%',
          padding: '2rem',
          overflowY: 'scroll',
          backgroundColor: '#fff',
        }}
      >
        <CVPreview />
      </div>
    </main>
  );
}
