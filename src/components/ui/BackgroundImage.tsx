'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function BackgroundImage() {
  const pathname = usePathname();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // 检查图片是否已经加载
    const img = document.createElement('img');
    img.src = '/bg-body.png';

    // 如果图片已经在缓存中，这会立即触发
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => {
        setImageLoaded(true);
      };
    }

    // 设置背景属性 - 这些会覆盖CSS中的默认值，但只有在组件挂载后
    if (imageLoaded) {
      document.body.style.backgroundImage = `url('/bg-body.png')`;
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = 'auto';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [pathname, imageLoaded]);

  return null;
}
