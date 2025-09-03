"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ContentCard from "@/components/content-card";
import { Loader2, Share, AlertCircle } from "lucide-react";

interface Content {
  id: string;
  title: string;
  description?: string;
  link: string;
  type?: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function SharedBrainPage() {
  const params = useParams();
  const shareLink = params.sharelink as string;
  
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brainOwner, setBrainOwner] = useState<string>("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!shareLink) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/v1/brain/share/${shareLink}`);
        
        if (response.ok) {
          const data = await response.json();
          setContents(data.content || []);
          setBrainOwner(data.username || "Unknown User");
        } else if (response.status === 404) {
          setError("This shared brain could not be found or has been removed.");
        } else {
          setError("Failed to load shared brain content.");
        }
      } catch (error) {
        console.error("Error fetching shared content:", error);
        setError("Failed to load shared brain content.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading shared brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Oops!</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Share className="h-6 w-6 text-muted-foreground" />
            <div>
              <h1 className="text-2xl font-bold">
                {brainOwner}&rsquo;s Brain
              </h1>
              <p className="text-sm text-muted-foreground">
                Shared brain content • {contents.length} item{contents.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {contents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onDelete={() => {}} // No delete functionality for shared view
                showDelete={false} // Hide delete button for shared content
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Share className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Content</h2>
            <p className="text-muted-foreground">
              This brain doesn&rsquo;t have any content to share yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
