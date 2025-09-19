'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from './LoadingSkeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <Skeleton
          width={width}
          height={height}
          className="absolute inset-0 z-10"
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL || `data:image/svg+xml;base64,${Buffer.from(
            `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f3f4f6"/>
            </svg>`
          ).toString('base64')}`}
          onLoad={handleLoad}
          onError={handleError}
          className="transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </div>
  );
}

// Pre-configured image components for common use cases
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={600}
      height={400}
      priority={true}
      quality={85}
      className="rounded-lg shadow-xl"
    />
  );
}

export function DashboardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={500}
      quality={80}
      className="rounded-lg border border-gray-200 dark:border-gray-700"
    />
  );
}

export function ThumbnailImage({ src, alt }: { src: string; alt: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={300}
      height={200}
      quality={70}
      className="rounded-md"
    />
  );
}
