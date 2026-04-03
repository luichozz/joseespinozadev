import './NavBar.css';
import { Button } from '@mui/material';
import Lottie from 'lottie-react';
import pixelCat from '../../assets/cat.json';
import { useIsSV } from '../../hooks/useIsSV';
import { useActiveSection } from '../../hooks/useActiveSection';

const NAV_ITEMS = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
] as const;

function NavBar() {
  const isSV = useIsSV();
  const active = useActiveSection();

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
        {NAV_ITEMS.map(({ id, label }) => (
          <Button
            key={id}
            color="inherit"
            className={active === id ? 'nav-active' : ''}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </Button>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
