import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <main className="pb-24 md:pb-0">
      {/* Spacer untuk sticky header */}
      <div className="h-[72px]" />

      {/* HERO – CTA utama */}
      <Hero />

      {/* PRICING – konversi */}
      <PricingSection />

      {/* STICKY CTA – mobile only */}
      <StickyCTA />
    </main>
  );
}
