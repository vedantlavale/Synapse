"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddContentDialog from "@/components/dialogue/Dialogue";
import ShareBrainDialog from "@/components/dashboard/ShareBrainDialog";

interface NavbarProps {
  onContentAdded?: () => void;
}

function Navbar({ onContentAdded }: NavbarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>

      <div className="flex justify-end gap-2 sm:gap-4 p-2 sm:p-4">
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-white text-black hover:bg-gray-100 text-xs sm:text-sm"
        >
          <PlusIcon />
          Add Content
        </Button>

        <ShareBrainDialog onShareCreated={onContentAdded} />
      </div>

      <AddContentDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onContentAdded={onContentAdded}
      />
    </>
  );
}

export default Navbar;
