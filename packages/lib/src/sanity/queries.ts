import { sanityClient } from './client';
import type { AboutData, Experience } from '../types';

export async function fetchAbout(): Promise<AboutData | null> {
  return sanityClient.fetch<AboutData | null>(
    `*[_type == "about"][0] { title, intro, profileImageId }`
  );
}

export async function fetchExperiences(): Promise<Experience[]> {
  return sanityClient.fetch<Experience[]>(
    `*[_type == "experience"] | order(order asc) { title, company, period, technologies, description }`
  );
}
