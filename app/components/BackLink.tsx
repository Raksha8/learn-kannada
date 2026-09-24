import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 mb-4"
    >
      ← Back
    </Link>
  );
}
