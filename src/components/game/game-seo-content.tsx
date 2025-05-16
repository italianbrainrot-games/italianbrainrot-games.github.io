'use client'
import React from 'react';

interface GameSeoContentProps {
  seoContent: string;
}

const GameSeoContent: React.FC<GameSeoContentProps> = ({ seoContent }) => {
  if (!seoContent) return null;
  
  return (
    <div className="my-8 bg-black/40 backdrop-blur-md rounded-none sm:rounded-xl p-4 sm:p-6 mx-0 border border-white/10">
      <h2 className="text-2xl font-bold text-white uppercase mb-6">Game Details</h2>
      <style jsx global>{`
        .seo-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f59e0b;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .seo-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f59e0b;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .seo-content strong {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }
        .seo-content em {
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }
        .seo-content ul, .seo-content ol {
          margin-top: 0.75rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .seo-content ul {
          list-style-type: disc;
        }
        .seo-content ol {
          list-style-type: decimal;
        }
        .seo-content li {
          margin-bottom: 0.5rem;
        }
        .seo-content a {
          color: #fb923c;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .seo-content a:hover {
          color: #f97316;
        }
        .seo-content p {
          margin-bottom: 1rem;
        }
        .seo-content table {
          width: 100%;
          margin-top: 1rem;
          margin-bottom: 1rem;
          border-collapse: collapse;
        }
        .seo-content th, .seo-content td {
          padding: 0.5rem 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .seo-content th {
          background-color: rgba(0, 0, 0, 0.3);
          font-weight: 600;
        }
        .seo-content tr:nth-child(even) {
          background-color: rgba(0, 0, 0, 0.15);
        }
        .seo-content dl {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .seo-content dt {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 0.75rem;
        }
        .seo-content dd {
          margin-left: 1rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
      <div 
        className="text-white/80 prose prose-invert max-w-none seo-content"
        dangerouslySetInnerHTML={{ __html: seoContent }}
        style={{
          '--tw-prose-headings': 'theme(colors.amber.400)',
          '--tw-prose-links': 'theme(colors.orange.400)',
          '--tw-prose-bold': 'theme(colors.white)',
          '--tw-prose-counters': 'theme(colors.orange.500)',
          '--tw-prose-bullets': 'theme(colors.orange.500)',
          '--tw-prose-hr': 'theme(colors.white/20)',
          '--tw-prose-quotes': 'theme(colors.amber.400)',
          '--tw-prose-quote-borders': 'theme(colors.orange.500)',
          '--tw-prose-th-borders': 'theme(colors.white/20)',
          '--tw-prose-td-borders': 'theme(colors.white/10)'
        } as React.CSSProperties}
      />
    </div>
  );
};

export default GameSeoContent; 