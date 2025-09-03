"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share, Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ShareBrainDialogProps {
  onShareCreated?: () => void;
}

export default function ShareBrainDialog({ onShareCreated }: ShareBrainDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Check sharing status when dialog opens
  useEffect(() => {
    if (open) {
      checkSharingStatus();
    }
  }, [open]);

  const checkSharingStatus = async () => {
    setCheckingStatus(true);
    try {
      // Try to create a share link to check if one already exists
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
          const fullLink = `${window.location.origin}${data.link}`;
          setShareLink(fullLink);
          setIsShared(true);
        }
      }
    } catch (error) {
      console.error("Error checking sharing status:", error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleToggleShare = async (enabled: boolean) => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ share: enabled }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (enabled && data.link) {
          // Share enabled - set the link
          const fullLink = `${window.location.origin}${data.link}`;
          setShareLink(fullLink);
          setIsShared(true);
          toast.success("Share link created successfully!");
          onShareCreated?.();
        } else if (!enabled) {
          // Share disabled - clear the link
          setShareLink("");
          setIsShared(false);
          toast.success("Share link removed successfully!");
        }
      } else {
        const error = await response.json();
        toast.error(error.error || `Failed to ${enabled ? 'create' : 'remove'} share link`);
        // Revert the switch state on error
        setIsShared(!enabled);
      }
    } catch (error) {
      console.error(`Error ${enabled ? 'creating' : 'removing'} share link:`, error);
      toast.error(`Failed to ${enabled ? 'create' : 'remove'} share link`);
      // Revert the switch state on error
      setIsShared(!enabled);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2 bg-white text-black hover:bg-gray-100"
        >
          <Share className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Content</DialogTitle>
          <DialogDescription>
            Toggle sharing to create a public link that allows others to view your content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-toggle">{isShared ? 'Disable' : 'Enable'} Public Sharing</Label>
              <div className="text-shadow-sm text-muted-foreground">
                {isShared ? "Your content is publicly accessible" : "Your content is private"}
              </div>
            </div>
            <Switch
              id="share-toggle"
              checked={isShared}
              onCheckedChange={handleToggleShare}
              disabled={loading || checkingStatus}
            />
          </div>

          {/* Loading indicator while checking status */}
          {checkingStatus && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Share Link Section */}
          {isShared && shareLink && !checkingStatus && (
            <div className="space-y-2">
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="share-link"
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  onClick={handleCopyLink} 
                  className="shrink-0"
                  disabled={loading}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Anyone with this link can view your content. Keep it safe!
              </div>
            </div>
          )}

          {/* Loading indicator for toggle actions */}
          {loading && (
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  {isShared ? "Removing share link..." : "Creating share link..."}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="neutral" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
