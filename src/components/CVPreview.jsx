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
    languages,
    certifications,
  } = useCVStore();

  return (
    <div id="cv-preview" style={{ fontFamily: 'sans-serif' }}>
      {/* NAGŁÓWEK – zdjęcie i dane */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        {personalData.picture && (
          <img
            src={personalData.picture}
            alt="Zdjęcie profilowe"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}
        <div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>
            {personalData.fullName}
          </h1>
          {personalData.headline && (
            <p style={{ fontStyle: 'italic', margin: '0.25rem 0' }}>
              {personalData.headline}
            </p>
          )}
          <p style={{ margin: 0 }}>
            {[
              personalData.phone,
              personalData.email,
              personalData.portfolio && (
                <a key="portfolio" href={personalData.portfolio}>
                  {personalData.portfolio}
                </a>
              ),
            ]
              .filter(Boolean)
              .reduce((acc, item, index, arr) => {
                acc.push(item);
                if (index < arr.length - 1) acc.push(' | ');
                return acc;
              }, [])}
          </p>
        </div>
      </div>

      {personalData.summary && (
        <p style={{ marginBottom: '2rem' }}>{personalData.summary}</p>
      )}

      <hr style={{ margin: '1.5rem 0' }} />

      {/* Profiles */}
      {Object.entries(profile).filter(([_, url]) => url?.trim()).length > 0 && (
        <>
          <h3>Profiles</h3>
          <ul>
            {Object.entries(profile)
              .filter(([_, url]) => url?.trim() !== '')
              .map(([network, url], i) => (
                <li key={i}>
                  <strong>{network}</strong>: <a href={url}>{url}</a>
                </li>
              ))}
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
              {edu.school} ({edu.mode})<br />
              {edu.summary && <p>{edu.summary}</p>}
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
              <br />
              {proj.summary && <p>{proj.summary}</p>}
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
                  textAlign: 'center',
                }}
              >
                <strong>{s.name}</strong>
                <br />
                {s.description}
                <br />
                {renderLevelDots(s.level)}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <h3>Languages</h3>
          <ul>
            {languages.map((lang, i) => (
              <li key={i}>
                <strong>{lang.name}</strong> {lang.description}
                <br />
                {renderLevelDots(lang.level)}
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
              <br />
              {cert.description && <p>{cert.description}</p>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function renderLevelDots(level) {
  const total = 5;
  return Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        display: 'inline-block',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        marginRight: '4px',
        backgroundColor: i < level ? '#333' : '#ccc',
      }}
    />
  ));
}
