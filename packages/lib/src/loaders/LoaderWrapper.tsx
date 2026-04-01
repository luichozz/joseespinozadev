import { useState, useEffect, type ReactNode } from 'react';
import { fetchAbout, fetchExperiences } from '../sanity/queries';
import type { AboutData, Experience } from '../types';

export interface LoaderData {
  about: AboutData;
  experiences: Experience[];
}

interface LoaderWrapperProps {
  children: (data: LoaderData) => ReactNode;
  fallback?: ReactNode;
}

function LoaderWrapper({ children, fallback = null }: LoaderWrapperProps) {
  const [data, setData] = useState<LoaderData | null>(null);

  useEffect(() => {
    Promise.all([fetchAbout(), fetchExperiences()])
      .then(([about, experiences]) => {
        if (about) setData({ about, experiences });
      })
      .catch((err) => console.error('[LoaderWrapper] Sanity fetch failed:', err));
  }, []);

  if (!data) return <>{fallback}</>;

  return <>{children(data)}</>;
}

export default LoaderWrapper;
