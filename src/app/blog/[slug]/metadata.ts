import { generateMetadata as generatePageMetadata } from '@/lib/generate-metadata';
import blogData from '@/data/blog.json';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogData.find(post => post.slug === params.slug);
  
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
