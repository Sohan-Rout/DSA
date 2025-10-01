 'use client';

import { useState, useEffect } from 'react';

const SearchBar = ({ sections, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      onSearchResults(sections);
      return;
    }

    const filtered = sections.map(section => {
      const sectionTitleMatch = section.title.toLowerCase().includes(query);
      
      const subsectionMatches = section.subsections?.map(subsection => {
        const subsectionTitleMatch = subsection.title.toLowerCase().includes(query);
        const itemMatches = subsection.items.filter(item => 
          item.name.toLowerCase().includes(query)
        );
        return {
          ...subsection,
          items: subsectionTitleMatch ? subsection.items : itemMatches,
          isHighlighted: subsectionTitleMatch || itemMatches.length > 0
        };
      }).filter(subsection => subsection.items.length > 0);

      const itemMatches = section.items?.filter(item => 
        item.name.toLowerCase().includes(query)
      );

      return {
        ...section,
        subsections: section.subsections ? subsectionMatches : undefined,
        items: section.subsections ? undefined : (itemMatches?.length > 0 ? itemMatches : undefined),
        isHighlighted: sectionTitleMatch || 
                      (subsectionMatches?.length > 0) || 
                      (itemMatches?.length > 0)
      };
    }).filter(section => 
      section.isHighlighted || 
      section.subsections?.length > 0 || 
      section.items?.length > 0
    );

    onSearchResults(filtered);
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto relative">
      <input
        type="text"
        placeholder="Search for algorithms..."
        className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/75 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
        value={searchQuery}
        onChange={handleSearch}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute right-4 top-3.5 text-gray-400 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchBar;