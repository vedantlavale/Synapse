"use client";

import { ReactNode } from "react";

// Better-auth React provider is automatically handled by the authClient
// No need for a wrapper component
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
