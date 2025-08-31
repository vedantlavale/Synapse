"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import ContentGrid from "@/components/dashboard/ContentGrid";
import { authClient } from "@/lib/auth-client";
import { useDashboard } from "@/hooks/use-dashboard";
import { useResponsive } from "@/hooks/use-responsive";

export default function Page() {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen, isMobile } = useResponsive();
  const {
    contents,
    filteredContents,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    loading,
    fetchContent,
    handleDeleteContent,
    contentCounts,
  } = useDashboard();

  const logoutOnClick = () => {
    try {
      authClient.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="h-screen bg-background flex relative overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        contentCounts={contentCounts}
        onLogout={logoutOnClick}
      />

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
            {searchQuery && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {filteredContents.length} result{filteredContents.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
            )}
          </div>
          <div className="hidden sm:block">
            <Navbar onContentAdded={fetchContent} />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-2 md:p-4">
          <ContentGrid
            loading={loading}
            filteredContents={filteredContents}
            contents={contents}
            selectedFilter={selectedFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedFilter={setSelectedFilter}
            onDeleteContent={handleDeleteContent}
          />
        </main>

        {/* Mobile Navbar */}
        <div className="sm:hidden bg-background border-t p-2 flex-shrink-0">
          <Navbar onContentAdded={fetchContent} />
        </div>
      </div>
    </div>
  );
}
