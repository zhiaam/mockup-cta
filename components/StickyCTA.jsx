"use client";

import { useState } from "react";
import CTASheet from "./CTASheet";

const StickyCTA = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sticky CTA – hanya tampil di mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-accent text-primary font-semibold py-3 rounded-xl
          hover:scale-105 transition-transform"
        >
          Gunakan Template Sekarang
        </button>
      </div>

      {/* CTA Sheet */}
      <CTASheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default StickyCTA;
