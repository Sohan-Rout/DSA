'use client';

import Link from 'next/link';

const SectionsDisplay = ({ sections, searchQuery }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_0_2px_rgba(99,102,241,0.5)] hover:-translate-y-1"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center bg-gray-50 dark:bg-gray-700/50">
            <div className="text-blue-600 dark:text-blue-400 mr-3">{section.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
          </div>
          <div className="p-6">
            {section.subsections ? (
              <div className="space-y-8">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      {subsection.title}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                      {subsection.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.path}
                          className="group/item block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                              {item.name}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.items?.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.path}
                    className="group/item block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                        {item.name}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {sections.length === 0 && (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default SectionsDisplay;