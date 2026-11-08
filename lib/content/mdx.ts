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
  /** Optional systems-design metadata (backwards-compatible with all existing MDX files) */
  refId?: string;
  category?: string;
  role?: string;
  subsystem?: string;
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
  } catch {
    return [];
  }
}

export function getAllPosts(): Post[] {
  const mdxFiles = getMDXFiles(contentDirectory);

  const rawPosts = mdxFiles.map((file) => {
    const filePath = path.join(contentDirectory, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);
    const slug = file.replace(/\.mdx?$/, '');

    const rawType = String(data.type || '').toLowerCase().trim();
    const type: 'project' | 'article' =
      rawType === 'project' || rawType === 'case-study' ? 'project' : 'article';

    const relatedProjects = Array.isArray(data.relatedProjects)
      ? data.relatedProjects
      : typeof data.relatedProjects === 'string'
        ? [data.relatedProjects]
        : [];

    const relatedArticles = Array.isArray(data.relatedArticles)
      ? data.relatedArticles
      : typeof data.relatedArticles === 'string'
        ? [data.relatedArticles]
        : [];

    const tags = Array.isArray(data.tags) ? data.tags : [];
    const tech = Array.isArray(data.tech) ? data.tech : [];

    return {
      slug,
      type,
      title: data.title || slug,
      date: data.date || '',
      updated: data.updated || '',
      summary: data.summary || '',
      content,
      tags,
      readingTime: readingTime(content).text,
      published: data.published !== false,
      featured: data.featured === true,
      image: normalizeImagePath(data.image),
      tech,
      github: data.github || '',
      demo: data.demo || '',
      docs: data.docs || '',
      status: data.status || (type === 'project' ? 'Completed' : undefined),
      timeline: data.timeline || (data.date ? new Date(data.date).getFullYear().toString() : undefined),
      relatedProjects,
      relatedArticles,
      refId: typeof data.refId === 'string' ? data.refId : undefined,
      category:
        typeof data.category === 'string'
          ? data.category
          : tags[0]
            ? String(tags[0]).toUpperCase()
            : type === 'project'
              ? 'ENGINEERING MODULE'
              : 'FIELD NOTE',
      role: typeof data.role === 'string' ? data.role : undefined,
      subsystem:
        typeof data.subsystem === 'string'
          ? data.subsystem
          : tech.length > 0
            ? tech.slice(0, 4).join(' · ')
            : tags.slice(0, 3).join(' · '),
    } as Post;
  });

  const sortedPosts = rawPosts
    .filter((post) => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  // Deterministically assign reference designators (U1..Un for projects, FN1..FNn for articles)
  // if not explicitly defined in frontmatter, ensuring 100% backwards compatibility.
  let projectCounter = 1;
  let articleCounter = 1;

  return sortedPosts.map((post) => {
    if (post.refId) {
      return post;
    }
    if (post.type === 'project') {
      const assigned = `U${projectCounter}`;
      projectCounter += 1;
      return { ...post, refId: assigned };
    } else {
      const assigned = `FN${articleCounter}`;
      articleCounter += 1;
      return { ...post, refId: assigned };
    }
  });
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
 * 2. Sort published projects (`type === 'project'`) strictly by publication date descending.
 * 3. Default `limit` is 1 so the homepage displays only the single most recently published project.
 */
export function getFeaturedWork(allPosts: Post[] = getAllPosts(), limit: number = 1): Post[] {
  const validPosts = allPosts.filter((post) => post.published !== false);

  const getPublicationTimestamp = (post: Post): number => {
    const dateStr = post.date || post.updated;
    if (!dateStr) return 0;
    const time = new Date(dateStr).getTime();
    return isNaN(time) ? 0 : time;
  };

  const sortByPubDateDesc = (a: Post, b: Post) =>
    getPublicationTimestamp(b) - getPublicationTimestamp(a);

  const publishedProjects = validPosts
    .filter((post) => post.type === 'project')
    .sort(sortByPubDateDesc);

  return publishedProjects.slice(0, limit);
}

export function getRelatedContent(currentPost: Post, allPosts: Post[] = getAllPosts()): Post[] {
  if (currentPost.type === 'project') {
    const explicitSlugs = currentPost.relatedArticles || [];
    const explicit = allPosts.filter(
      (p) => p.type === 'article' && p.slug !== currentPost.slug && explicitSlugs.includes(p.slug)
    );
    const tagMatches = allPosts.filter(
      (p) =>
        p.type === 'article' &&
        p.slug !== currentPost.slug &&
        !explicitSlugs.includes(p.slug) &&
        (p.tags?.some((t) => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)) ||
          p.tech?.some((t) => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)))
    );
    const remaining = allPosts.filter(
      (p) =>
        p.type === 'article' &&
        p.slug !== currentPost.slug &&
        !explicit.some((e) => e.slug === p.slug) &&
        !tagMatches.some((t) => t.slug === p.slug)
    );
    return [...explicit, ...tagMatches, ...remaining].slice(0, 2);
  } else {
    const explicitSlugs = currentPost.relatedProjects || [];
    const explicit = allPosts.filter(
      (p) => p.type === 'project' && p.slug !== currentPost.slug && explicitSlugs.includes(p.slug)
    );
    const tagMatches = allPosts.filter(
      (p) =>
        p.type === 'project' &&
        p.slug !== currentPost.slug &&
        !explicitSlugs.includes(p.slug) &&
        (p.tags?.some((t) => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)) ||
          p.tech?.some((t) => currentPost.tags?.includes(t) || currentPost.tech?.includes(t)))
    );
    const remaining = allPosts.filter(
      (p) =>
        p.type === 'project' &&
        p.slug !== currentPost.slug &&
        !explicit.some((e) => e.slug === p.slug) &&
        !tagMatches.some((t) => t.slug === p.slug)
    );
    return [...explicit, ...tagMatches, ...remaining].slice(0, 2);
  }
}
