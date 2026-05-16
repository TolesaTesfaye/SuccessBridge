/**
 * XSS Protection Utility
 * Uses DOMPurify to sanitize HTML content before rendering
 */

import DOMPurify from "dompurify";

// Configure DOMPurify for enhanced security
DOMPurify.setConfig({
  // Allow only safe protocols
  ALLOWED_URI_REGEXP:
    /^(?:(?:(?:f|ht)tps?|mailto|tel|http|ftp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  // Keep data attributes but sanitize them
  ALLOW_DATA_ATTR: true,
  // Allow specific safe tags
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "s",
    "strike",
    "ul",
    "ol",
    "li",
    "dl",
    "dt",
    "dd",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "pre",
    "code",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "div",
    "span",
    "section",
    "article",
    "header",
    "footer",
    "a",
    "img",
    "figure",
    "figcaption",
    "sub",
    "sup",
    "mark",
    "del",
    "ins",
    "hr",
    "details",
    "summary",
  ],
  // Allow specific safe attributes
  ALLOWED_ATTR: [
    "href",
    "src",
    "alt",
    "title",
    "class",
    "id",
    "style",
    "colspan",
    "rowspan",
    "headers",
    "scope",
    "target",
    "rel",
    "loading",
    "width",
    "height",
  ],
  // Force rel attributes on links
  ADD_ATTR: ["rel"],
});

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHTML(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  return DOMPurify.sanitize(html, {
    RETURN_TRUSTED_TYPE: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
}

/**
 * Get sanitized HTML for use with dangerouslySetInnerHTML
 * @param html - Raw HTML string to sanitize
 * @returns Object suitable for dangerouslySetInnerHTML
 */
export function getSanitizedHTML(html: string): { __html: string } {
  return { __html: sanitizeHTML(html) };
}

/**
 * Sanitize a URL to prevent javascript: protocol attacks
 * @param url - URL to sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeURL(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }

  // Allow only safe protocols
  const safeProtocols = ["http:", "https:", "mailto:", "tel:", "ftp:"];
  try {
    const parsed = new URL(url);
    if (safeProtocols.includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch {
    // If URL parsing fails, check if it's a relative URL
    if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?")) {
      return url;
    }
  }

  return "";
}

/**
 * Escape HTML special characters to prevent XSS
 * @param text - Text to escape
 * @returns Escaped text safe for HTML insertion
 */
export function escapeHTML(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Check if content contains potentially dangerous patterns
 * @param content - Content to check
 * @returns True if content appears safe, false if suspicious
 */
export function isContentSafe(content: string): boolean {
  if (!content || typeof content !== "string") {
    return true; // Empty content is safe
  }

  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick=, onerror=, etc.
    /data:text\/html/i,
    /vbscript:/i,
    /expression\s*\(/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(content));
}
