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
    <div className="min-h-screen w-full bg-white relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Your Content/Components */}
      <div className="h-screen bg-transparent flex relative overflow-hidden z-10">
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
        <header className="h-17 sm:h-17 md:h-17 border-b flex items-center justify-between pl-0 pr-2 sm:pr-4 flex-shrink-0" style={{ backgroundColor: '#7a83ff' }}>
          <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-4">
            {isMobile && (
              <Button
                variant="neutral"
                size="sm"
                className="md:hidden bg-white text-black hover:bg-gray-100"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">Synapse</h1>
            {searchQuery && (
              <span className="hidden sm:inline-block text-xs sm:text-sm text-white bg-white/20 px-2 py-1 rounded">
                {filteredContents.length} result{filteredContents.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
            )}
          </div>
          <div className="hidden sm:block">
            <Navbar onContentAdded={fetchContent} />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
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
        <div className="sm:hidden border-t flex-shrink-0" style={{ backgroundColor: '#7a83ff' }}>
          <div className="p-2">
            <Navbar onContentAdded={fetchContent} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
