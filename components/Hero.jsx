"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CTASheet from "./CTASheet";

const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-b from-primary to-[#5a5100] text-white">
        <div className="px-6 py-16 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl text-white font-extrabold leading-tight"
          >
            Website Profesional <br />
            <span className="text-gold">Langsung Jadi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-white/70"
          >
            Template website premium untuk UMKM & bisnis.  
            Tinggal edit, langsung online.
          </motion.p>

          <div className="text-xs text-white/50">
            Sekali bayar • Tanpa langganan • Siap online
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 pt-2"
          >
            <button
              onClick={() => setOpen(true)}
              aria-label="Gunakan template sekarang"
              className="bg-gold text-black font-semibold py-3 rounded-xl
              hover:brightness-110 transition"
            >
              Gunakan Template Sekarang
            </button>

            <a
              href="#preview"
              className="text-xs underline text-white/60 hover:text-white"
            >
              Lihat Contoh Website
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Bottom Sheet */}
      <CTASheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Hero;
