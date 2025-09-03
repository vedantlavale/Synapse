"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check URL parameters to see if verification was successful
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const verified = searchParams.get('verified');

    if (success === 'true' || verified === 'true') {
      setStatus('success');
      setMessage('Email verified successfully! You can now sign in.');

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else if (error) {
      setStatus('error');
      if (error === 'expired') {
        setMessage('Verification link has expired. Please request a new one.');
      } else if (error === 'invalid') {
        setMessage('Invalid verification link. Please check your email for the correct link.');
      } else {
        setMessage(`Verification failed: ${decodeURIComponent(error)}`);
      }
    } else {
      // No success or error parameter, show generic success message
      // This handles the case where user lands on this page after clicking verification link
      setStatus('success');
      setMessage('Email verification completed! You can now sign in.');

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>

          {status === 'loading' && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="mt-4">
              <div className="text-green-600 text-4xl mb-2">✓</div>
              <p className="text-sm text-gray-600">{message}</p>
              <p className="text-xs text-gray-500 mt-2">Redirecting to login page...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4">
              <div className="text-red-600 text-4xl mb-2">✗</div>
              <p className="text-sm text-gray-600">{message}</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-4 text-indigo-600 hover:text-indigo-500 text-sm"
              >
                Go back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
