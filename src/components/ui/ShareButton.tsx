'use client';

import React, { useState } from 'react';
import ShareModal from './ShareModal';

interface ShareButtonProps {
  title: string;
  className?: string;
  buttonText?: string | React.ReactNode;
  showIcon?: boolean;
  iconOnly?: boolean;
  imageUrl?: string;
}

export default function ShareButton({
  title,
  className = '',
  buttonText = 'SHARE',
  showIcon = true,
  iconOnly = false,
  imageUrl
}: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 获取当前页面的 URL
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center justify-center transition-all duration-300 ${className}`}
        aria-label="Share"
      >
        {showIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconOnly ? '' : 'mr-1 md:mr-2'}
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        )}
        {!iconOnly && buttonText}
      </button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        url={getShareUrl()}
        imageUrl={imageUrl}
      />
    </>
  );
}
