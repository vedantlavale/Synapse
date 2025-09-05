"use client";

import { useEffect, useState } from "react";

export default function DebugConfig() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // Only show debug info in development or if explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG === 'true') {
      setConfig({
        environment: process.env.NODE_ENV,
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'N/A',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'N/A',
        cookies: typeof document !== 'undefined' ? document.cookie : 'N/A'
      });
    }
  }, []);

  if (!config) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Config</h3>
      <pre className="whitespace-pre-wrap overflow-auto max-h-40">
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}
