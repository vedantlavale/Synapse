import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Twitter, Globe, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  showDelete?: boolean;
}

function getYoutubeEmbedUrl(url: string): string {
  console.log("Processing YouTube URL for embed:", url);
  
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
      console.log("Extracted video ID for embed:", videoId);
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  console.log("No video ID found for embed URL:", url);
  return "";
}

export default function ContentCard({ content, onDelete, showDelete = true }: ContentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(content.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderThumbnail = () => {
    if (content.type === "youtube") {
      const embedUrl = getYoutubeEmbedUrl(content.link);
      if (embedUrl) {
        return (
          <div className="relative">
            <iframe
              src={embedUrl}
              title={content.title}
              className="w-full h-48 rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      
      // Fallback for YouTube when embed fails
      return (
        <div className="w-full h-48 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Play className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-700">YouTube Video</p>
            <p className="text-xs text-red-500">Embed unavailable</p>
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
            {showDelete && onDelete && (
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="neutral"
                    size="sm"
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Content</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &ldquo;{content.title}&rdquo;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
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
