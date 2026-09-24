"use client";

import { useState, type ReactNode } from "react";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="bg-surface rounded-2xl shadow border border-border-color overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h2 className="text-xl font-semibold text-accent">{title}</h2>
        <span className="text-accent text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </section>
  );
}
