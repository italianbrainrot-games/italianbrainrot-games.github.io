import { generateMetadata as generatePageMetadata } from '@/lib/generate-metadata';
import blogData from '@/data/blog.json';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData.find(post => post.slug === slug);
  
  if (!post) {
    return {};
  }
  
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage
  });
}
