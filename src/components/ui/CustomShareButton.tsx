'use client';

import React, { useState, useEffect } from 'react';
import ShareButton from './ShareButton';


interface CustomShareButtonProps {
  title: string;
  slug: string;
  type: 'game' | 'blog';
  className?: string;
  buttonText?: string | React.ReactNode;
  showIcon?: boolean;
  iconOnly?: boolean;
  imageUrl?: string;
}

export default function CustomShareButton({
  title,
  slug,
  type,
  className = '',
  buttonText = 'SHARE',
  showIcon = true,
  iconOnly = false,
  imageUrl
}: CustomShareButtonProps) {
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      const path = type === 'game' ? `/games/${slug}` : `/blog/${slug}`;
      setFullUrl(`${baseUrl}${path}`);
    }
  }, [slug, type]);

  return (
    <ShareButton
      title={title}
      customUrl={fullUrl}
      className={className}
      buttonText={buttonText}
      showIcon={showIcon}
      iconOnly={iconOnly}
      imageUrl={imageUrl}
    />
  );
}
