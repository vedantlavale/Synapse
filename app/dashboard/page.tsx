"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  Search,
  Settings,
  User,
  LogOut,
  Star,
  Github,
  X,
  Youtube,
  Twitter,
  Globe,
} from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import ContentCard from "@/components/content-card";
import { authClient } from "@/lib/auth-client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

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


export default function Page() {
  const router = useRouter();

  const logoutOnClick = () => {
    // Handle the actual logout logic
    try {
      authClient.signOut();
      // Use Next.js router for proper navigation
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
      } else {
        alert("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="h-screen bg-background flex relative overflow-hidden">
      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} ${
          isMobile
            ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        } bg-muted border-r transition-all duration-300 flex flex-col h-full`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Button
              variant="neutral"
              size="sm"
              className="bg-[#ffbf00]"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {isMobile && sidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
            {sidebarOpen && <h2 className="font-semibold">My Brain</h2>}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2 ">
            <Button
              variant="neutral"
              className={`w-full bg-[#ffbf00] ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Home className="h-4 w-4" />
              {sidebarOpen && <span className=" ml-2">Home</span>}
            </Button>
            <Button
              variant="neutral"
              className={`w-full  bg-[#ffbf00] ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Search className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Search</span>}
            </Button>
            <Button
              variant="neutral"
              className={`w-full  bg-[#ffbf00] ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Youtube className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">YouTube</span>}
            </Button>
            <Button
              variant="neutral"
              className={`w-full bg-[#ffbf00] ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Twitter className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Twitter</span>}
            </Button>
            <Button
              variant="neutral"
              className={`w-full bg-[#ffbf00] ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Globe className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">URL</span>}
            </Button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="space-y-2">
            <Button
              variant="neutral"
              className={`w-full bg-[#ffbf00] ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Github className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Star on github</span>}
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="neutral"
                  className={`w-full bg-[#ffbf00] ${
                    sidebarOpen ? "justify-start" : "justify-center"
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  {sidebarOpen && <span className="ml-2">Logout</span>}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-[300px]">
                  <DrawerHeader>
                    <DrawerTitle>Are you sure you want to log out?</DrawerTitle>
                    <DrawerDescription>You will be redirected to the login page.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="noShadow"
                      onClick={logoutOnClick}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Logout
                    </Button>
                    <DrawerClose asChild>
                      <Button
                        className="bg-secondary-background text-foreground"
                        variant="noShadow"
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col h-full ${
          isMobile && sidebarOpen ? "blur-sm" : ""
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button
                variant="neutral"
                size="sm"
                className="bg-[#ffbf00] md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-xl md:text-2xl font-bold">My Brain App</h1>
          </div>
          <div className="hidden sm:block">
            <Navbar onContentAdded={fetchContent} />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-2 md:p-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted rounded-lg border animate-pulse"
                ></div>
              ))}
            </div>
          ) : contents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {contents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No content added yet</p>
              <p className="text-gray-400">
                Click "Add Content" to get started!
              </p>
            </div>
          )}
        </main>

        {/* Mobile Navbar */}
        <div className="sm:hidden bg-background border-t p-2 flex-shrink-0">
          <Navbar onContentAdded={fetchContent} />
        </div>
      </div>
    </div>
  );
}
