'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.data) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#95E1D3] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="bg-black transform rotate-45"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-3 sm:mb-4 transform rotate-2">
            JOIN
          </h1>
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-3 sm:mb-4 transform -rotate-1 font-synapse">
            SYNAPSE
          </h2>
          <p className="text-lg sm:text-xl font-bold text-black">
            CREATE YOUR BRAIN ACCOUNT
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-[#FFE66D] border-4 sm:border-6 md:border-8 border-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] p-4 sm:p-6 md:p-8 transform -rotate-1">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-lg sm:text-xl font-black text-black mb-2 transform rotate-1">
                NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 sm:p-4 text-lg sm:text-xl font-bold bg-[#4ECDC4] border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] focus:shadow-[4px_4px_0px_0px_#000] sm:focus:shadow-[6px_6px_0px_0px_#000] focus:outline-none transform rotate-1"
                placeholder="Your Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-lg sm:text-xl font-black text-black mb-2 transform -rotate-1">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 sm:p-4 text-lg sm:text-xl font-bold bg-[#4ECDC4] border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] focus:shadow-[4px_4px_0px_0px_#000] sm:focus:shadow-[6px_6px_0px_0px_#000] focus:outline-none transform -rotate-1"
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
                className="w-full p-3 sm:p-4 text-lg sm:text-xl font-bold bg-[#4ECDC4] border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] focus:shadow-[4px_4px_0px_0px_#000] sm:focus:shadow-[6px_6px_0px_0px_#000] focus:outline-none transform rotate-1"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#FF6B6B] border-3 sm:border-4 border-black p-3 sm:p-4 transform rotate-2">
                <p className="text-black font-bold text-center text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] border-4 sm:border-6 border-black p-3 sm:p-4 text-lg sm:text-xl md:text-2xl font-black text-white shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-black font-bold text-sm sm:text-base">
              ALREADY HAVE AN ACCOUNT?{' '}
              <a
                href="/login"
                className="underline decoration-3 sm:decoration-4 underline-offset-4 hover:decoration-6 sm:hover:decoration-8 transition-all"
              >
                SIGN IN
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden sm:block absolute -top-3 sm:-top-6 -left-3 sm:-left-6 w-16 sm:w-20 h-16 sm:h-20 bg-[#FF6B6B] border-3 sm:border-4 border-black transform rotate-12"></div>
        <div className="hidden sm:block absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-12 sm:w-16 h-12 sm:h-16 bg-[#4ECDC4] border-3 sm:border-4 border-black"></div>
        <div className="hidden md:block absolute top-1/3 -right-6 sm:-right-8 w-8 sm:w-12 h-20 sm:h-24 md:h-32 bg-[#95E1D3] border-3 sm:border-4 border-black transform rotate-45"></div>
      </div>
    </div>
  );
}
