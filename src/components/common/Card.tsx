import type{ ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-700 bg-slate-900 shadow-lg ${className}`}
    >
      {title && (
        <div className="border-b border-slate-700 px-5 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            {title}
          </h2>
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  );
}

export default Card;