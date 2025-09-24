import type { PropsWithChildren } from "react";

export default function BulletPointItem({ children }: PropsWithChildren) {
  return (
    <li className="flex items-start gap-2">
      <div className="h-6 flex flex-col justify-center">
        <div className="inline-block bg-white rounded-full w-1.5 h-1.5 shrink-0" />
      </div>
      {children}
    </li>
  );
}
