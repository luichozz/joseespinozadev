import { useIsSV } from '../../hooks/useIsSV';

function ProjectsSection() {
  const isSV = useIsSV();

  return (
    <section id="projects" className={`section projects-section${isSV ? ' is-sv' : ''}`}>
      <div className="section-content">
        <h2 className="section-title">Projects</h2>
        <p>Coming soon...</p>
      </div>
    </section>
  );
}

export default ProjectsSection;
