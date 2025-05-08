import { notFound } from 'next/navigation';
import blogData from '@/data/blog.json';
import BlogContent from '@/components/blog/BlogContent';
import { generateMetadataJsonLd } from './metadata';

// Required for static site generation with dynamic routes when using output: 'export'
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

// Define the types for our blog post
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData.find((post) => post.slug === slug) as BlogPost | undefined;

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Add structured data */}
      {generateMetadataJsonLd({ slug }) && (
        <div dangerouslySetInnerHTML={{
          __html: generateMetadataJsonLd({ slug }) || '',
        }} />
      )}
      <BlogContent post={post} />
    </>
  );
}
