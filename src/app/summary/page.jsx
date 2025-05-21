'use client';
import useCVStore from '../../store/cvStore';

export default function SummaryPage() {
  const {
    personalData,
    profile,
    experience,
    education,
    projects,
    skills,
    certifications,
  } = useCVStore();

  return (
    <main
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '32px' }}>
        {personalData.firstName} {personalData.lastName}
      </h1>
      <p>
        {personalData.location} | {personalData.phone} | {personalData.email}
      </p>
      {personalData.portfolio && (
        <p>
          <a href={personalData.portfolio}>{personalData.portfolio}</a>
        </p>
      )}

      <hr style={{ margin: '1.5rem 0' }} />

      <h2>Profile</h2>
      <ul>
        {profile.github && (
          <li>
            GitHub: <a href={profile.github}>{profile.github}</a>
          </li>
        )}
        {profile.linkedin && (
          <li>
            LinkedIn: <a href={profile.linkedin}>{profile.linkedin}</a>
          </li>
        )}
        {profile.website && (
          <li>
            Strona: <a href={profile.website}>{profile.website}</a>
          </li>
        )}
      </ul>

      <h2>Doświadczenie</h2>
      {experience.map((item, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>{item.position}</strong> w <em>{item.company}</em> (
          {item.dateRange})<br />
          <small>{item.location}</small>
          <br />
          {item.link && <a href={item.link}>{item.link}</a>}
          <p>{item.description}</p>
        </div>
      ))}

      <h2>Edukacja</h2>
      {education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>{edu.degree}</strong> – {edu.field} ({edu.dateRange})<br />
          {edu.school} ({edu.mode})
        </div>
      ))}

      <h2>Projekty</h2>
      {projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>{proj.name}</strong> ({proj.date})<br />
          {proj.description}
          <br />
          <em>{proj.techStack}</em>
          <br />
          {proj.link && <a href={proj.link}>{proj.link}</a>}
        </div>
      ))}

      <h2>Umiejętności</h2>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {skills.map((s, i) => (
          <li
            key={i}
            style={{
              background: '#eee',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
            }}
          >
            {s}
          </li>
        ))}
      </ul>

      <h2>Certyfikaty</h2>
      {certifications.map((cert, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>{cert.title}</strong> – {cert.issuer} ({cert.date})<br />
          {cert.link && <a href={cert.link}>{cert.link}</a>}
        </div>
      ))}
    </main>
  );
}
