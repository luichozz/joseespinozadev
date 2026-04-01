import './NavBar.css';
import { Button } from '@mui/material';
import Lottie from 'lottie-react';
import pixelCat from '../../assets/cat.json';
import { useIsSV } from '../../hooks/useIsSV';

function NavBar() {
  const isSV = useIsSV();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navBar${isSV ? ' is-sv' : ''}`}>
      {!isSV && (
        <div className="pixel-animal left">
          <Lottie animationData={pixelCat} loop={true} />
        </div>
      )}

      <div className="nav-links">
        <Button color="inherit" onClick={() => scrollToSection('about')}>
          About
        </Button>
        <Button color="inherit" onClick={() => scrollToSection('experience')}>
          Experience
        </Button>
        <Button color="inherit" onClick={() => scrollToSection('projects')}>
          Projects
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
