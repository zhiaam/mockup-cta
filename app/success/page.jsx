"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl border p-6 text-center space-y-5">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />

        <h1 className="text-xl font-bold text-primary">
          Pembayaran Berhasil 🎉
        </h1>

        <p className="text-sm text-gray-600">
          Terima kasih! Pembayaran kamu telah kami terima.
          Template website siap digunakan.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
          Link download & panduan akan dikirim ke email kamu.
        </div>

        <Link
          href="/"
          className="block w-full bg-gold text-black font-semibold py-3 rounded-xl
          hover:scale-105 transition-transform"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
