'use client';
import useCVStore from '../store/cvStore';

const sectionHeadingStyle = {
  fontSize: '18px',
  marginBottom: '0.25rem',
  borderBottom: '2px solid red',
  paddingBottom: '0.25rem',
};

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
    <div
      id="cv-preview"
      style={{
        fontFamily: 'sans-serif',
        color: '#000',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
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

      {/* <hr style={{ margin: '1.5rem 0' }} /> */}

      {/* DWIE KOLUMNY */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '2rem',
        }}
      >
        {/* Lewa kolumna – główna treść */}
        <div style={{ flex: 3 }}>
          {experience.length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Doświadczenie</h3>
              {experience.map((item, i) => (
                <div
                  key={i}
                  style={{
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                    marginBottom: '1rem',
                  }}
                >
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

          {education.length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Edukacja</h3>
              {education.map((edu, i) => (
                <div
                  key={i}
                  style={{
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                    marginBottom: '1rem',
                  }}
                >
                  <strong>{edu.degree}</strong> – {edu.field} ({edu.dateRange})
                  <br />
                  {edu.school} ({edu.mode})<br />
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </>
          )}

          {projects.length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Projekty</h3>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  style={{
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                    marginBottom: '1rem',
                  }}
                >
                  <strong>{proj.name}</strong> ({proj.dateRange})<br />
                  {proj.description}
                  <br />
                  {proj.link && <a href={proj.link}>{proj.link}</a>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Prawa kolumna – boczne informacje */}
        <div style={{ flex: 1 }}>
          {Object.entries(profile).filter(
            ([_, value]) =>
              typeof value?.url === 'string' && value.url.trim() !== ''
          ).length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Profile</h3>
              <ul>
                {Object.entries(profile)
                  .filter(
                    ([_, value]) =>
                      typeof value?.url === 'string' && value.url.trim() !== ''
                  )
                  .map(([network, value], i) => (
                    <li key={i}>
                      <strong>{network}</strong>:{' '}
                      <a href={value.url}>{value.url}</a>
                    </li>
                  ))}
              </ul>
            </>
          )}

          {skills.length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Umiejętności</h3>
              <ul>
                {skills.map((s, i) => (
                  <li key={i}>
                    <strong>{s.name}</strong>
                    <br />
                    {renderLevelDots(s.level)}
                  </li>
                ))}
              </ul>
            </>
          )}

          {languages.length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Języki</h3>
              <ul>
                {languages.map((lang, i) => (
                  <li key={i}>
                    <strong>{lang.name}</strong>
                    <br />
                    {renderLevelDots(lang.level)}
                  </li>
                ))}
              </ul>
            </>
          )}

          {certifications.length > 0 && (
            <>
              <h3 style={sectionHeadingStyle}>Certyfikaty</h3>
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                    marginBottom: '1rem',
                  }}
                >
                  <strong>{cert.title}</strong> – {cert.issuer} ({cert.date})
                  <br />
                  {cert.link && (
                    <>
                      <a href={cert.link}>{cert.link}</a>
                      <br />
                    </>
                  )}
                  <br />
                  {cert.description && <p>{cert.description}</p>}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
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
        backgroundColor: i < level ? 'red' : '#fff',
        border: '1px solid red',
      }}
    />
  ));
}
