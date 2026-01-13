import { DM_Sans, Barlow } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

/* =========================
   SEO METADATA (OPTIMIZED)
========================= */
export const metadata = {
  metadataBase: new URL("https://bennygroup.co.id"),
  title: {
    default: "Template Website Profesional | PT. Benny Group",
    template: "%s | PT. Benny Group",
  },
  description:
    "Template website profesional langsung jadi untuk UMKM, personal brand, dan bisnis. Sekali bayar, tanpa langganan.",
  keywords: [
    "Template Website",
    "Website UMKM",
    "Website Profesional",
    "PT Benny Group",
    "Jasa Website Indonesia",
  ],
  openGraph: {
    title: "Template Website Profesional – PT. Benny Group",
    description:
      "Website profesional siap pakai. Tinggal edit konten, langsung online.",
    url: "https://bennygroup.co.id",
    siteName: "PT. Benny Group",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Template Website PT. Benny Group",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Template Website Profesional – PT. Benny Group",
    description:
      "Website profesional siap pakai untuk UMKM & bisnis.",
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${barlow.variable} antialiased`}>
        <Header />

        {/* LYNK / SCALEV WRAPPER */}
        <div className="flex justify-center px-3 my-6">
          <div className="premium-wrapper">
            {children}
          </div>
        </div>

        <Footer />

        {/* STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT. Benny Group",
              url: "https://bennygroup.co.id",
              logo: "https://bennygroup.co.id/assets/logo.png",
            }),
          }}
        />
      </body>
    </html>
  );
}
