import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { backGround, primary, secondary, accent } from './assets/colors.ts';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

document.documentElement.style.setProperty('--background', backGround);
document.documentElement.style.setProperty('--primary', primary);
document.documentElement.style.setProperty('--secondary', secondary);
document.documentElement.style.setProperty('--accent', accent);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
