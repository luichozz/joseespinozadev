import './IconBar.css';
import { LinkedIn, EmailRounded } from '@mui/icons-material';
import { useIsSV } from '../../hooks/useIsSV';

interface IconBarProps {
  linkedInUrl?: string;
  email?: string;
}

function IconBar({ linkedInUrl, email }: IconBarProps) {
  const isSV = useIsSV();

  if (isSV) return null;

  return (
    <div className="iconBar">
      {linkedInUrl ? (
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedIn className="icon" />
        </a>
      ) : (
        <LinkedIn className="icon" />
      )}
      {email ? (
        <a href={`mailto:${email}`} aria-label="Email">
          <EmailRounded className="icon" />
        </a>
      ) : (
        <EmailRounded className="icon" />
      )}
    </div>
  );
}

export default IconBar;
