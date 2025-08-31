"use client"

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Share, Trash2, Globe } from "lucide-react";
import { toast } from "sonner";

interface ShareBrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShareBrainDialog({ open, onOpenChange }: ShareBrainDialogProps) {
  const [shareLink, setShareLink] = useState<string>("");
  const [isShared, setIsShared] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Check current sharing status when dialog opens
  useEffect(() => {
    if (open) {
      checkSharingStatus();
    }
  }, [open]);

  const checkSharingStatus = async () => {
    try {
      // Since there's no GET endpoint, we can try to create a share and see if one already exists
      const response = await fetch("/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ share: true }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.link) {
          setShareLink(`${window.location.origin}${data.link}`);
          setIsShared(true);
        }
      }
    } catch (error) {
      console.error("Error checking sharing status:", error);
    }
  };

  const handleCreateShare = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ share: true }),
      });

      if (response.ok) {
        const data = await response.json();
        setShareLink(`${window.location.origin}${data.link}`);
        setIsShared(true);
        toast.success("Share link created successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create share link");
      }
    } catch (error) {
      console.error("Error creating share link:", error);
      toast.error("Failed to create share link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveShare = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ share: false }),
      });

      if (response.ok) {
        setShareLink("");
        setIsShared(false);
        toast.success("Share link removed successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to remove share link");
      }
    } catch (error) {
      console.error("Error removing share link:", error);
      toast.error("Failed to remove share link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleOpenLink = () => {
    window.open(shareLink, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Share Your Brain
          </DialogTitle>
          <DialogDescription>
            {isShared 
              ? "Your brain is public. Anyone with this link can view your content."
              : "Make your brain public so others can view your content collection."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isShared ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="share-link">Public Link</Label>
                <div className="flex space-x-2">
                  <Input
                    id="share-link"
                    value={shareLink}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopyLink}
                    className="shrink-0"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleOpenLink}
                    className="shrink-0"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700 font-medium">
                    Your brain is public
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveShare}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mb-4">
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Share className="h-6 w-6 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Your brain is currently private
                </p>
              </div>
              <Button 
                onClick={handleCreateShare} 
                disabled={isLoading}
                className="w-full"
              >
                <Share className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "Create Public Link"}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
