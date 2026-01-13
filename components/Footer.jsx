"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary to-[#5a5100] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* KIRI: Kontak & Sosial Media */}
          <div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wide text-white">
              Kontak
            </h4>
            <p className="text-white/80 leading-relaxed mb-6">
              PT. Benny Group berkomitmen membangun hubungan jangka panjang melalui
              komunikasi terbuka dan profesional.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, url: "https://facebook.com" },
                { icon: <FaInstagram />, url: "https://instagram.com" },
                { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                  border border-white/40 text-white
                  hover:bg-accent hover:scale-110 
                  transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* TENGAH: Informasi Kontak */}
          <div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wide text-white">
              Informasi
            </h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>Email: info@bennygroup.co.id</li>
              <li>Telepon: +62 21 1234 5678</li>
              <li>Fax: +62 21 1234 5679</li>
              <li>Alamat: Jl. Contoh Raya No. 123, Jakarta, Indonesia</li>
            </ul>
          </div>

          {/* KANAN: Form Berlangganan */}
          <div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wide text-white">
              Berlangganan
            </h4>
            <p className="text-white/80 text-sm mb-6">
              Dapatkan informasi terbaru seputar layanan dan perkembangan
              Benny Group.
            </p>

            {/* Glow wrapper */}
            <div className="relative p-1 rounded-lg group">
              <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

              <form className="relative flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="flex-1 px-4 py-3 bg-transparent border border-white/25 
                  text-white placeholder-white/60 rounded-md 
                  focus:outline-none focus:border-white 
                  transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 border border-white/25 text-white font-semibold rounded-md
                  hover:bg-white hover:text-primary 
                  transition-all duration-300
                  shadow-[0_0_0_rgba(255,255,255,0)] 
                  hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/20 mt-14 pt-6 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} PT. Benny Group. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
