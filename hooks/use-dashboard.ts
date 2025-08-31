"use client"

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Content, ContentCounts, FilterType } from "@/types/content";

export function useDashboard() {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  // Filter contents based on search query and selected filter
  useEffect(() => {
    let filtered = contents;

    // Apply type filter first
    if (selectedFilter !== "all") {
      filtered = filtered.filter(content => {
        if (selectedFilter === "youtube") {
          return content.type === "youtube" || content.link.includes("youtube.com") || content.link.includes("youtu.be");
        } else if (selectedFilter === "twitter") {
          return content.type === "twitter" || content.link.includes("twitter.com") || content.link.includes("x.com");
        } else if (selectedFilter === "url") {
          return content.type === "url" || content.type === "link" || (!content.link.includes("youtube.com") && !content.link.includes("youtu.be") && !content.link.includes("twitter.com") && !content.link.includes("x.com"));
        }
        return true;
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContents(filtered);
  }, [contents, searchQuery, selectedFilter]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const session = await authClient.getSession();
      
      if (!session) {
        console.log("No session found");
        return;
      }

      const response = await fetch("/api/v1/content");
      if (response.ok) {
        const data = await response.json();
        setContents(data.content || []);
        setFilteredContents(data.content || []);
      } else {
        console.error("Failed to fetch content");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      const response = await fetch(`/api/v1/content?id=${contentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setContents(contents.filter(content => content.id !== contentId));
        setFilteredContents(filteredContents.filter(content => content.id !== contentId));
      } else {
        alert("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content");
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };

  // Calculate counts for each content type
  const getContentCounts = (): ContentCounts => {
    const counts = {
      all: contents.length,
      youtube: contents.filter(content => 
        content.type === "youtube" || 
        content.link.includes("youtube.com") || 
        content.link.includes("youtu.be")
      ).length,
      twitter: contents.filter(content => 
        content.type === "twitter" || 
        content.link.includes("twitter.com") || 
        content.link.includes("x.com")
      ).length,
      url: contents.filter(content => 
        content.type === "url" || 
        content.type === "link" || 
        (!content.link.includes("youtube.com") && 
         !content.link.includes("youtu.be") && 
         !content.link.includes("twitter.com") && 
         !content.link.includes("x.com"))
      ).length
    };
    return counts;
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    contents,
    filteredContents,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    loading,
    fetchContent,
    handleDeleteContent,
    clearAllFilters,
    contentCounts: getContentCounts(),
  };
}
