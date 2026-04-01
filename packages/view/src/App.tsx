import './App.css';
import { LoaderWrapper } from '@portfolio/lib';
import { NavBar, IconBar, AboutSection, ExperienceSection, ProjectsSection, PageSkeleton } from '@portfolio/web-ui';

function App() {
  return (
    <LoaderWrapper fallback={<PageSkeleton />}>
      {({ about, experiences }) => (
        <div className="app-container">
          <NavBar />
          <IconBar />
          <AboutSection about={about} />
          <ExperienceSection experiences={experiences} />
          <ProjectsSection />
        </div>
      )}
    </LoaderWrapper>
  );
}

export default App;
