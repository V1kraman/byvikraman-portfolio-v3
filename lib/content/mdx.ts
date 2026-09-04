import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content', 'posts');

export interface Post {
  slug: string;
  type: 'project' | 'article';
  title: string;
  date: string;
  summary: string;
  content: string;
  tags?: string[];
  readingTime: string;
  published: boolean;
  featured?: boolean;
  image?: string;
  tech?: string[];
  github?: string;
  demo?: string;
}

function getMDXFiles(dir: string) {
  try {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx' || path.extname(file) === '.md');
  } catch (e) {
    return [];
  }
}

export function getAllPosts(): Post[] {
  const mdxFiles = getMDXFiles(contentDirectory);

  const posts = mdxFiles.map((file) => {
    const filePath = path.join(contentDirectory, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);
    const slug = file.replace(/\.mdx?$/, '');

    return {
      slug,
      type: data.type || 'article',
      title: data.title,
      date: data.date || '',
      summary: data.summary || '',
      content,
      tags: data.tags || [],
      readingTime: readingTime(content).text,
      published: data.published !== false,
      featured: data.featured === true,
      image: data.image || '',
      tech: data.tech || [],
      github: data.github || '',
      demo: data.demo || '',
    } as Post;
  });

  return posts
    .filter(post => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}
