import Link from 'next/link';
import Image from 'next/image';
import blogData from '@/data/blog.json';
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/generate-metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Blog',
  description: 'Read the latest news and guides about Merge Fellas games',
  path: '/blog'
});

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2 sm:p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">Blog Posts</h1>

        <div className="grid grid-cols-1 gap-8">
          {blogData.map((post) => (
            <article
              key={post.id}
              className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="text-xs bg-orange-500/80 text-white px-2 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-lg md:text-2xl font-bold mb-2 text-white">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-orange-400 transition-colors block"
                    >
                      <div
                        className="line-clamp-2 md:line-clamp-none"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </div>
                    </Link>
                  </h2>

                  <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex justify-between items-start">
                    <div className="text-sm text-white/60 flex flex-col sm:flex-row sm:items-center">
                      <span>{post.date}</span>
                      <span className="hidden sm:inline mx-2">•</span>
                      <span>{post.author}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      Read More
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
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
