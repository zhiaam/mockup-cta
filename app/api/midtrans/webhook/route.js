import { NextResponse } from "next/server";
import crypto from "crypto";

let Resend;
let resend;

// ==========================
// USE DUMMY IF NO API KEY
// ==========================
if (process.env.RESEND_API_KEY) {
  // asli
  Resend = require("resend").Resend;
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  // dummy object supaya build tidak error
  resend = {
    emails: {
      send: async () => {
        console.log("⚠️ Dummy email send called – RESEND_API_KEY not set");
        return { message: "Dummy email sent" };
      },
    },
  };
}

/* =========================
   VERIFY SIGNATURE
========================= */
function verifySignature(body) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || "dummy_key";

  const raw =
    body.order_id +
    body.status_code +
    body.gross_amount +
    serverKey;

  const hash = crypto
    .createHash("sha512")
    .update(raw)
    .digest("hex");

  return hash === body.signature_key || serverKey === "dummy_key";
}

/* =========================
   LINK TEMPLATE
========================= */
const TEMPLATE_LINK = {
  basic: "https://drive.google.com/basic-template",
  pro: "https://drive.google.com/pro-template",
  business: "https://drive.google.com/business-template",
};

export async function POST(req) {
  try {
    const body = await req.json();

    if (!verifySignature(body)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    const {
      transaction_status,
      fraud_status,
      order_id,
      gross_amount,
      custom_field2: plan,
      customer_details,
    } = body;

    const isPaid =
      (transaction_status === "capture" &&
        fraud_status === "accept") ||
      transaction_status === "settlement";

    if (!isPaid) {
      return NextResponse.json({ message: "Not paid" });
    }

    const email = customer_details?.email;

    if (!email || !TEMPLATE_LINK[plan]) {
      console.error("Email / plan tidak valid");
      return NextResponse.json({ message: "Skip email" });
    }

    /* =========================
       KIRIM EMAIL
    ========================== */
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "dummy@example.com",
      to: email,
      subject: "Template Website Kamu Siap Digunakan 🚀",
      html: `<p>Halo, ini versi dummy email. Template ${plan}</p>`,
    });

    console.log("📧 EMAIL TERKIRIM (dummy mode):", email);

    return NextResponse.json({ message: "Email sent (dummy mode)" });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}
