import Header from "@/components/Header";   // ← Your existing Header
import { Hero } from "@/components/Hero";     // ← Your Hero component

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* HEADER — ALWAYS VISIBLE */}
      <Header />

      {/* HERO — WITH TOP PADDING */}
      <main className="pt-24"> {/* Prevents overlap */}
        <Hero />
      </main>
    </div>
  );
}