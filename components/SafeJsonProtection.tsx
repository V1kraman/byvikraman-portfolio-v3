"use client";

import { useEffect } from "react";

// Safe JSON.stringify and JSON.parse wrappers executed at module evaluation time
if (typeof window !== "undefined" && typeof JSON !== "undefined") {
  const origStringify = JSON.stringify;
  const origParse = JSON.parse;

  JSON.stringify = function (val: unknown, replacer?: unknown, space?: string | number) {
    try {
      return origStringify(
        val as Parameters<typeof origStringify>[0],
        replacer as Parameters<typeof origStringify>[1],
        space as Parameters<typeof origStringify>[2]
      );
    } catch (e: unknown) {
      const err = e as Error;
      if (
        err &&
        (err.name === "TypeError" || err instanceof TypeError) &&
        String(err.message || "").toLowerCase().includes("circular")
      ) {
        const seen = new WeakSet();
        return origStringify(
          val as Parameters<typeof origStringify>[0],
          function (this: unknown, key: string, v: unknown) {
            if (typeof v === "object" && v !== null) {
              if (typeof Node !== "undefined" && v instanceof Node) {
                if (seen.has(v)) return undefined;
                seen.add(v);
                return {};
              }
              if (seen.has(v)) return undefined;
              seen.add(v);
            }
            if (typeof replacer === "function") {
              return (replacer as (this: unknown, k: string, value: unknown) => unknown).call(this, key, v);
            }
            return v;
          },
          space as Parameters<typeof origStringify>[2]
        );
      }
      throw e;
    }
  };

  JSON.parse = function (text: unknown, reviver?: unknown) {
    if (text === undefined || text === "undefined" || text === null || text === "") {
      return null;
    }
    try {
      return origParse(
        text as string,
        reviver as Parameters<typeof origParse>[1]
      );
    } catch (e: unknown) {
      const err = e as Error;
      if (
        err &&
        (err.name === "SyntaxError" || err instanceof SyntaxError) &&
        String(err.message || "").toLowerCase().includes("undefined")
      ) {
        return null;
      }
      throw e;
    }
  };
}

export function SafeJsonProtection() {
  useEffect(() => {
    const isSuppressed = (message: string) => {
      const lower = message.toLowerCase();
      return lower.includes("circular") || lower.includes("undefined") || lower.includes("json");
    };

    const handleError = (event: ErrorEvent) => {
      const msg = String(event.error?.message || event.message || "");
      if (isSuppressed(msg)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const msg = String(event.reason?.message || event.reason || "");
      if (isSuppressed(msg)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleRejection, true);
    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection, true);
    };
  }, []);

  return null;
}
