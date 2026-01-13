import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   VERIFY SIGNATURE
========================= */
function verifySignature(body) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  const raw =
    body.order_id +
    body.status_code +
    body.gross_amount +
    serverKey;

  const hash = crypto
    .createHash("sha512")
    .update(raw)
    .digest("hex");

  return hash === body.signature_key;
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
    ========================= */
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Template Website Kamu Siap Digunakan 🚀",
      html: `
        <div style="background:#0b0b0b;padding:40px 0;font-family:Arial,Helvetica,sans-serif">
        <div style="max-width:600px;margin:0 auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid #222">

            <!-- HEADER -->
            <div style="padding:28px 32px;text-align:center;border-bottom:1px solid #222">
            <h1 style="margin:0;font-size:22px;letter-spacing:1px;color:#d4af37">
                TEMPLATE WEBSITE
            </h1>
            <p style="margin:6px 0 0;color:#aaa;font-size:13px">
                Pembelian Berhasil • Akses Langsung
            </p>
            </div>

            <!-- CONTENT -->
            <div style="padding:32px;color:#eaeaea;line-height:1.7">
            <p style="margin-top:0">
                Halo 👋
            </p>

            <p>
                Terima kasih! Pembayaran untuk
                <strong style="color:#d4af37">
                Template Website ${plan.toUpperCase()}
                </strong>
                telah kami terima dengan sukses.
            </p>

            <p>
                Template ini siap digunakan untuk membangun website profesional
                dengan cepat, tanpa ribet teknis.
            </p>

            <!-- CTA -->
            <div style="margin:32px 0;text-align:center">
                <a
                href="${TEMPLATE_LINK[plan]}"
                target="_blank"
                style="
                    display:inline-block;
                    background:#d4af37;
                    color:#111;
                    padding:14px 28px;
                    border-radius:10px;
                    text-decoration:none;
                    font-weight:bold;
                    letter-spacing:0.5px;
                "
                >
                DOWNLOAD TEMPLATE
                </a>
            </div>

            <p style="font-size:13px;color:#aaa">
                Simpan link ini dengan baik.  
                Jika mengalami kendala atau membutuhkan bantuan, cukup balas email ini.
            </p>

            <!-- ORDER INFO -->
            <div style="margin-top:32px;padding-top:16px;border-top:1px solid #222;font-size:12px;color:#888">
                <p style="margin:4px 0">
                <strong>Order ID:</strong> ${order_id}
                </p>
                <p style="margin:4px 0">
                <strong>Total Pembayaran:</strong>
                Rp${Number(gross_amount).toLocaleString("id-ID")}
                </p>
            </div>
            </div>

            <!-- FOOTER -->
            <div style="background:#0e0e0e;padding:20px;text-align:center;font-size:11px;color:#666">
            © ${new Date().getFullYear()} Template Website Store  
            <br/>
            All rights reserved
            </div>

        </div>
        </div>

      `,
    });

    console.log("📧 EMAIL TERKIRIM:", email);

    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}
