export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateDocxBuffer } from "@/lib/docx";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id?: string }).id!;
  const app = await prisma.application.findFirst({ where: { id: params.id, userId } });

  if (!app || !app.paid || !app.generatedText) {
    return NextResponse.json({ error: "Файл недоступен" }, { status: 404 });
  }

  const buffer = await generateDocxBuffer(app.generatedText);
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="lexai-document-${params.id.slice(0, 8)}.docx"`,
    },
  });
}
