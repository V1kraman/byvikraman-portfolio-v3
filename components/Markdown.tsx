"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ExternalLink, Download, FileText } from "lucide-react";
import { EngineeringTimeline } from "./EngineeringTimeline";
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
          if (props["data-timeline"] === "garuda" || props.id === "garuda-engineering-timeline") {
            return <EngineeringTimeline />;
          }
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
              className={cls || "text-primary hover:underline underline-offset-4"}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...rest}
            >
              {children}
            </a>
          );
        },
        p: ({ children, node }) => {
          const hasImage = node?.children?.some(
            (child: any) => child.type === "element" && child.tagName === "img"
          );

          if (hasImage) {
            return <>{children}</>;
          }

          return <p className="mb-6 leading-relaxed text-muted-foreground">{children}</p>;
        },
        img: ({ src, alt, ...props }: any) => {
          let normalizedSrc = typeof src === "string" ? src : "";
          if (normalizedSrc.startsWith("/mnt/data/")) {
            const filename = normalizedSrc.replace("/mnt/data/", "");
            normalizedSrc = `/images/projects/esp32-s3-oled/${filename}`;
          } else if (normalizedSrc.startsWith("images/")) {
            const filename = normalizedSrc.replace("images/", "");
            normalizedSrc = `/images/projects/esp32-s3-oled/${filename}`;
          } else if (normalizedSrc && !normalizedSrc.startsWith("/") && !normalizedSrc.startsWith("http")) {
            normalizedSrc = `/images/projects/esp32-s3-oled/${normalizedSrc}`;
          }

          const isPdf = normalizedSrc.toLowerCase().endsWith(".pdf");

          if (isPdf) {
            return (
              <figure className="my-10">
                <div className="rounded-xl overflow-hidden border border-border bg-card shadow-[0_8px_30px_rgba(25,26,24,0.25)] transition-all duration-300 hover:border-primary/40">
                  {/* Top Control Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-secondary/50 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs font-mono uppercase tracking-wider text-foreground">
                        Official Certificate (PDF)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={normalizedSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-foreground/85 hover:text-foreground bg-card hover:bg-secondary border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        title="Open document in a new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                        <span>Open in New Tab</span>
                      </a>
                      <a
                        href={normalizedSrc}
                        download="NIPAM_Certificate_Vikraman.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-foreground/85 hover:text-foreground bg-card hover:bg-secondary border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        title="Download certificate PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-primary" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>

                  {/* Responsive Embedded Viewer */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:h-[640px] bg-obsidian">
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
                          <FileText className="w-12 h-12 text-primary mb-4" />
                          <p className="text-bone text-base font-medium mb-2">{alt || "PDF Certificate"}</p>
                          <p className="text-bone/60 text-xs mb-6 max-w-sm">
                            Your browser does not support inline PDF viewing. You can view or download the certificate directly.
                          </p>
                          <a
                            href={normalizedSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-primary-foreground font-semibold text-xs tracking-wide hover:opacity-90 transition-colors"
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
                  <figcaption className="mt-3 text-center text-xs font-mono tracking-wide text-muted-foreground flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block" />
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          }

          const customClass = extractClass(props);
          if (customClass) {
            const { className: _cn, classname: _clsn, class: _c, ...rest } = props;
            return (
              <img
                src={normalizedSrc}
                alt={alt || ""}
                referrerPolicy="no-referrer"
                className={customClass}
                {...rest}
              />
            );
          }

          return (
            <figure className="my-10 group">
              <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-[0_8px_30px_rgba(25,26,24,0.25)] transition-all duration-300 group-hover:border-primary/45">
                <a
                  href={normalizedSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative cursor-zoom-in group/img"
                  title="Click to view full-resolution original"
                >
                  <img
                    src={normalizedSrc}
                    alt={alt || ""}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[650px] transition-transform duration-500 group-hover/img:scale-[1.01]"
                    {...props}
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity bg-obsidian/90 backdrop-blur-md border border-border rounded-md px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-bone flex items-center gap-1.5 shadow-xl pointer-events-none">
                    <ExternalLink className="w-3 h-3 text-primary" />
                    <span>Full Resolution</span>
                  </div>
                </a>
              </div>
              {alt && (
                <figcaption className="mt-3 text-center text-xs font-mono tracking-wide text-muted-foreground flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block" />
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto my-8 rounded-xl border border-border bg-card/60">
            <table className="w-full text-left text-sm text-foreground/90 border-collapse" {...props}>
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th className="px-4 py-3 border-b border-border bg-secondary/50 text-xs font-mono uppercase tracking-widest text-primary" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="px-4 py-3 border-b border-border/60 text-sm text-muted-foreground" {...props}>
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
