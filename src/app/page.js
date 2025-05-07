import PersonalDataForm from '../components/PersonalDataForm';
import ProfileForm from '../components/ProfileForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import CertificationForm from '../components/CertificationForm';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>Dane osobowe</h1>
      <PersonalDataForm />
      <h2 style={{ fontSize: '20px', margin: '2rem 0 1rem' }}>Profile</h2>
      <ProfileForm />
      <h2 style={{ fontSize: '20px', margin: '2rem 0 1rem' }}>Doświadczenie</h2>
      <ExperienceForm />
      <h2 style={{ fontSize: '20px', margin: '2rem 0 1rem' }}>Edukacja</h2>
      <EducationForm />
      <h2 style={{ fontSize: '20px', margin: '2rem 0 1rem' }}>Projekty</h2>
      <ProjectsForm />
      <h2 style={{ fontSize: '20px', margin: '2rem 0 1rem' }}>Umiejętności</h2>
      <SkillsForm />
      <h2 style={{ fontSize: '20px', margin: '2rem 0 1rem' }}>Certyfikaty</h2>
      <CertificationForm />
    </main>
  );
}
