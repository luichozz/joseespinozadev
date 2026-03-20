import './App.css'
import NavBar from './navBar/navBar';
import IconBar from './iconBar/iconBar';
import CloudImage from './cloudImage/cloudImage';

function App() {
  const title = 'Hello!';
  const intro = `I am a Software Engineer with a passion for crafting exceptional user experiences and building innovative software solutions. 
  With expertise in mobile and front-end development, I have contributed to projects utilizing technologies such as React Native, TypeScript, JavaScript, 
  HTML/CSS, and SQL. My recent experience includes enhancing user experiences on various applications.`;

  const experiences = [
    {
      title: "Software Engineer - Loyalty Team",
      company: "Best Buy",
      period: "Current",
      technologies: ["React", "Redux", "GraphQL", "TypeScript", "JavaScript"],
      description: "Developing certificate issuance features and promotional banner systems. Working with Redux state management, form validation, and Platform Manager integration."
    },
    {
      title: "Front-End Developer",
      company: "Best Buy",
      period: "Previous Role",
      technologies: ["React Native", "TypeScript", "HTML/CSS", "SQL"],
      description: "Enhanced user experiences on various applications with focus on mobile and front-end development."
    },
    {
      title: "Software Developer",
      company: "Previous Company",
      period: "2020-2022",
      technologies: ["JavaScript", "Node.js", "React", "APIs"],
      description: "Built robust UI components and managed data integration through APIs."
    }
  ];


  return (
   <div className="app-container">
    <NavBar />
    <IconBar />
   <section id="about" className="section about-section">
      <div className="section-content">
        <h1 className="title">{title}</h1>

         <CloudImage 
          publicId="v1763586054/1762404781545_oit0pc.jpg"
          alt="BBYTech"
          width={200}
          height={200}
          className="profile-image"
        />
        <p className="intro-text fade-in-up-delay">{intro}</p>
      <p className="intro-text">{intro}</p>
      </div>
    </section>
 <section id="experience" className="section experience-section">
      <div className="section-content">
        <h2 className="section-title">Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="card-header">
                <h3 className="job-title">{exp.title}</h3>
                <span className="company">{exp.company}</span>
                <span className="period">{exp.period}</span>
              </div>
              <p className="job-description">{exp.description}</p>
              <div className="tech-stack">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Projects Section - Placeholder */}
    <section id="projects" className="section projects-section">
      <div className="section-content">
        <h2 className="section-title">Projects</h2>
        <p>Coming soon...</p>
      </div>
    </section>
   </div>
  );
}

export default App