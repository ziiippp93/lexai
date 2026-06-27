export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";

export async function GET() {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const { prisma } = await import("@/lib/prisma");

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id!;
  const applications = await prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(applications);
}
