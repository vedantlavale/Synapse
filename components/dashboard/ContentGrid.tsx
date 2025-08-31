"use client"

import ContentCard from "@/components/content-card";
import { Search, Youtube, Twitter, Globe } from "lucide-react";
import { Content, FilterType } from "@/types/content";

interface ContentGridProps {
  loading: boolean;
  filteredContents: Content[];
  contents: Content[];
  selectedFilter: FilterType;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: FilterType) => void;
  onDeleteContent: (contentId: string) => void;
}

export default function ContentGrid({
  loading,
  filteredContents,
  contents,
  selectedFilter,
  searchQuery,
  setSearchQuery,
  setSelectedFilter,
  onDeleteContent,
}: ContentGridProps) {
  const renderEmptyState = () => {
    if (contents.length === 0) {
      return (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-gray-500 text-base sm:text-lg mb-4">No content added yet</p>
          <p className="text-gray-400 text-sm sm:text-base">
            Click &ldquo;Add Content&rdquo; to get started!
          </p>
        </div>
      );
    }

    return (
      <div className="text-center py-8 sm:py-12 px-4">
        {selectedFilter === "youtube" && <Youtube className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />}
        {selectedFilter === "twitter" && <Twitter className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />}
        {selectedFilter === "url" && <Globe className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />}
        {selectedFilter === "all" && <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />}
        
        <p className="text-gray-500 text-base sm:text-lg mb-2">
          {searchQuery ? "No results found" : 
           selectedFilter === "all" ? "No content found" :
           `No ${selectedFilter} content found`}
        </p>
        
        <p className="text-gray-400 text-sm sm:text-base">
          {searchQuery ? (
            <>
              Try searching with different keywords or{" "}
              <button 
                onClick={() => setSearchQuery("")}
                className="text-blue-500 hover:text-blue-600 underline"
              >
                clear search
              </button>
            </>
          ) : selectedFilter !== "all" ? (
            <>
              No {selectedFilter} content available.{" "}
              <button 
                onClick={() => setSelectedFilter("all")}
                className="text-blue-500 hover:text-blue-600 underline"
              >
                View all content
              </button>
            </>
          ) : (
            "Click \"Add Content\" to get started!"
          )}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 sm:h-56 md:h-64 bg-muted rounded-lg border animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (filteredContents.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {filteredContents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onDelete={onDeleteContent}
          />
        ))}
      </div>
    );
  }

  return renderEmptyState();
}
