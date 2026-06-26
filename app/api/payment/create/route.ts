export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 });
  }

  try {
    const { applicationId } = await req.json();
    const app = await prisma.application.findUnique({ where: { id: applicationId } });
    if (!app) return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });

    const shopId = process.env.YUKASSA_SHOP_ID;
    const secretKey = process.env.YUKASSA_SECRET_KEY;
    const idempotenceKey = `${applicationId}-${Date.now()}`;

    const body = {
      amount: { value: (app.price / 100).toFixed(2), currency: "RUB" },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${process.env.NEXTAUTH_URL}/dashboard?paid=${applicationId}`,
      },
      description: `LexAI — документ #${applicationId.slice(0, 8)}`,
      metadata: { applicationId },
    };

    const res = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": idempotenceKey,
        Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString("base64")}`,
      },
      body: JSON.stringify(body),
    });

    const payment = await res.json();

    await prisma.application.update({
      where: { id: applicationId },
      data: { paymentId: payment.id },
    });

    return NextResponse.json({ confirmationUrl: payment.confirmation?.confirmation_url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка создания платежа" }, { status: 500 });
  }
}
