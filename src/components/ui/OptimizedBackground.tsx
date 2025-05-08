'use client';

import { useEffect, useState } from 'react';

export default function OptimizedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="absolute inset-0 bg-black"
        style={{ 
          backgroundImage: 'url(/bg-body.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundAttachment: 'fixed',
          opacity: 1,
        }}
      />
    </div>
  );
}
