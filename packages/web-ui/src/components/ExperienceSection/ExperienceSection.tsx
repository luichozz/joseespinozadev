import type { Experience } from '@portfolio/lib';
import ExperienceCard from '../ExperienceCard/ExperienceCard';

interface ExperienceSectionProps {
  experiences: Experience[];
}

function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section experience-section">
      <div className="section-content">
        <h2 className="section-title">Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
