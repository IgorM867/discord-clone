"use client";
import Image from "next/image";

export default function error() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 h-screen ">
      <Image src="/logos/full_logo_white.svg" alt="Discord Logo" width={400} height={75} />
      <p className="text-2xl text-d-white">Something went wrong! Please refresh.</p>
    </main>
  );
}
