import { cn } from "@/lib/utils";
import React from "react";

export function GridBackgroundDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-black">
      {/* Slightly darker white grid lines */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
        )}
      />

      {/* Radial spotlight mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Gradient Text */}
      <div className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
        {children}
      </div>
    </div>
  );
}
