import type { AboutData } from '@portfolio/lib';
import CloudImage from '../CloudImage/CloudImage';
import { useIsSV } from '../../hooks/useIsSV';

interface AboutSectionProps {
  about: AboutData;
}

function AboutSection({ about }: AboutSectionProps) {
  const isSV = useIsSV();

  return (
    <section id="about" className={`section about-section${isSV ? ' is-sv' : ''}`}>
      <div className="section-content">
        <h1 className="title">{about.title}</h1>
        <CloudImage
          publicId={about.profileImageId}
          alt="Profile"
          width={isSV ? 150 : 200}
          height={isSV ? 150 : 200}
          className="profile-image"
        />
        <p className="intro-text">{about.intro}</p>
      </div>
    </section>
  );
}

export default AboutSection;
