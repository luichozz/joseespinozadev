import { useIsSV } from '../../hooks/useIsSV';
import { useInView } from '../../hooks/useInView';

function ProjectsSection() {
  const isSV = useIsSV();
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="projects"
      className={`section projects-section${isSV ? ' is-sv' : ''}${inView ? ' in-view' : ''}`}
    >
      <div className="section-content">
        <h2 className="section-title">Projects</h2>
        <p>Coming soon...</p>
      </div>
    </section>
  );
}

export default ProjectsSection;
