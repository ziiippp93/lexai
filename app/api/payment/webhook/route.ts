export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { generatePDF } = await import("@/lib/pdf");
    const { generateDocx } = await import("@/lib/docx");
    const { sendEmail } = await import("@/lib/email");

    const body = await req.json();
    if (body.event !== "payment.succeeded") return NextResponse.json({ ok: true });

    const applicationId = body.object?.metadata?.applicationId;
    if (!applicationId) return NextResponse.json({ ok: true });

    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { user: true },
    });
    if (!app || app.paid) return NextResponse.json({ ok: true });

    if (!app.generatedText) return NextResponse.json({ ok: true });

    const pdfPath = await generatePDF(app.id, app.generatedText);
    const docxPath = await generateDocx(app.id, app.generatedText);

    await prisma.application.update({
      where: { id: applicationId },
      data: {
        paid: true,
        status: "completed",
        pdfUrl: pdfPath,
        docxUrl: docxPath,
      },
    });

    await sendEmail({
      to: app.user.email,
      name: app.user.name,
      applicationId: app.id,
      docType: app.docType,
      pdfPath,
      docxPath,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
