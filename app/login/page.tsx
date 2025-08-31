'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.data) {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
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
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                required
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
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#FF6B6B] border-3 sm:border-4 border-black p-3 sm:p-4 transform -rotate-1">
                <p className="text-black font-bold text-center text-sm sm:text-base">{error}</p>
              </div>
            )}

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
    </div>
  );
}
