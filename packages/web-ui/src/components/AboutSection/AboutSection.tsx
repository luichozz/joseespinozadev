import type { AboutData } from '@portfolio/lib';
import CloudImage from '../CloudImage/CloudImage';

interface AboutSectionProps {
  about: AboutData;
}

function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="section about-section">
      <div className="section-content">
        <h1 className="title">{about.title}</h1>
        <CloudImage
          publicId={about.profileImageId}
          alt="Profile"
          width={200}
          height={200}
          className="profile-image"
        />
        <p className="intro-text">{about.intro}</p>
      </div>
    </section>
  );
}

export default AboutSection;
