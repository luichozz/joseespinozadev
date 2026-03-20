import './navBar.css'
import { Button } from '@mui/material'
import Lottie from 'lottie-react'
import pixelCat from '../assets/cat.json'

function NavBar() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navBar">
            <div className="pixel-animal left">
                <Lottie animationData={pixelCat} loop={true} />
            </div>
            
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

export default NavBar