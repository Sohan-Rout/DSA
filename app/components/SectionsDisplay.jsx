'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronRight, FiSearch, FiInfo } from 'react-icons/fi';
import { useState } from 'react';

const InfoPopup = ({ info }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-10">
      {Object.entries(info).map(([key, value]) => (
        <div key={key} className="mb-2 last:mb-0">
          <span className="font-semibold text-gray-800 dark:text-gray-200">{key}: </span>
          <span className="text-gray-600 dark:text-gray-400">{value}</span>
        </div>
      ))}
    </div>
  );
};

const SectionsDisplay = ({ sections, searchQuery }) => {
  const [hoveredSection, setHoveredSection] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-1">
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: sectionIndex * 0.05 }}
          className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-400/30 dark:hover:border-blue-500/30"
        >
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            </div>
            {section.info && (
              <div 
                className="relative"
                onMouseEnter={() => setHoveredSection(sectionIndex)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <FiInfo className="h-5 w-5 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer" />
                {hoveredSection === sectionIndex && (
                  <InfoPopup info={section.info} />
                )}
              </div>
            )}
          </div>

          {/* Section Content */}
          <div className="p-6">
            {section.subsections ? (
              <div className="space-y-8">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 pl-2 border-l-4 border-blue-500 dark:border-blue-400">
                      {subsection.title}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                      {subsection.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.path}
                          className="group/item relative block p-4 rounded-xl border border-gray-200/70 dark:border-gray-700/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-200 bg-gradient-to-b from-white/50 to-white/0 dark:from-gray-800/30 dark:to-gray-800/10 hover:from-blue-50/70 hover:to-blue-50/30 dark:hover:from-blue-900/20 dark:hover:to-blue-900/10 overflow-hidden"
                        >
                          {/* Hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 dark:via-blue-600/10 transition-opacity duration-300"></div>
                          
                          <div className="relative flex items-center justify-between">
                            <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 font-medium transition-colors">
                              {item.name}
                            </span>
                            <FiChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.items?.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.path}
                    className="group/item relative block p-4 rounded-xl border border-gray-200/70 dark:border-gray-700/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-200 bg-gradient-to-b from-white/50 to-white/0 dark:from-gray-800/30 dark:to-gray-800/10 hover:from-blue-50/70 hover:to-blue-50/30 dark:hover:from-blue-900/20 dark:hover:to-blue-900/10 overflow-hidden"
                  >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 dark:via-blue-600/10 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 font-medium transition-colors">
                        {item.name}
                      </span>
                      <FiChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
      
      {/* Empty State */}
      {sections.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FiSearch className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            No results found for "{searchQuery}"
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Try searching for different terms or browse our categories
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SectionsDisplay;