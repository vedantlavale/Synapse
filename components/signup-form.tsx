"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    console.log("Validating signup form...", { name, email, password, passwordLength: password.length });
    
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    
    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return false;
    }
    
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
    
    console.log("Signup form validation passed");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
      });
      toast.success("Account created successfully! Please check your email to verify your account before signing in.");
      // Don't redirect immediately since email verification is required
      // Clear the form
      setName("");
      setEmail("");
      setPassword("");
      
      // Optionally redirect to a page that tells them to check email
      setTimeout(() => {
        window.location.href = "/login?message=check-email";
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Sign up failed";
      
      // Check for specific error types and show appropriate toast messages
      if (errorMessage.toLowerCase().includes("email") && errorMessage.toLowerCase().includes("already")) {
        toast.error("An account with this email already exists. Please use a different email or try signing in.");
      } else if (errorMessage.toLowerCase().includes("password")) {
        toast.error("Password doesn't meet requirements. Please choose a stronger password.");
      } else if (errorMessage.toLowerCase().includes("invalid email")) {
        toast.error("Please enter a valid email address.");
      } else if (errorMessage.toLowerCase().includes("name")) {
        toast.error("Please enter a valid name.");
      } else {
        toast.error(errorMessage || "Sign up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

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
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
