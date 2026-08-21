// Builders for the JSON-LD emitted on blog articles.
// Values are passed in from each page's `metadata` object so the structured
// data and the meta tags can never disagree.

const SITE = "https://www.dsavisualizer.in";
const AUTHOR = {
  "@type": "Person",
  name: "Sohan Rout",
  url: "https://www.linkedin.com/in/sohan-rout",
};
const PUBLISHER = {
  "@type": "Organization",
  name: "DSA Visualizer",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/og.png`,
  },
};

const absolute = (path) => (path.startsWith("http") ? path : `${SITE}${path}`);

export const articleSchema = ({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
  section,
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  image: [absolute(image)],
  datePublished,
  dateModified: dateModified || datePublished,
  author: AUTHOR,
  publisher: PUBLISHER,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absolute(path),
  },
  ...(section ? { articleSection: section } : {}),
  inLanguage: "en",
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map(({ name, path }, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absolute(path),
  })),
});
