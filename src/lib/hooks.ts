"use client";

import { useSyncExternalStore } from "react";

/**
 * Server-safe media query hook (uses useSyncExternalStore).
 * Returns `false` during SSR — decorating effects (which are all skipped
 * under reduced motion anyway) gate themselves on it post-hydration.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * True only after hydration. Lets components safely read browser-only
 * values (navigator.*, window.*) without breaking SSR/hydration equality.
 * Canonical pattern: empty subscription, snapshot flips after hydration and
 * React re-renders once on its own.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** prefers-reduced-motion snapshot. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

function readDeviceCapability(): boolean {
  const { deviceMemory, hardwareConcurrency } = navigator as Navigator & {
    deviceMemory?: number;
  };
  if (typeof deviceMemory === "number" && deviceMemory < 4) return false;
  if (typeof hardwareConcurrency === "number" && hardwareConcurrency <= 2)
    return false;
  return true;
}

/** Whether this device is likely able to run the WebGL hero scene. */
export function useCapableDevice(): boolean {
  const hydrated = useIsHydrated();
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!hydrated || prefersReducedMotion) return false;
  return readDeviceCapability();
}