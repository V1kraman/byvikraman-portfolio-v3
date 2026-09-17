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
  updated?: string;
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
  docs?: string;
  status?: string;
  timeline?: string;
  relatedProjects?: string[];
  relatedArticles?: string[];
}

function normalizeImagePath(img?: string): string {
  if (!img) return '';
  const trimmed = img.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  return `/images/projects/${trimmed}`;
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

    const rawType = String(data.type || '').toLowerCase().trim();
    const type: 'project' | 'article' = 
      rawType === 'project' || rawType === 'case-study' ? 'project' : 'article';

    const relatedProjects = Array.isArray(data.relatedProjects) 
      ? data.relatedProjects 
      : (typeof data.relatedProjects === 'string' ? [data.relatedProjects] : []);

    const relatedArticles = Array.isArray(data.relatedArticles) 
      ? data.relatedArticles 
      : (typeof data.relatedArticles === 'string' ? [data.relatedArticles] : []);

    return {
      slug,
      type,
      title: data.title || slug,
      date: data.date || '',
      updated: data.updated || '',
      summary: data.summary || '',
      content,
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: readingTime(content).text,
      published: data.published !== false,
      featured: data.featured === true,
      image: normalizeImagePath(data.image),
      tech: Array.isArray(data.tech) ? data.tech : [],
      github: data.github || '',
      demo: data.demo || '',
      docs: data.docs || '',
      status: data.status || (type === 'project' ? 'Completed' : undefined),
      timeline: data.timeline || (data.date ? new Date(data.date).getFullYear().toString() : undefined),
      relatedProjects,
      relatedArticles,
    } as Post;
  });

  return posts
    .filter(post => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function isOngoingStatus(status?: string): boolean {
  if (!status) return false;
  const lower = status.toLowerCase().trim();
  return (
    lower.includes('ongoing') ||
    lower.includes('in-progress') ||
    lower.includes('in progress') ||
    lower.includes('active') ||
    lower.includes('wip') ||
    lower.includes('building')
  );
}

/**
 * Dynamically selects featured work for the homepage.
 *
 * Selection Rules:
 * 1. Filter out draft/unpublished items (published !== false).
 * 2. Priority 1: Active/Ongoing projects currently being built.
 * 3. Priority 2: Most recent work (projects/articles) based on publication/update date to fill open slots.
 * 4. Maximum of `limit` items (defaults to 2).
 * 5. Strict deduplication (no item can appear twice).
 * 6. Graceful degradation for 0, 1, or 2+ items.
 */
export function getFeaturedWork(allPosts: Post[] = getAllPosts(), limit: number = 2): Post[] {
  // 1. Only consider published items
  const validPosts = allPosts.filter((post) => post.published !== false);

  const getPostTimestamp = (post: Post): number => {
    const dateStr = post.updated || post.date;
    if (!dateStr) return 0;
    const time = new Date(dateStr).getTime();
    return isNaN(time) ? 0 : time;
  };

  const sortByDateDesc = (a: Post, b: Post) => getPostTimestamp(b) - getPostTimestamp(a);

  const selected: Post[] = [];
  const selectedSlugs = new Set<string>();

  // Priority 1: Ongoing projects (active work currently being built)
  const ongoingProjects = validPosts
    .filter((post) => post.type === 'project' && isOngoingStatus(post.status))
    .sort(sortByDateDesc);

  for (const project of ongoingProjects) {
    if (selected.length >= limit) break;
    selected.push(project);
    selectedSlugs.add(project.slug);
  }

  // Priority 2: Fill remaining slots with the most recent work based on publication or update date.
  // When there are not enough active projects, allow recent projects/posts to fill empty slots.
  if (selected.length < limit) {
    const remainingPosts = validPosts
      .filter((post) => !selectedSlugs.has(post.slug))
      .sort(sortByDateDesc);

    for (const post of remainingPosts) {
      if (selected.length >= limit) break;
      selected.push(post);
      selectedSlugs.add(post.slug);
    }
  }

  return selected;
}

export function getRelatedContent(currentPost: Post, allPosts: Post[] = getAllPosts()): Post[] {
  if (currentPost.type === 'project') {
    // Recommend related articles for a project
    const explicitSlugs = currentPost.relatedArticles || [];
    const explicit = allPosts.filter(
      p => p.type === 'article' && p.slug !== currentPost.slug && explicitSlugs.includes(p.slug)
    );
    const tagMatches = allPosts.filter(
      p => p.type === 'article' &&
           p.slug !== currentPost.slug &&
           !explicitSlugs.includes(p.slug) &&
           (p.tags?.some(t => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)) ||
            p.tech?.some(t => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)))
    );
    const remaining = allPosts.filter(
      p => p.type === 'article' &&
           p.slug !== currentPost.slug &&
           !explicit.some(e => e.slug === p.slug) &&
           !tagMatches.some(t => t.slug === p.slug)
    );
    return [...explicit, ...tagMatches, ...remaining].slice(0, 2);
  } else {
    // Recommend related projects for an article
    const explicitSlugs = currentPost.relatedProjects || [];
    const explicit = allPosts.filter(
      p => p.type === 'project' && p.slug !== currentPost.slug && explicitSlugs.includes(p.slug)
    );
    const tagMatches = allPosts.filter(
      p => p.type === 'project' &&
           p.slug !== currentPost.slug &&
           !explicitSlugs.includes(p.slug) &&
           (p.tags?.some(t => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)) ||
            p.tech?.some(t => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)))
    );
    const remaining = allPosts.filter(
      p => p.type === 'project' &&
           p.slug !== currentPost.slug &&
           !explicit.some(e => e.slug === p.slug) &&
           !tagMatches.some(t => t.slug === p.slug)
    );
    return [...explicit, ...tagMatches, ...remaining].slice(0, 2);
  }
}

