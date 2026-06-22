import "../global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

/**
 * Root layout — wraps the entire app with:
 * - TanStack React Query provider
 * - Global CSS (NativeWind)
 * - Status bar configuration
 */
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Slot />
    </QueryClientProvider>
  );
}
