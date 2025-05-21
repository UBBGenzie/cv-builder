'use client';
import useCVStore from '../store/cvStore';

export default function CVPreview() {
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
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '0.25rem' }}>
        {personalData.firstName} {personalData.lastName}
      </h1>
      <p style={{ margin: 0 }}>
        {personalData.phone} | {personalData.email}
      </p>
      {personalData.portfolio && (
        <p>
          <a href={personalData.portfolio}>{personalData.portfolio}</a>
        </p>
      )}

      <hr style={{ margin: '1.5rem 0' }} />

      {/* Profiles */}
      {(profile.github || profile.linkedin || profile.website) && (
        <>
          <h3>Profiles</h3>
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
                Website: <a href={profile.website}>{profile.website}</a>
              </li>
            )}
          </ul>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <h3>Experience</h3>
          {experience.map((item, i) => (
            <div key={i}>
              <strong>{item.position}</strong> @ {item.company} (
              {item.dateRange})<br />
              <small>{item.location}</small>
              <br />
              {item.link && <a href={item.link}>{item.link}</a>}
              <p>{item.description}</p>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <h3>Education</h3>
          {education.map((edu, i) => (
            <div key={i}>
              <strong>{edu.degree}</strong> – {edu.field} ({edu.dateRange})
              <br />
              {edu.school} ({edu.mode})
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <h3>Projects</h3>
          {projects.map((proj, i) => (
            <div key={i}>
              <strong>{proj.name}</strong> ({proj.date})<br />
              {proj.description}
              <br />
              <em>{proj.techStack}</em>
              <br />
              {proj.link && <a href={proj.link}>{proj.link}</a>}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <h3>Skills</h3>
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
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <h3>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i}>
              <strong>{cert.title}</strong> – {cert.issuer} ({cert.date})<br />
              {cert.link && <a href={cert.link}>{cert.link}</a>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
