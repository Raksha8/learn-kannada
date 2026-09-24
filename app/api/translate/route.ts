import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=kn&dt=t&q=${encodeURIComponent(
    text
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: "Translation failed" }, { status: 502 });
  }

  const data = await res.json();
  const translated = data[0]?.map((chunk: unknown[]) => chunk[0]).join("") ?? "";

  return NextResponse.json({ translated });
}
