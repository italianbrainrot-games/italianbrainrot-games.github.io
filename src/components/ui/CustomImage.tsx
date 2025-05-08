'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function CustomImage({ src, fallbackSrc, ...props }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    // 重置状态，以便在props变化时重新尝试
    setImgSrc(src);
    setImgError(false);
  }, [src]);

  const handleError = () => {
    if (!imgError && fallbackSrc) {
      // 如果有提供fallbackSrc并且还没有尝试过，则使用fallbackSrc
      setImgSrc(fallbackSrc);
      setImgError(true);
    } else if (!imgError && src.startsWith('/')) {
      // 尝试不带前导斜杠的路径
      setImgSrc(src.substring(1));
      setImgError(true);
    } else if (imgError && src.startsWith('/')) {
      // 如果已经尝试过一次，并且原始src以/开头，尝试相对路径
      const relativeSrc = src.substring(1); // 移除前导斜杠
      console.warn(`Failed to load image from ${src} and ${imgSrc}, trying ${relativeSrc}`);
      setImgSrc(relativeSrc);
    } else {
      console.error(`Failed to load image from all attempted paths: ${src}, ${imgSrc}`);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={handleError}
    />
  );
}
