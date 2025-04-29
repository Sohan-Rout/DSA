"use client";
import { useState } from "react";
import SearchBar from "@/app/components/ui/SearchBar";
import SectionsDisplay from "@/app/components/SectionsDisplay";

const tags = [
  { title: "Sorting" },
  { title: "Searching" },
  { title: "Array" },
  { title: "Implementation" },
  { title: "Graphs" },
  { title: "Stack" },
  { title: "Operations" },
  { title: "Traversal" },
  { title: "Queue" },
  { title: "Linked List" },
  { title: "Trees" },
];

const VisualizerClient = ({ initialSections }) => {
  const [filteredSections, setFilteredSections] = useState(initialSections);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
     { /* search bar display */ }
      <div className="mb-10">
        <SearchBar
          sections={initialSections}
          onSearchResults={setFilteredSections}
          setSearchQuery={setSearchQuery}
        />
      </div>

      { /* Tags section */}
      <div className="pb-6">
        <ul className="flex flex-wrap gap-2 justify-center">
          {tags.map((tags, index) => (
            <li key={index}>
              <div className="bg-white dark:bg-gray-700 border rounded-full border-transparent">
              <div className="border border-gray-900 dark:border-transparent rounded-full p-1 pl-4 pr-4 dark:bg-gray-800 bg-white hover:bg-blue-600/25 dark:hover:bg-blue-600">
                {tags.title}
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      { /* section display */ }
      <div>
        <SectionsDisplay
          sections={filteredSections}
          searchQuery={searchQuery}
        />
      </div>
    </>
  );
};

export default VisualizerClient;
