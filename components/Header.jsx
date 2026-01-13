"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import CTASheet from "./CTASheet";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled ? "bg-black/95 shadow-lg backdrop-blur" : "bg-black"}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo klik ke halaman awal */}
            <div className="cursor-pointer" onClick={() => (window.location.href = "/")}>
              <Logo />
            </div>

            {/* Tombol CTA memunculkan CTASheet */}
            <button
              onClick={() => setOpen(true)}
              className="bg-gold text-black font-semibold px-5 py-2.5 rounded-full
                hover:brightness-110 transition-transform"
            >
              Buat Halaman Sekarang
            </button>
          </div>
        </div>
      </header>

      {/* CTA Bottom Sheet */}
      <CTASheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
