"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CustomMarkdown from './CustomMarkdown';
import CustomShareButton from '@/components/ui/CustomShareButton';
import gamesData from '@/data/games.json';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  author_icon?: string;
  author_desc?: string;
  author_twitter_link?: string;
  author_instgram_link?: string;
  author_facebook_link?: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  categories: string[];
  short_desc: string;
}

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  // Use useState to ensure game recommendations are generated only once when the component first loads
  const [recommendedGames] = useState(() => {
    // Randomly select two games from games.json
    const gamesCopy = [...gamesData];
    // Random sort
    const shuffled = gamesCopy.sort(() => 0.5 - Math.random());
    // Get the first two
    return shuffled.slice(0, 2);
  });

  // Listen for scroll events to update reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-2 sm:p-6 md:p-16">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* SEO-friendly hidden heading for screen readers */}
      <h1 className="sr-only">{post.title} - Italian Brainrot Game Portal</h1>

      {/* SEO-friendly breadcrumbs */}
      <nav aria-label="Breadcrumb" className="w-full max-w-4xl mb-4">
        <ol className="flex text-sm text-white/60">
          <li>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-white/90 truncate max-w-[200px] md:max-w-md" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <Link href="/blog" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Back to Blog List
          </Link>
        </div>

        <article className="bg-black/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-80"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
          {/* Article header */}
          <div className="relative">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="text-xs md:text-sm bg-orange-500/90 text-white px-3 py-1 rounded-full font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">{post.title}</h1>

              <div className="flex items-center text-sm md:text-base text-white/80">
                <span className="font-medium">{post.date}</span>
                <span className="mx-3 text-orange-400">•</span>
                <span className="font-medium">{post.author}</span>
              </div>
            </div>
          </div>

          {/* Article content */}
          <div className="p-6 md:p-10 bg-gradient-to-b from-black/40 to-black/20 relative">
            {/* Content decorative elements */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500/50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent to-orange-500/50"></div>

            <div className="max-w-none pl-4 md:pl-6">
              {/* Introduction area */}
              <div className="mb-10 bg-white/5 p-6 rounded-lg border-l-4 border-orange-500 italic text-lg text-white/90">
                <p>{post.short_desc}</p>
              </div>

              {/* Add article publish date in machine-readable format for SEO */}
              <time dateTime={post.date} className="sr-only">{post.date}</time>

              <CustomMarkdown content={post.content} />

              {/* Article ending decoration */}
              <div className="mt-12 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
              </div>

              {/* Add schema.org article metadata */}
              <div className="sr-only" itemScope itemType="https://schema.org/Article">
                <meta itemProp="headline" content={post.title} />
                <meta itemProp="description" content={post.excerpt} />
                <meta itemProp="image" content={post.coverImage} />
                <meta itemProp="datePublished" content={post.date} />
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <meta itemProp="name" content={post.author} />
                </span>
                <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                  <meta itemProp="name" content="Italian Brainrot Game Portal" />
                  <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                    <meta itemProp="url" content="https://italianbrainrot.com/logo.png" />
                  </span>
                </span>
                {post.tags.map((tag, index) => (
                  <meta key={index} itemProp="keywords" content={tag} />
                ))}
              </div>
            </div>
          </div>

          {/* Article footer */}
          <div className="px-6 md:px-10 pb-8 pt-6 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
            {/* Author information */}
            <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10 flex flex-col md:flex-row items-center md:items-start gap-4">
              {post.author_icon ? (
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={post.author_icon}
                    alt={post.author}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-2xl font-bold">
                  {post.author.split(' ').map(word => word[0]).join('').substring(0, 2)}
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">{post.author}</h3>
                <p className="text-white/70 mb-4">
                  {post.author_desc || "Senior editor at Italian Brainrot gaming portal, focusing on internet culture and gaming trend research."}
                </p>
                <div className="flex justify-center md:justify-start gap-3">
                  {post.author_twitter_link && (
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </button>
                  )}
                  {post.author_instgram_link && (
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </button>
                  )}
                  {post.author_facebook_link && (
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-white">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-white/10 hover:bg-white/15 text-white/90 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-orange-500 transition-colors">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>Like</span>
                </button>

              </div>

              <div className="flex items-center space-x-4">
                <CustomShareButton
                  title={post.title}
                  slug={post.slug}
                  type="blog"
                  imageUrl={post.coverImage}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
                  buttonText={
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-orange-500 transition-colors">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span>Share</span>
                    </>
                  }
                  showIcon={false}
                />
                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-orange-500 transition-colors">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Bookmark</span>
                </button>
              </div>
            </div>

            {/* Italian Brainrot Game Recommendations */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold mb-6 text-white">Italian Brainrot Game Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedGames.map((game) => (
                  <Link key={game.slug} href={`/games/${game.slug}`} className="block">
                    <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-orange-500/30 transition-colors group">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={game.iconUrl}
                          alt={game.name}
                          fill
                          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        {game.rating && (
                          <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                            {game.rating.toFixed(1)}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="text-white font-bold group-hover:text-orange-400 transition-colors line-clamp-1 text-sm">{game.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-1.5 mb-2">
                          {game.category.slice(0, 2).map((cat) => (
                            <span key={cat} className="inline-block px-1.5 py-0.5 bg-orange-500/80 text-white rounded-sm text-[10px] font-medium">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/80 text-xs line-clamp-2">{game.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Back to top button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
