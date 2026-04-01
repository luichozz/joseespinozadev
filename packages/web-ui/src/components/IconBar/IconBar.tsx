import './IconBar.css';
import { LinkedIn, EmailRounded } from '@mui/icons-material';
import { useIsSV } from '../../hooks/useIsSV';

function IconBar() {
  const isSV = useIsSV();

  if (isSV) return null;

  return (
    <div className="iconBar">
      <LinkedIn className="icon" />
      <EmailRounded className="icon" />
    </div>
  );
}

export default IconBar;
