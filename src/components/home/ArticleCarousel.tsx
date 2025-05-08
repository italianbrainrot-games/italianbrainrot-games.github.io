'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import blogData from '@/data/blog.json';
import CustomShareButton from '@/components/ui/CustomShareButton';

// 文章数据接口
interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  categories: string[];
}

export default function ArticleCarousel() {
  // 使用blog.json中的数据
  const articles: Article[] = blogData;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative bg-black/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/10" style={{
      aspectRatio: 'calc(var(--article-carousel-aspect-ratio, 1.8/1))',
      height: 'var(--article-carousel-height, auto)'
    }}>


      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {articles.map((article) => (
            <div key={article.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              <div className="block h-full">
                <div className="relative h-full rounded-lg overflow-hidden">
                  {/* 图片填满容器 */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-6">
                    <div className="flex gap-1 md:gap-2 mb-1 md:mb-2">
                      {article.categories.map((category) => (
                        <span key={category} className="text-[10px] md:text-xs bg-black/30 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blog/${article.slug}`}>
                      <h2 className="text-white text-2xl md:text-4xl font-bold mb-1 hover:text-orange-500 transition-colors line-clamp-2">{article.title}</h2>
                    </Link>
                    <h3 className="text-white text-sm md:text-xl font-bold mb-3">{article.date} • {article.author}</h3>
                    <p className="text-white/80 text-xs md:text-sm line-clamp-2">{article.excerpt}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 mt-4 md:mt-6">
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        <Link href={`/blog/${article.slug}`} className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md flex items-center text-xs md:text-base">
                          <ReadIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                          READ ARTICLE
                        </Link>
                        <CustomShareButton
                          title={article.title}
                          slug={article.slug}
                          type="blog"
                          imageUrl={article.coverImage}
                          className="border border-white text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md flex items-center text-xs md:text-base"
                        />
                      </div>
                      <div className="sm:ml-auto flex items-center gap-1 md:gap-2 mt-2 sm:mt-0">
                        <button
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full transition-all"
                          onClick={scrollPrev}
                        >
                          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                        <button
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full transition-all"
                          onClick={scrollNext}
                        >
                          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}

// 图标组件
function ReadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
