import React from 'react';

// Utility: append or merge query params
function withQuery(url, params) {
  const u = new URL(url);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      u.searchParams.set(k, String(v));
    }
  });
  return u.toString();
}

// Build provider-specific URLs for a given width/format/quality
function buildUrl({ src, width, format, quality = 75 }) {
  try {
    const u = new URL(src);
    const host = u.hostname.toLowerCase();

    // Unsplash images (images.unsplash.com or plus.unsplash.com)
    if (host.includes('unsplash.com')) {
      // Unsplash supports w, q, fm
      return withQuery(src, { w: width, q: quality, fm: format });
    }

    // ImageKit images (subdomain.imagekit.io)
    if (host.includes('imagekit.io')) {
      // Use query-based transformation: ?tr=w-<w>,q-<q>,f-<format>
      const base = new URL(src);
      const trExisting = base.searchParams.get('tr');
      const trParts = [];
      if (trExisting) trParts.push(trExisting);
      trParts.push(`w-${width}`);
      trParts.push(`q-${quality}`);
      if (format) trParts.push(`f-${format}`);
      base.searchParams.set('tr', trParts.join(','));
      return base.toString();
    }

    // Default: just return original for that width (no transform)
    return src;
  } catch {
    return src;
  }
}

// Generate srcset for an array of widths
function buildSrcSet({ src, widths, format, quality }) {
  return widths
    .map((w) => `${buildUrl({ src, width: w, format, quality })} ${w}w`)
    .join(', ');
}

/**
 * OptimizedImage
 * - Renders a responsive <picture> with AVIF/WebP sources when supported.
 * - Supports Unsplash and ImageKit URLs by adding width/format/quality parameters.
 * - Props: src, alt, widths (number[]), sizes (string), quality (0-100), className, priority
 */
export default function OptimizedImage({
  src,
  alt,
  widths = [480, 768, 1024, 1280, 1536],
  sizes = '(min-width: 1024px) 1024px, 100vw',
  quality = 75,
  className = '',
  priority = false,
  decoding = 'async',
  style,
}) {
  const avifSrcSet = buildSrcSet({ src, widths, format: 'avif', quality });
  const webpSrcSet = buildSrcSet({ src, widths, format: 'webp', quality });
  const fallbackSrcSet = buildSrcSet({ src, widths, format: undefined, quality });

  // Choose the smallest as placeholder src
  const placeholderSrc = buildUrl({ src, width: widths[0], format: 'webp', quality: 40 });

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={placeholderSrc}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchpriority: 'high' } : { fetchpriority: 'auto' })}
        decoding={decoding}
        style={style}
      />
    </picture>
  );
}
