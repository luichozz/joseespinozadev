import type { ReactNode } from 'react';
import { aboutData } from '../data/about';
import { experienceData } from '../data/experience';
import type { AboutData, Experience } from '../types';

export interface LoaderData {
  about: AboutData;
  experiences: Experience[];
}

interface LoaderWrapperProps {
  children: (data: LoaderData) => ReactNode;
}

function LoaderWrapper({ children }: LoaderWrapperProps) {
  const data: LoaderData = {
    about: aboutData,
    experiences: experienceData,
  };

  return <>{children(data)}</>;
}

export default LoaderWrapper;
