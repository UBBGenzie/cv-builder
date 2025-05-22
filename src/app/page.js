'use client';

import { useState, useRef } from 'react';
import PersonalDataForm from '../components/PersonalDataForm';
import CVPreview from '../components/CVPreview';
import ExperiencePopup from '../components/ExperiencePopup';
import ExperienceList from '../components/ExperienceList';
import EducationPopup from '../components/EducationPopup';
import EducationList from '../components/EducationList';
import ProfilePopup from '../components/ProfilePopup';
import ProfilesList from '../components/ProfilesList';
import ProjectsPopup from '../components/ProjectsPopup';
import ProjectsList from '../components/ProjectsList';
import SkillsPopup from '../components/SkillsPopup';
import SkillsList from '../components/SkillsList';
import LanguagesPopup from '../components/LanguagesPopup';
import LanguagesList from '../components/LanguagesList';
import CertificationPopup from '../components/CertificationPopup';
import CertificationsList from '../components/CertificationsList';
import dynamic from 'next/dynamic';
import ResetCVButton from '../components/ResetCVButton';
import Section from '../components/Section';
import {
  User,
  Briefcase,
  Book,
  Code,
  Languages,
  Award,
  Globe,
  Brain,
  Maximize2,
  Minimize2,
} from 'lucide-react';

const PdfDownloadButton = dynamic(
  () => import('../components/PdfDownloadButton'),
  {
    ssr: false,
  }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('form');
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  const toggleFullscreen = () => {
    setFullscreenPreview((prev) => !prev);
    setActiveTab('preview');
  };

  const experiencePopupRef = useRef();
  const educationPopupRef = useRef();
  const projectsPopupRef = useRef();
  const skillsPopupRef = useRef();
  const languagesPopupRef = useRef();
  const certificationPopupRef = useRef();
  const profilePopupRef = useRef();

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'IBM Plex Sans, sans-serif',
        backgroundColor: '#09090b',
        color: '#FAFAFA',
      }}
    >
      {/* Topbar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#09090b',
          padding: '1rem 2rem',
          borderBottom: '1px solid #222',
        }}
      >
        <h1 style={{ fontSize: '20px', margin: 0 }}>CV Builder</h1>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <ResetCVButton />
          <PdfDownloadButton />
          <button
            onClick={toggleFullscreen}
            title="Przełącz tryb pełnoekranowy"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FAFAFA',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            {fullscreenPreview ? (
              <Minimize2 size={20} />
            ) : (
              <Maximize2 size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Toggle buttons (mobile only) */}
      <div className="cv-toggle-buttons">
        <button
          onClick={() => setActiveTab('form')}
          className={activeTab === 'form' ? 'active' : ''}
        >
          Formularz
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={activeTab === 'preview' ? 'active' : ''}
        >
          Podgląd
        </button>
      </div>

      {/* Layout */}
      <div className={`cv-layout ${fullscreenPreview ? 'fullscreen' : ''}`}>
        <div className={`cv-left ${activeTab === 'form' ? 'show' : ''}`}>
          <Section title="Dane osobowe" icon={User}>
            <PersonalDataForm />
          </Section>
          <Section title="Profile" icon={Globe}>
            <ProfilePopup ref={profilePopupRef} />
            <ProfilesList popupRef={profilePopupRef} />
          </Section>
          <Section title="Doświadczenie" icon={Briefcase}>
            <ExperiencePopup ref={experiencePopupRef} />
            <ExperienceList popupRef={experiencePopupRef} />
          </Section>
          <Section title="Edukacja" icon={Book}>
            <EducationPopup ref={educationPopupRef} />
            <EducationList popupRef={educationPopupRef} />
          </Section>
          <Section title="Projekty" icon={Code}>
            <ProjectsPopup ref={projectsPopupRef} />
            <ProjectsList popupRef={projectsPopupRef} />
          </Section>
          <Section title="Umiejętności" icon={Brain}>
            <SkillsPopup ref={skillsPopupRef} />
            <SkillsList popupRef={skillsPopupRef} />
          </Section>
          <Section title="Języki" icon={Languages}>
            <LanguagesPopup ref={languagesPopupRef} />
            <LanguagesList popupRef={languagesPopupRef} />
          </Section>
          <Section title="Certyfikaty" icon={Award}>
            <CertificationPopup ref={certificationPopupRef} />
            <CertificationsList popupRef={certificationPopupRef} />
          </Section>
        </div>

        <div className={`cv-right ${activeTab === 'preview' ? 'show' : ''}`}>
          <div className="cv-preview-wrapper">
            <CVPreview />
          </div>
        </div>
      </div>
    </main>
  );
}
