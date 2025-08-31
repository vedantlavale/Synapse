"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon, Send } from "lucide-react";
import AddContentDialog from "@/components/dialogue/Dialogue";

interface NavbarProps {
  onContentAdded?: () => void;
}

function Navbar({ onContentAdded }: NavbarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-end p-4 gap-4 px-4 ">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusIcon />
          Add Content
        </Button>

        <Button>
          <Send />
          Share Brain
        </Button>
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
