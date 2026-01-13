"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CTASheet from "./CTASheet";

const plans = [
  {
    name: "Basic",
    price: "149.000",
    description: "Cocok untuk personal / UMKM kecil",
    features: [
      "1 halaman website",
      "Desain modern & responsif",
      "Gratis hosting 1 bulan",
      "Siap online",
    ],
  },
  {
    name: "Pro",
    price: "299.000",
    highlight: true,
    description: "Paling populer untuk bisnis",
    features: [
      "Hingga 5 halaman",
      "Custom warna & konten",
      "Gratis hosting 3 bulan",
      "Bantuan setup",
    ],
  },
  {
    name: "Business",
    price: "499.000",
    description: "Untuk brand & bisnis serius",
    features: [
      "Halaman unlimited",
      "Custom penuh",
      "Gratis hosting 6 bulan",
      "Prioritas support",
    ],
  },
];

const PricingSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
              Pilih Template yang Sesuai
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Sekali bayar, langsung pakai. Tanpa langganan, tanpa ribet.
            </p>
          </div>

          <div className="grid gap-6 max-w-xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border p-6 space-y-4 bg-white
                  ${plan.highlight ? "border-accent shadow-lg" : "border-gray-200"}
                `}
              >
                {plan.highlight && (
                  <span className="inline-block text-xs font-semibold bg-accent/20
                    text-accent px-3 py-1 rounded-full">
                    Paling Populer
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-primary">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {plan.description}
                  </p>
                </div>

                <div className="text-3xl font-extrabold text-primary">
                  Rp{plan.price}
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>

                <button
                  onClick={() => setOpen(true)}
                  className={`w-full py-3 rounded-xl font-semibold
                    ${
                      plan.highlight
                        ? "bg-gold text-black hover:scale-105"
                        : "bg-primary text-white hover:opacity-90"
                    }
                    transition`}
                >
                  Pilih Paket
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default PricingSection;
