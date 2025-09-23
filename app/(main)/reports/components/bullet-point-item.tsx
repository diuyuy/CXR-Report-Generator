import type { PropsWithChildren } from "react";

export default function BulletPointItem({ children }: PropsWithChildren) {
  return (
    <li className="flex items-center gap-2">
      <div className="inline-block bg-white rounded-full w-1.5 h-1.5 flex-shrink-0" />
      {children}
    </li>
  );
}
