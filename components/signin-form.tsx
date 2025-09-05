"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    console.log("Validating form...", { email, password, passwordLength: password.length });
    
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    
    if (password.length < 3) {
      toast.error("Password must be at least 3 characters long");
      return false;
    }
    if (password.length > 16) {
      toast.error("Password can be at most 16 characters long");
      return false;
    }
    
    console.log("Form validation passed");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      console.log("Attempting sign in...", {
        email,
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        environment: process.env.NODE_ENV
      });
      
      const result = await authClient.signIn.email({
        email,
        password,
      });
      
      console.log("Sign in result:", result);
      
      if (result.data) {
        toast.success("Sign in successful! Redirecting...");
        router.push("/dashboard");
      } else {
        console.error("Sign in failed - no data in result:", result);
        toast.error("Sign in failed. Please check your credentials and try again.");
      }
    } catch (err: unknown) {
      console.error("Sign in error:", err);
      const errorMessage = err instanceof Error ? err.message : "Sign in failed";
      
      // Enhanced error logging for debugging
      console.error("Error details:", {
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined,
        name: err instanceof Error ? err.name : undefined
      });
      
      // Check for specific error types and show appropriate toast messages
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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      
      {/* Debug button to test toast */}
      <button
        type="button"
        onClick={() => toast.error("Test toast message")}
        className="w-full bg-gray-600 text-white py-1 px-4 rounded-md hover:bg-gray-700 text-sm"
      >
        Test Toast
      </button>
    </form>
  );
}
