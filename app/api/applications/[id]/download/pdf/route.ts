export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id?: string }).id!;
  const app = await prisma.application.findFirst({ where: { id: params.id, userId } });

  if (!app || !app.paid || !app.pdfUrl) {
    return NextResponse.json({ error: "Файл недоступен" }, { status: 404 });
  }

  const file = fs.readFileSync(app.pdfUrl);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="lexai-document-${params.id.slice(0, 8)}.pdf"`,
    },
  });
}
