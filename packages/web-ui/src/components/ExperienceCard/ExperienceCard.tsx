import type { Experience } from '@portfolio/lib';

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="experience-card">
      <div className="card-header">
        <h3 className="job-title">{experience.title}</h3>
        <span className="company">{experience.company}</span>
        <span className="period">{experience.period}</span>
      </div>
      <p className="job-description">{experience.description}</p>
      <div className="tech-stack">
        {experience.technologies.map((tech, idx) => (
          <span key={idx} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExperienceCard;
