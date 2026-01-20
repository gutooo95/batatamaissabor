import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallback?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallback,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Tenta carregar WebP primeiro, depois fallback para formato original
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    
    // Se WebP falhou, tenta o formato original
    if (target.src.includes('.webp') && !hasError) {
      setImageSrc(src);
      setHasError(true);
      return;
    }
    
    // Se formato original também falhou, usa fallback
    if (fallback) {
      target.src = fallback;
    }
    
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={hasError ? src : webpSrc}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={handleError}
    />
  );
};

export default OptimizedImage;
