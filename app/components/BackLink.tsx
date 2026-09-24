import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1 text-accent hover:text-accent-hover mb-4"
    >
      ← Back
    </Link>
  );
}
