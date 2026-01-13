import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DRIVE_LINKS = {
  basic: "https://drive.google.com/xxxxx-basic",
  pro: "https://drive.google.com/xxxxx-pro",
  business: "https://drive.google.com/xxxxx-business",
};

export async function POST(req) {
  try {
    const data = await req.json();

    // Midtrans success condition
    if (
      data.transaction_status !== "settlement" &&
      data.transaction_status !== "capture"
    ) {
      return NextResponse.json({ status: "ignored" });
    }

    const plan = data.item_details?.[0]?.id;
    const email = data.customer_details?.email;

    if (!plan || !email || !DRIVE_LINKS[plan]) {
      throw new Error("Data tidak lengkap untuk kirim email");
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Akses Template Website Kamu",
      html: `
        <h2>Terima kasih atas pembelianmu 🎉</h2>
        <p>Berikut adalah link template website sesuai paket yang kamu pilih:</p>
        <p><a href="${DRIVE_LINKS[plan]}">👉 Akses Template Website</a></p>
        <p>Jika ada kendala, silakan balas email ini.</p>
        <br/>
        <p>Salam,<br/>Tim Template Website</p>
      `,
    });

    return NextResponse.json({ status: "email sent" });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
