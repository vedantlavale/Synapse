"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  Home,
  Search,
  Youtube,
  Twitter,
  Globe,
  Github,
  LogOut,
  X,
} from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ContentCounts, FilterType } from "@/types/content";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  contentCounts: ContentCounts;
  onLogout: () => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  contentCounts,
  onLogout,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64 lg:w-72 xl:w-80" : "w-16"} ${
          isMobile
            ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        } border-r transition-all duration-300 flex flex-col h-full`}
        style={{ backgroundColor: '#7a83ff' }}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Button
              variant="neutral"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {isMobile && sidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
            {sidebarOpen && <h2 className="font-semibold text-sm sm:text-base">Synapse</h2>}
          </div>
        </div>

        {/* Search Bar */}
        {sidebarOpen && (
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2 ">
            <Button
              variant="neutral"
              onClick={() => setSelectedFilter("all")}
              className={`w-full ${
                selectedFilter === "all" ? "bg-white text-black" : "bg-gray-100 text-black hover:bg-white"
              } ${
                sidebarOpen ? "justify-between" : "justify-center"
              }`}
            >
              <div className="flex items-center">
                <Home className="h-4 w-4" />
                {sidebarOpen && <span className=" ml-2">All Content</span>}
              </div>
              {sidebarOpen && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {contentCounts.all}
                </span>
              )}
            </Button>
            <Button
              variant="neutral"
              onClick={() => setSelectedFilter("youtube")}
              className={`w-full ${
                selectedFilter === "youtube" ? "bg-white text-black" : "bg-gray-100 text-black hover:bg-white"
              } ${
                sidebarOpen ? "justify-between" : "justify-center"
              }`}
            >
              <div className="flex items-center">
                <Youtube className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">YouTube</span>}
              </div>
              {sidebarOpen && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {contentCounts.youtube}
                </span>
              )}
            </Button>
            <Button
              variant="neutral"
              onClick={() => setSelectedFilter("twitter")}
              className={`w-full ${
                selectedFilter === "twitter" ? "bg-white text-black" : "bg-gray-100 text-black hover:bg-white"
              } ${
                sidebarOpen ? "justify-between" : "justify-center"
              }`}
            >
              <div className="flex items-center">
                <Twitter className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">Twitter</span>}
              </div>
              {sidebarOpen && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {contentCounts.twitter}
                </span>
              )}
            </Button>
            <Button
              variant="neutral"
              onClick={() => setSelectedFilter("url")}
              className={`w-full ${
                selectedFilter === "url" ? "bg-white text-black" : "bg-gray-100 text-black hover:bg-white"
              } ${
                sidebarOpen ? "justify-between" : "justify-center"
              }`}
            >
              <div className="flex items-center">
                <Globe className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">URL</span>}
              </div>
              {sidebarOpen && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {contentCounts.url}
                </span>
              )}
            </Button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="space-y-2">
            <Button
              variant="neutral"
              className={`w-full bg-white text-black hover:bg-gray-100 ${
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
                  className={`w-full bg-white text-black hover:bg-gray-100 ${
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
                      onClick={onLogout}
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
    </>
  );
}
