'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  imageUrl?: string;
}

export default function ShareModal({ isOpen, onClose, title, url, imageUrl }: ShareModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // 确保组件只在客户端渲染
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 使用传入的 URL，如果为空则获取当前 URL
  const getCurrentUrl = () => {
    if (url) return url;
    return typeof window !== 'undefined' ? window.location.href : '';
  };

  // 复制链接到剪贴板
  const copyToClipboard = async () => {
    try {
      const currentUrl = getCurrentUrl();
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // 分享到各个社交媒体平台
  const shareToTwitter = () => {
    const currentUrl = getCurrentUrl();
    const params = new URLSearchParams({
      text: title,
      url: currentUrl,
      ...(imageUrl && { image: imageUrl })
    });
    window.open(`https://twitter.com/intent/tweet?${params.toString()}`, '_blank');
  };

  const shareToFacebook = () => {
    // Facebook doesn't support image parameter in URL, it uses Open Graph meta tags
    const currentUrl = getCurrentUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    // LinkedIn doesn't support image parameter in URL, it uses Open Graph meta tags
    const currentUrl = getCurrentUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    const currentUrl = getCurrentUrl();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + currentUrl)}`, '_blank');
  };

  const shareToReddit = () => {
    const currentUrl = getCurrentUrl();
    window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  const shareToTelegram = () => {
    const currentUrl = getCurrentUrl();
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  // 如果组件未挂载或模态框未打开，则不渲染
  if (!mounted || !isOpen) return null;

  // 使用 Portal 将模态框渲染到 body 的末尾，避免 z-index 问题
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="relative bg-black/90 border border-white/20 rounded-xl w-full max-w-md p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* 标题 */}
        <h3 className="text-xl font-bold text-white mb-4">Share</h3>

        {/* 显示将要分享的图片预览 */}
        {imageUrl && (
          <div className="mb-4 relative aspect-video w-full overflow-hidden rounded-lg border border-white/20">
            <Image
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              width={640}
              height={360}
              priority
            />
          </div>
        )}

        {/* 社交媒体分享按钮 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={shareToTwitter}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/50 hover:bg-blue-500/20 transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="text-xs mt-2 text-white/90">Twitter</span>
          </button>

          <button
            onClick={shareToFacebook}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/50 hover:bg-blue-700/20 transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span className="text-xs mt-2 text-white/90">Facebook</span>
          </button>

          <button
            onClick={shareToLinkedIn}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/50 hover:bg-blue-800/20 transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="text-xs mt-2 text-white/90">LinkedIn</span>
          </button>

          <button
            onClick={shareToWhatsApp}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/50 hover:bg-green-500/20 transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span className="text-xs mt-2 text-white/90">WhatsApp</span>
          </button>

          <button
            onClick={shareToReddit}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/50 hover:bg-orange-600/20 transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>
              <path d="M15.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>
              <path d="M9 16c.5-1 2-2 3-2s2.5 1 3 2"></path>
            </svg>
            <span className="text-xs mt-2 text-white/90">Reddit</span>
          </button>

          <button
            onClick={shareToTelegram}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/50 hover:bg-blue-400/20 transition-colors border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.846 1.467 1.618 2.92 2.286 4.347.613.853 1.8 1.282 2.833.9l.272-.144c.754-.397 1.32-.896 1.675-1.543 3.493-6.337 7.197-12.611 8.024-14.041.462-.903.356-1.458-.127-2.123a1.908 1.908 0 0 0-1.487-.537z"></path>
            </svg>
            <span className="text-xs mt-2 text-white/90">Telegram</span>
          </button>
        </div>

        {/* 复制链接 */}
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="text"
              value={getCurrentUrl()}
              readOnly
              className="flex-1 bg-black/50 border border-white/20 rounded-l-md px-3 py-2 text-white text-sm focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors"
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
