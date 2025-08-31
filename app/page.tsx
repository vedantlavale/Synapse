import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#4ECDC4] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 sm:gap-4 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="bg-black transform rotate-12"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black mb-6 sm:mb-8 transform -rotate-2">
          SYNAPSE
        </h1>
        
        {/* Subtitle */}
        <div className="bg-[#FFE66D] border-4 sm:border-6 md:border-8 border-black shadow-[8px_8px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 transform rotate-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black mb-3 sm:mb-4">
            YOUR DIGITAL BRAIN
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black max-w-2xl mx-auto leading-relaxed">
            Store, organize, and share your knowledge with the world. 
            Build your knowledge network with Synapse.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
          <Link 
            href="/login"
            className="w-full sm:w-auto bg-[#FF6B6B] hover:bg-[#FF5252] border-4 sm:border-6 border-black px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-black text-white shadow-[6px_6px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] sm:hover:shadow-[12px_12px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100"
          >
            SIGN IN
          </Link>
          
          <Link 
            href="/signup"
            className="w-full sm:w-auto bg-[#95E1D3] hover:bg-[#7DD3C0] border-4 sm:border-6 border-black px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-black text-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] sm:hover:shadow-[12px_12px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100"
          >
            JOIN NOW
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          <div className="bg-[#FF8FB1] border-4 sm:border-6 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] p-4 sm:p-6 transform -rotate-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-2 sm:mb-3">STORE</h3>
            <p className="text-sm sm:text-base font-bold text-black">Save links, articles, and ideas</p>
          </div>
          
          <div className="bg-[#A8E6CF] border-4 sm:border-6 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] p-4 sm:p-6 transform rotate-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-2 sm:mb-3">ORGANIZE</h3>
            <p className="text-sm sm:text-base font-bold text-black">Tag and categorize your content</p>
          </div>
          
          <div className="bg-[#FFE66D] border-4 sm:border-6 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] p-4 sm:p-6 transform -rotate-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-2 sm:mb-3">SHARE</h3>
            <p className="text-sm sm:text-base font-bold text-black">Create shareable brain links</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden sm:block absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-[#FF6B6B] border-4 sm:border-6 border-black transform rotate-45"></div>
        <div className="hidden sm:block absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-[#95E1D3] border-4 sm:border-6 border-black rounded-full"></div>
        <div className="hidden md:block absolute top-1/4 -left-8 sm:-left-12 w-12 sm:w-16 h-24 sm:h-32 md:h-40 bg-[#FFE66D] border-4 sm:border-6 border-black transform -rotate-12"></div>
      </div>
    </div>
  );
}
