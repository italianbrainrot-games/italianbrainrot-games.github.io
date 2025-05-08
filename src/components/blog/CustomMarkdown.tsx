"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

// No need for custom interfaces as we're using the default component props

interface CustomMarkdownProps {
  content: string;
}

export default function CustomMarkdown({ content }: CustomMarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1
            className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-white border-b border-orange-500/30 pb-4"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="text-2xl md:text-3xl font-bold mt-10 mb-6 text-white"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            className="text-xl md:text-2xl font-bold mt-8 mb-4 text-white"
            {...props}
          />
        ),
        p: ({ ...props }) => (
          <p
            className="text-white/90 text-lg leading-relaxed my-6"
            {...props}
          />
        ),
        a: ({ ...props }) => (
          <a
            className="text-orange-400 font-medium hover:text-orange-300 transition-colors no-underline"
            {...props}
          />
        ),
        strong: ({ ...props }) => (
          <strong
            className="text-white font-bold"
            {...props}
          />
        ),
        em: ({ ...props }) => (
          <em
            className="text-white/80 italic"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul
            className="list-disc pl-6 my-6 text-white/90"
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            className="list-decimal pl-6 my-6 text-white/90"
            {...props}
          />
        ),
        li: ({ ...props }) => (
          <li
            className="my-2 text-white/90 text-lg"
            {...props}
          />
        ),
        img: (props) => {
          const { src, alt } = props;
          return (
            <div className="my-8 mx-auto relative">
              {src && typeof src === 'string' ? (
                <div className="relative w-full" style={{ maxWidth: '100%', height: 'auto', minHeight: '300px' }}>
                  <Image
                    src={src}
                    alt={alt || ''}
                    fill
                    className="rounded-lg shadow-lg object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              ) : (
                // Fallback to regular img if src is not a string
                <Image
                  src={src?.toString() || ''}
                  alt={alt || ''}
                  className="rounded-lg shadow-lg max-w-full mx-auto"
                />
              )}
            </div>
          );
        },
        hr: ({ ...props }) => (
          <hr
            className="my-10 border-white/10"
            {...props}
          />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-orange-500 pl-6 py-1 my-8 bg-white/5 rounded-r-lg pr-4 italic text-white/80"
            {...props}
          />
        ),
        code: ({ inline,  ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean; className?: string }) => (
          inline ? (
            <code
              className="text-orange-300 bg-white/10 px-1 py-0.5 rounded font-mono"
              {...props}
            />
          ) : (
            <code
              className="block bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto my-8 font-mono text-orange-300"
              {...props}
            />
          )
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}




