"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ExternalLink, Download, FileText } from "lucide-react";
import "highlight.js/styles/github-dark.css";

interface MarkdownProps {
  content: string;
}

function extractClass(props: any): string {
  if (props.className) {
    return Array.isArray(props.className) ? props.className.join(" ") : String(props.className);
  }
  if (props.classname) {
    return Array.isArray(props.classname) ? props.classname.join(" ") : String(props.classname);
  }
  if (props.class) {
    return Array.isArray(props.class) ? props.class.join(" ") : String(props.class);
  }
  return "";
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        div: ({ node, children, ...props }: any) => {
          const cls = extractClass(props);
          const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
          return <div className={cls} {...rest}>{children}</div>;
        },
        figure: ({ node, children, ...props }: any) => {
          const cls = extractClass(props);
          const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
          return <figure className={cls} {...rest}>{children}</figure>;
        },
        figcaption: ({ node, children, ...props }: any) => {
          const cls = extractClass(props);
          const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
          return <figcaption className={cls} {...rest}>{children}</figcaption>;
        },
        span: ({ node, children, ...props }: any) => {
          const cls = extractClass(props);
          const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
          return <span className={cls} {...rest}>{children}</span>;
        },
        a: ({ node, href, children, ...props }: any) => {
          const cls = extractClass(props);
          const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
          const isExternal = href?.startsWith("http") || href?.startsWith("/images/");
          return (
            <a
              href={href}
              className={cls || "text-[#C2A370] hover:underline underline-offset-4"}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...rest}
            >
              {children}
            </a>
          );
        },
        p: ({ children, node }) => {
          const hasImage = node?.children?.some(
            (child: any) => child.type === 'element' && child.tagName === 'img'
          );

          if (hasImage) {
            return <>{children}</>;
          }

          return <p className="mb-6 leading-relaxed text-white/70">{children}</p>;
        },
        img: ({ src, alt, ...props }: any) => {
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

          const isPdf = normalizedSrc.toLowerCase().endsWith('.pdf');

          if (isPdf) {
            return (
              <figure className="my-10">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d11] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20">
                  {/* Top Control Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white/[0.03] border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C2A370]" />
                      <span className="text-xs font-mono uppercase tracking-wider text-white/80">
                        Official Certificate (PDF)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={normalizedSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A370]"
                        title="Open document in a new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#C2A370]" />
                        <span>Open in New Tab</span>
                      </a>
                      <a
                        href={normalizedSrc}
                        download="NIPAM_Certificate_Vikraman.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A370]"
                        title="Download certificate PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C2A370]" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>

                  {/* Responsive Embedded Viewer */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:h-[640px] bg-[#141417]">
                    <object
                      data={`${normalizedSrc}#toolbar=0&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-full"
                      aria-label={alt || "Certificate PDF"}
                    >
                      <iframe
                        src={`${normalizedSrc}#toolbar=0`}
                        title={alt || "Certificate PDF"}
                        className="w-full h-full border-0"
                      >
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                          <FileText className="w-12 h-12 text-[#C2A370] mb-4" />
                          <p className="text-white text-base font-medium mb-2">{alt || "PDF Certificate"}</p>
                          <p className="text-white/50 text-xs mb-6 max-w-sm">
                            Your browser does not support inline PDF viewing. You can view or download the certificate directly.
                          </p>
                          <a
                            href={normalizedSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#C2A370] text-black font-semibold text-xs tracking-wide hover:bg-[#C2A370]/90 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Certificate PDF
                          </a>
                        </div>
                      </iframe>
                    </object>
                  </div>
                </div>

                {alt && (
                  <figcaption className="mt-3 text-center text-xs font-mono tracking-wide text-white/50 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C2A370]/60 inline-block" />
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          }

          const customClass = extractClass(props);
          // If this image already has custom classes (e.g. within an embedded gallery grid), render directly without double wrapping
          if (customClass) {
            const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
            return (
              <img
                src={normalizedSrc}
                alt={alt || ''}
                referrerPolicy="no-referrer"
                className={customClass}
                {...rest}
              />
            );
          }

          return (
            <figure className="my-10 group">
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d11] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-white/25">
                <a
                  href={normalizedSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative cursor-zoom-in group/img"
                  title="Click to view full-resolution original"
                >
                  <img
                    src={normalizedSrc}
                    alt={alt || ''}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[650px] transition-transform duration-500 group-hover/img:scale-[1.01]"
                    {...props}
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/20 rounded-md px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-white/90 flex items-center gap-1.5 shadow-xl pointer-events-none">
                    <ExternalLink className="w-3 h-3 text-[#C2A370]" />
                    <span>Full Resolution</span>
                  </div>
                </a>
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

