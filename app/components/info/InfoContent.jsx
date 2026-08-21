import Link from "next/link";

// Same card shell as PolicyContent, but without the numbered legal pills —
// About and Contact read as prose, not clauses.
const InfoContent = ({ intro, sections, footnote }) => {
  return (
    <article className="max-w-3xl mx-auto bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {intro && (
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">{intro}</p>
      )}

      <div className="space-y-8">
        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {section.title}
            </h2>

            {section.paragraphs?.map((text, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 mb-3">
                {text}
              </p>
            ))}

            {section.points && (
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 pl-5 mt-2">
                {section.points.map((point, i) => (
                  <li key={i} className="list-disc text-blue-500">
                    <span className="text-gray-600 dark:text-gray-300">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {section.links && (
              <div className="mt-4 flex flex-wrap gap-3">
                {section.links.map((link, i) =>
                  link.external ? (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      key={i}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition"
                    >
                      {link.text}
                    </Link>
                  )
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      {footnote && (
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">{footnote}</p>
        </div>
      )}
    </article>
  );
};

export default InfoContent;
