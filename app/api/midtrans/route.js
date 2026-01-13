import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

// ⬅️ WAJIB agar tidak error Edge Runtime
export const runtime = "nodejs";

export async function POST(req) {
  try {
    /* =========================
       VALIDASI ENV
    ========================= */
    if (!process.env.MIDTRANS_SERVER_KEY) {
      throw new Error("MIDTRANS_SERVER_KEY tidak terbaca");
    }

    /* =========================
       INIT MIDTRANS SNAP
    ========================= */
    const snap = new Midtrans.Snap({
      isProduction: false, // sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    /* =========================
       DATA DARI CLIENT
    ========================= */
    const body = await req.json();
    const { plan, email, promo } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    /* =========================
       PLAN & HARGA (SERVER ONLY)
    ========================= */
    const PLANS = {
      basic: { name: "Basic", price: 149000 },
      pro: { name: "Pro", price: 299000 },
      business: { name: "Business", price: 499000 },
    };

    if (!PLANS[plan]) {
      return NextResponse.json(
        { error: `Paket tidak valid: ${plan}` },
        { status: 400 }
      );
    }

    let finalPrice = PLANS[plan].price;
    let promoLabel = null;

    /* =========================
       PROMO (VALIDASI SERVER)
    ========================= */
    if (promo === "PROMO10") {
      finalPrice = Math.floor(finalPrice * 0.9);
      promoLabel = "Diskon 10%";
    }

    if (promo === "PROMO50K") {
      finalPrice = Math.max(finalPrice - 50000, 0);
      promoLabel = "Diskon Rp50.000";
    }

    /* =========================
       TRANSAKSI MIDTRANS
    ========================= */
    const orderId = `ORDER-${Date.now()}`;

    const token = await snap.createTransactionToken({
      transaction_details: {
        order_id: orderId,
        gross_amount: finalPrice,
      },
      item_details: [
        {
          id: plan,
          price: finalPrice,
          quantity: 1,
          name: `Template Website ${PLANS[plan].name}`,
        },
      ],
      customer_details: {
        first_name: "Customer",
        email,
      },
      custom_field1: promoLabel ?? "",
      custom_field2: plan,
    });

    return NextResponse.json({
      token,
      orderId,
    });
  } catch (error) {
    console.error("MIDTRANS ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
