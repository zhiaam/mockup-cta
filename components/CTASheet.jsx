"use client";

import Sheet from "./ui/Sheet";

const CTASheet = ({ open, onClose }) => {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="space-y-6 text-center bg-cream p-6 rounded-2xl">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-black">
          Template Website Langsung Jadi
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed">
          Website profesional siap pakai untuk UMKM, personal brand, dan bisnis.
          Tanpa ribet teknis, tinggal pakai.
        </p>

        {/* Pricing Card */}
        <div className="border rounded-2xl p-4 space-y-1 bg-white shadow-custom">
          <p className="text-xs text-gray-500">Mulai dari</p>
          <p className="text-3xl font-extrabold text-gold">
            Rp149.000
          </p>
          <p className="text-xs text-gray-500">
            Sekali bayar • Tanpa langganan
          </p>
        </div>

        {/* Primary CTA */}
        <button
          className="w-full bg-gold text-white font-semibold py-3 rounded-xl
          hover:scale-105 transition-transform"
          onClick={() => {
            window.location.href = "/payment";
          }}
        >
          Lanjut ke Pembayaran
        </button>

        {/* Secondary */}
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:text-gray-700"
        >
          Nanti dulu
        </button>

        {/* Trust note */}
        <p className="text-[11px] text-gray-500">
          Pembayaran aman • Akses selamanya
        </p>
      </div>
    </Sheet>
  );
};

export default CTASheet;
