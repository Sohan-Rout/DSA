"use client";
import { useState } from "react";
import SearchBar from "@/app/components/ui/SearchBar";
import SectionsDisplay from "@/app/components/SectionsDisplay";

const VisualizerClient = ({ initialSections }) => {
  const [filteredSections, setFilteredSections] = useState(initialSections);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="mb-6">
        <SearchBar
          sections={initialSections}
          onSearchResults={setFilteredSections}
          setSearchQuery={setSearchQuery}
        />
      </div>
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
