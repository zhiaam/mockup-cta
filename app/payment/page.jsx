"use client";

import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD SNAP SCRIPT
  ========================= */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  /* =========================
     PRICE CONFIG
  ========================= */
  const PRICES = {
    basic: 149000,
    pro: 299000,
    business: 499000,
  };

  /* =========================
     PROMO LOGIC
  ========================= */
  const applyPromo = () => {
    setPromoError("");
    setDiscount(0);

    if (!promo) return;

    if (promo === "PROMO10") {
      setDiscount(PRICES[selectedPlan] * 0.1);
    } else if (promo === "PROMO50K") {
      setDiscount(50000);
    } else {
      setPromoError("Kode promo tidak valid");
    }
  };

  const total = Math.max(PRICES[selectedPlan] - discount, 0);

  /* =========================
     HANDLE PAYMENT
  ========================= */
  const handlePayment = async () => {
    if (!email) {
      alert("Email wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/midtrans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          email,
          promo,
        }),
      });

      const data = await res.json();

      if (!data.token) {
        alert("Gagal memulai pembayaran");
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: () => (window.location.href = "/success"),
        onPending: () => alert("Menunggu pembayaran..."),
        onError: () => alert("Pembayaran gagal"),
      });
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-cream text-primary">
      {/* Header */}
      <div className="border-b border-black/5 bg-white">
        <div className="px-6 py-4">
          <h1 className="text-lg font-bold text-primary">
            Checkout Template Website
          </h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Produk */}
        <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-2 shadow-sm">
          <h2 className="font-semibold text-primary">
            Template Website Langsung Jadi
          </h2>
          <p className="text-sm text-secondary">
            Website profesional siap pakai untuk UMKM & bisnis online.
          </p>
        </div>

        {/* Paket */}
        <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-4 shadow-sm">
          <h3 className="font-semibold text-sm text-primary">
            Pilih Paket
          </h3>

          {[
            { id: "basic", label: "Basic" },
            { id: "pro", label: "Pro" },
            { id: "business", label: "Business" },
          ].map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                setSelectedPlan(plan.id);
                setDiscount(0);
                setPromo("");
                setPromoError("");
              }}
              className={`w-full flex justify-between px-4 py-3 rounded-xl border transition
                ${
                  selectedPlan === plan.id
                    ? "border-gold bg-gold/10"
                    : "border-black/10 hover:border-gold/50"
                }
              `}
            >
              <span className="font-medium text-primary">{plan.label}</span>
              <span className="font-semibold text-primary">
                Rp{PRICES[plan.id].toLocaleString("id-ID")}
              </span>
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-2 shadow-sm">
          <label className="text-sm font-medium text-primary">
            Email pengiriman template
          </label>
          <input
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
          <p className="text-xs text-secondary">
            Link template akan dikirim ke email ini
          </p>
        </div>

        {/* Promo */}
        <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-2 shadow-sm">
          <label className="text-sm font-medium text-primary">
            Kode Promo (opsional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="PROMO2026"
              value={promo}
              onChange={(e) => setPromo(e.target.value.toUpperCase())}
              className="flex-1 border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold"
            />
            <button
              onClick={applyPromo}
              className="px-4 rounded-xl bg-black/5 text-sm hover:bg-black/10"
            >
              Pakai
            </button>
          </div>
          {promoError && (
            <p className="text-xs text-red-600">{promoError}</p>
          )}
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-1 shadow-sm">
          {discount > 0 && (
            <p className="text-xs text-green-600">
              Diskon −Rp{discount.toLocaleString("id-ID")}
            </p>
          )}
          <div className="flex justify-between">
            <span className="text-sm text-secondary">Total</span>
            <span className="text-xl font-extrabold text-gold">
              Rp{total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gold text-white font-semibold py-4 rounded-xl
          hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Bayar Sekarang"}
        </button>

        <p className="text-xs text-center text-secondary">
          Pembayaran aman • Sekali bayar • Tanpa langganan
        </p>
      </div>
    </main>
  );
}
