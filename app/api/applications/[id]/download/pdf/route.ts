export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const { prisma } = await import("@/lib/prisma");
  const { generatePDFBuffer } = await import("@/lib/pdf");

  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id?: string }).id!;
  const app = await prisma.application.findFirst({ where: { id: params.id, userId } });

  if (!app || !app.paid || !app.generatedText) {
    return NextResponse.json({ error: "Файл недоступен" }, { status: 404 });
  }

  const buffer = await generatePDFBuffer(app.generatedText);
  const uint8Array = new Uint8Array(buffer);
  return new Response(uint8Array, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="lexai-document-${params.id.slice(0, 8)}.pdf"`,
    },
  });
}
