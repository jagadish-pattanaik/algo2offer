import React from 'react';
import { useLocation } from 'react-router-dom';

const APP_URL = "https://algo2offer-beta.vercel.app";

export default function SEO({
  title,
  description,
  canonicalPath,
  noindex = false,
  ogType = "website",
  ogImage = "/default-og-image.png",
  breadcrumbs = []
}) {
  const location = useLocation();
  const currentPath = canonicalPath !== undefined ? canonicalPath : location.pathname;
  const canonicalUrl = `${APP_URL}${currentPath}`;
  const displayTitle = title ? `${title} | Algo2Offer` : "Algo2Offer";
  const displayDescription = description || "Algo2Offer is a platform to master DSA, CS Fundamentals, and track placement preparedness metrics.";

  let breadcrumbJsonLd = null;
  if (breadcrumbs && breadcrumbs.length > 0) {
    const listItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${APP_URL}/`
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.name,
        "item": `${APP_URL}${crumb.path}`
      }))
    ];

    breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": listItems
    };
  }

  return (
    <>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      {ogImage && <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${APP_URL}${ogImage}`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${APP_URL}${ogImage}`} />}

      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c')}
        </script>
      )}
    </>
  );
}

