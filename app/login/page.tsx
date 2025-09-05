'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import DebugConfig from '@/components/debug-config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

    const validateForm = () => {
    if (!email.trim()) {
      toast("Please enter your email address.");
      return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      toast("Please enter your password.");
      return false;
    }

    if (password.length < 3) {
      toast("Password must be at least 3 characters long.");
      return false;
    }

    if (password.length > 16) {
      toast("Password must be no more than 16 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      console.log("Attempting sign in...", {
        email,
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        environment: process.env.NODE_ENV
      });
      
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
      
      console.log("Sign in result:", result);

      // Check if authentication was successful
      if (result.data && result.data.token) {
        console.log("Authentication successful with token:", result.data.token);
        toast.success("Sign in successful! Redirecting to dashboard...");
        window.location.href = '/dashboard';
      } else if (result.data) {
        console.log("Authentication successful but no token in data:", result.data);
        toast.success("Sign in successful! Redirecting to dashboard...");
        window.location.href = '/dashboard';
      } else {
        console.error("Sign in failed - no data in result:", result);
        toast.error("Sign in failed. Please check your credentials and try again.");
      }
    } catch (err: unknown) {
      console.error("Sign in error:", err);
      const errorMessage = err instanceof Error ? err.message : "Sign in failed";
      
       console.error("Error details:", {
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined,
        name: err instanceof Error ? err.name : undefined
      });
      
    if (errorMessage.toLowerCase().includes("email") && errorMessage.toLowerCase().includes("verif")) {
        toast.error("Please verify your email before signing in. Check your inbox for the verification link.");
      } else if (errorMessage.toLowerCase().includes("forbidden") || errorMessage.toLowerCase().includes("403")) {
        toast.error("Email not verified. Please check your email and click the verification link.");
      } else if (errorMessage.toLowerCase().includes("password")) {
        toast.error("Incorrect password. Please try again.");
      } else if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("user")) {
        toast.error("No account found with this email address.");
      } else if (errorMessage.toLowerCase().includes("invalid credentials")) {
        toast.error("Invalid email or password. Please check and try again.");
      } else if (errorMessage.toLowerCase().includes("too many")) {
        toast.error("Too many login attempts. Please try again later.");
      } else if (errorMessage.toLowerCase().includes("network") || errorMessage.toLowerCase().includes("fetch")) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error(errorMessage || "Sign in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF6B6B] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 sm:gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="bg-black rounded-lg"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-3 sm:mb-4 transform -rotate-2 font-synapse">
            SYNAPSE
          </h1>
          <p className="text-lg sm:text-xl font-bold text-black">
            SIGN IN TO YOUR BRAIN
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#4ECDC4] border-4 sm:border-6 md:border-8 border-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] p-4 sm:p-6 md:p-8 transform rotate-1">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            {/* Email Input */}
            <div>
              <label className="block text-lg sm:text-xl font-black text-black mb-2 transform -rotate-1">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 sm:p-4 text-lg sm:text-xl font-bold bg-[#FFE66D] border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] focus:shadow-[4px_4px_0px_0px_#000] sm:focus:shadow-[6px_6px_0px_0px_#000] focus:outline-none transform -rotate-1"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-lg sm:text-xl font-black text-black mb-2 transform rotate-1">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 sm:p-4 text-lg sm:text-xl font-bold bg-[#FFE66D] border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] focus:shadow-[4px_4px_0px_0px_#000] sm:focus:shadow-[6px_6px_0px_0px_#000] focus:outline-none transform rotate-1"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#95E1D3] hover:bg-[#7DD3C0] border-4 sm:border-6 border-black p-3 sm:p-4 text-lg sm:text-xl md:text-2xl font-black text-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-black font-bold text-sm sm:text-base">
              DON&rsquo;T HAVE AN ACCOUNT?{' '}
              <a
                href="/signup"
                className="underline decoration-3 sm:decoration-4 underline-offset-4 hover:decoration-6 sm:hover:decoration-8 transition-all"
              >
                SIGN UP
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden sm:block absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-12 sm:w-16 h-12 sm:h-16 bg-[#FFE66D] border-3 sm:border-4 border-black transform rotate-45"></div>
        <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 bg-[#95E1D3] border-3 sm:border-4 border-black rounded-full"></div>
        <div className="hidden md:block absolute top-1/2 -left-6 sm:-left-8 w-6 sm:w-8 h-16 sm:h-20 md:h-24 bg-[#FF6B6B] border-3 sm:border-4 border-black transform -rotate-12"></div>
      </div>
      
      {/* Debug component - only shows in development or when NEXT_PUBLIC_DEBUG=true */}
      <DebugConfig />
    </div>
  );
}
