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
  customUrl?: string; // 添加自定义URL属性
}

export default function ShareButton({
  title,
  className = '',
  buttonText = 'SHARE',
  showIcon = true,
  iconOnly = false,
  imageUrl,
  customUrl
}: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // 打开模态框并获取 URL
  const handleOpenModal = () => {
    if (customUrl) {
      // 如果提供了自定义URL，使用它
      setCurrentUrl(customUrl);
    } else if (typeof window !== 'undefined') {
      // 否则获取当前页面的URL
      setCurrentUrl(window.location.href);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
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
        url={currentUrl}
        imageUrl={imageUrl}
      />
    </>
  );
}
