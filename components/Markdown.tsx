"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        p: ({ children, node }) => {
          const hasImage = node?.children?.some(
            (child: any) => child.type === 'element' && child.tagName === 'img'
          );

          if (hasImage) {
            return <>{children}</>;
          }

          return <p className="mb-6 leading-relaxed text-white/70">{children}</p>;
        },
        img: ({ src, alt, ...props }) => {
          let normalizedSrc = typeof src === 'string' ? src : '';
          if (normalizedSrc.startsWith('/mnt/data/')) {
            const filename = normalizedSrc.replace('/mnt/data/', '');
            normalizedSrc = `/images/projects/esp32-s3-oled/${filename}`;
          } else if (normalizedSrc.startsWith('images/')) {
            const filename = normalizedSrc.replace('images/', '');
            normalizedSrc = `/images/projects/esp32-s3-oled/${filename}`;
          } else if (normalizedSrc && !normalizedSrc.startsWith('/') && !normalizedSrc.startsWith('http')) {
            normalizedSrc = `/images/projects/esp32-s3-oled/${normalizedSrc}`;
          }

          return (
            <figure className="my-10 group">
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d11] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-white/25">
                <img
                  src={normalizedSrc}
                  alt={alt || ''}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-[1.01]"
                  {...props}
                />
              </div>
              {alt && (
                <figcaption className="mt-3 text-center text-xs font-mono tracking-wide text-white/50 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A370]/60 inline-block" />
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto my-8 rounded-xl border border-white/10 bg-white/[0.01]">
            <table className="w-full text-left text-sm text-white/80 border-collapse" {...props}>
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th className="px-4 py-3 border-b border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-[#C2A370]" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="px-4 py-3 border-b border-white/5 text-sm text-white/70" {...props}>
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

