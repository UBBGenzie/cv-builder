'use client';

import PersonalDataForm from '../components/PersonalDataForm';
import CVPreview from '../components/CVPreview';
import ExperiencePopup from '../components/ExperiencePopup';
import EducationPopup from '../components/EducationPopup';
import ProfilePopup from '../components/ProfilePopup';
import ProjectsPopup from '../components/ProjectsPopup';
import SkillsPopup from '../components/SkillsPopup';
import LanguagesPopup from '../components/LanguagesPopup';
import CertificationPopup from '../components/CertificationPopup';
import dynamic from 'next/dynamic';
import ResetCVButton from '../components/ResetCVButton';

// PDF export – ładowany tylko po stronie klienta
const PdfDownloadButton = dynamic(
  () => import('../components/PdfDownloadButton'),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main style={{ display: 'flex', height: '100vh' }}>
      {/* Lewy panel – formularze */}
      <div
        style={{
          width: '40%',
          overflowY: 'scroll',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
        }}
      >
        <ResetCVButton />
        <h2>Dane osobowe</h2>
        <PersonalDataForm />
        <h2>Profile</h2>
        <ProfilePopup />
        <h2>Doświadczenie</h2>
        <ExperiencePopup />
        <h2>Edukacja</h2>
        <EducationPopup />
        <h2>Projekty</h2>
        <ProjectsPopup />
        <h2>Umiejętności</h2>
        <SkillsPopup />
        <h2>Języki</h2>
        <LanguagesPopup />
        <h2>Certyfikaty</h2>
        <CertificationPopup />
      </div>

      {/* Prawy panel – podgląd */}
      <div
        style={{
          width: '60%',
          padding: '2rem',
          overflowY: 'scroll',
          backgroundColor: '#fff',
        }}
      >
        <CVPreview />
        <h2>Podgląd CV</h2>
        <PdfDownloadButton />
      </div>
    </main>
  );
}
