"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const handleCreateShare = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
      });

      if (response.ok) {
        const data = await response.json();
        const fullLink = `${window.location.origin}/brain/share/${data.shareLink}`;
        setShareLink(fullLink);
        toast.success("Share link created successfully!");
        onShareCreated?.();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create share link");
      }
    } catch (error) {
      console.error("Error creating share link:", error);
      toast.error("Failed to create share link");
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
    setShareLink("");
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
            Create a public link to share your content with others. Anyone
            with the link will be able to view your content.
          </DialogDescription>
        </DialogHeader>

        {!shareLink ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Click the button below to generate a shareable link for your
              content.
            </div>
            <Button
              onClick={handleCreateShare}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Share Link...
                </>
              ) : (
                <>
                  <Share className="mr-2 h-4 w-4" />
                  Create Share Link
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="share-link"
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button size="sm" onClick={handleCopyLink} className="shrink-0">
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              This link allows anyone to view your content. Keep it safe!
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="neutral" onClick={handleClose}>
            {shareLink ? "Close" : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
