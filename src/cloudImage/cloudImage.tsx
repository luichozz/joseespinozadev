interface CloudImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

function CloudImage({ publicId, alt, width, height, className }: CloudImageProps) {  
  const cloudName = 'dfgv8agef'; // Your cloud name
  
  // Build Cloudinary URL with optional transformations
  let imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  
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