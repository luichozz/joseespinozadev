const CLOUD_NAME = 'dfgv8agef';

interface CloudImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

function CloudImage({ publicId, alt, width, height, className }: CloudImageProps) {
  let imageUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

  if (width && height) {
    imageUrl += `w_${width},h_${height},c_fill/`;
  }

  imageUrl += publicId;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
    />
  );
}

export default CloudImage;
