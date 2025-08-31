import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#4ECDC4] p-4 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 gap-4 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="bg-black transform rotate-12"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-8xl md:text-9xl font-black text-black mb-8 transform -rotate-2">
          BRAINLY
        </h1>
        
        {/* Subtitle */}
        <div className="bg-[#FFE66D] border-8 border-black shadow-[12px_12px_0px_0px_#000] p-8 mb-8 transform rotate-1">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            YOUR DIGITAL BRAIN
          </h2>
          <p className="text-xl font-bold text-black max-w-2xl mx-auto">
            Store, organize, and share your knowledge with the world. 
            Build your second brain with powerful APIs.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link 
            href="/login"
            className="bg-[#FF6B6B] hover:bg-[#FF5252] border-6 border-black px-8 py-4 text-2xl font-black text-white shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100"
          >
            SIGN IN
          </Link>
          
          <Link 
            href="/signup"
            className="bg-[#95E1D3] hover:bg-[#7DD3C0] border-6 border-black px-8 py-4 text-2xl font-black text-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100"
          >
            JOIN NOW
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FF8FB1] border-6 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform -rotate-1">
            <h3 className="text-2xl font-black text-black mb-3">STORE</h3>
            <p className="font-bold text-black">Save links, articles, and ideas</p>
          </div>
          
          <div className="bg-[#A8E6CF] border-6 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform rotate-1">
            <h3 className="text-2xl font-black text-black mb-3">ORGANIZE</h3>
            <p className="font-bold text-black">Tag and categorize your content</p>
          </div>
          
          <div className="bg-[#FFE66D] border-6 border-black shadow-[6px_6px_0px_0px_#000] p-6 transform -rotate-1">
            <h3 className="text-2xl font-black text-black mb-3">SHARE</h3>
            <p className="font-bold text-black">Create shareable brain links</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#FF6B6B] border-6 border-black transform rotate-45"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[#95E1D3] border-6 border-black rounded-full"></div>
        <div className="absolute top-1/4 -left-12 w-16 h-40 bg-[#FFE66D] border-6 border-black transform -rotate-12"></div>
      </div>
    </div>
  );
}
