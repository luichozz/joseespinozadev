import type { Experience } from '@portfolio/lib';
import ExperienceCard from '../ExperienceCard/ExperienceCard';
import { useIsSV } from '../../hooks/useIsSV';
import { useInView } from '../../hooks/useInView';

interface ExperienceSectionProps {
  experiences: Experience[];
}

function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const isSV = useIsSV();
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="experience"
      className={`section experience-section${isSV ? ' is-sv' : ''}${inView ? ' in-view' : ''}`}
    >
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
