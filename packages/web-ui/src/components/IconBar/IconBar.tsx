import './IconBar.css';
import { LinkedIn, EmailRounded } from '@mui/icons-material';

function IconBar() {
  return (
    <div className="iconBar">
      <LinkedIn className="icon" />
      <EmailRounded className="icon" />
    </div>
  );
}

export default IconBar;
