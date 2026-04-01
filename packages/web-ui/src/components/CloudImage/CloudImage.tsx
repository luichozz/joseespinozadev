const CLOUD_NAME = 'dfgv8agef';

interface CloudImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

function buildUrl(publicId: string, width?: number, height?: number) {
  // Request at 3x the display size to cover high-DPI screens (retina, OLED, etc.)
  // q_auto:best = highest quality, f_auto = WebP/AVIF for supporting browsers
  const dpr = 3;
  let transforms = 'q_auto:best,f_auto';

  if (width && height) {
    transforms += `,w_${width * dpr},h_${height * dpr},c_fill,g_face`;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

function CloudImage({ publicId, alt, width, height, className }: CloudImageProps) {
  return (
    <img
      src={buildUrl(publicId, width, height)}
      alt={alt}
      className={className}
      style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
    />
  );
}

export default CloudImage;
