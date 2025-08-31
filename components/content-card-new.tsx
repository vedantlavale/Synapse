import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Twitter, Globe, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

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

interface ContentCardProps {
  content: Content;
  onDelete?: (id: string) => void;
}

function getYoutubeThumbnail(url: string): string {
  console.log("Processing YouTube URL:", url);
  
  // More comprehensive YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /(?:youtube\.com\/v\/)([^&\n?#]+)/,
    /(?:youtube\.com\/.*[?&]v=)([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      console.log("Extracted video ID:", videoId);
      // Try different thumbnail qualities
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }
  
  console.log("No video ID found for URL:", url);
  return "";
}

export default function ContentCard({ content, onDelete }: ContentCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  // Generate thumbnail URL when component mounts or content changes
  useEffect(() => {
    if (content.type === "youtube") {
      const thumbnail = getYoutubeThumbnail(content.link);
      setThumbnailUrl(thumbnail);
      setImageError(false); // Reset error state when URL changes
    }
  }, [content.link, content.type]);

  const getVideoIdFromUrl = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtube\.com\/.*[?&]v=)([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return "";
  };

  const handleThumbnailError = () => {
    console.log("Thumbnail failed to load, trying fallback");
    
    // Try fallback thumbnail URLs
    if (content.type === "youtube" && thumbnailUrl.includes("maxresdefault")) {
      const videoId = getVideoIdFromUrl(content.link);
      if (videoId) {
        console.log("Trying hqdefault fallback for video ID:", videoId);
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        return;
      }
    }
    
    // If still failing, show error state
    setImageError(true);
  };

  const handleDelete = async () => {
    if (!onDelete || !confirm("Are you sure you want to delete this content?")) return;
    
    setIsDeleting(true);
    try {
      await onDelete(content.id);
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderThumbnail = () => {
    if (content.type === "youtube") {
      if (thumbnailUrl && !imageError) {
        return (
          <div className="relative">
            <Image
              src={thumbnailUrl}
              alt={content.title}
              width={400}
              height={192}
              className="w-full h-48 object-cover rounded-lg"
              onError={handleThumbnailError}
              onLoad={() => console.log("Thumbnail loaded successfully:", thumbnailUrl)}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
              <Play className="h-12 w-12 text-white" fill="white" />
            </div>
          </div>
        );
      }
      
      // Fallback for YouTube when thumbnail fails
      return (
        <div className="w-full h-48 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Play className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-700">YouTube Video</p>
            <p className="text-xs text-red-500">Thumbnail unavailable</p>
          </div>
        </div>
      );
    }

    if (content.type === "twitter") {
      return (
        <div className="w-full h-48 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Twitter className="h-12 w-12 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-700">Twitter Post</p>
          </div>
        </div>
      );
    }

    // Default link preview
    return (
      <div className="w-full h-48 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Globe className="h-12 w-12 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-700">Web Link</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">{content.title}</CardTitle>
            {content.description && (
              <CardDescription className="text-sm text-gray-600">
                {content.description}
              </CardDescription>
            )}
          </div>
          <CardAction>
            <Button
              variant="neutral"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardAction>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {renderThumbnail()}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {content.type === "youtube" && <Play className="h-4 w-4" />}
              {content.type === "twitter" && <Twitter className="h-4 w-4" />}
              {(!content.type || content.type === "link") && <Globe className="h-4 w-4" />}
              <span className="capitalize">{content.type || "link"}</span>
            </div>
            
            <Button
              variant="neutral"
              size="sm"
              onClick={() => window.open(content.link, "_blank")}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </Button>
          </div>
          
          {content.user && (
            <div className="text-xs text-gray-400 pt-2 border-t">
              Added by {content.user.name || content.user.email}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
