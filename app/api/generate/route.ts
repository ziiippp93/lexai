export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PRICES: Record<string, number> = {
  crime: 499,
  prokuratura: 499,
  zhaloba: 499,
  isk: 1499,
};

function buildPrompt(data: Record<string, string>): string {
  const { docType, situation, organ, sphere, fio, dob, address, phone, email, description } = data;

  const docTypeLabels: Record<string, string> = {
    crime: "Заявление о преступлении",
    prokuratura: "Заявление в прокуратуру",
    zhaloba: "Жалоба",
    isk: "Исковое заявление в суд",
  };

  const specificFields = Object.entries(data)
    .filter(([k]) => !["docType", "situation", "organ", "sphere", "fio", "dob", "address", "phone", "email", "description"].includes(k))
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  return `Ты — профессиональный юрист. Составь юридически грамотный документ на русском языке.

Тип документа: ${docTypeLabels[docType] || docType}
Характер: ${situation || ""}
${organ ? `Орган подачи: ${organ}` : ""}
${sphere ? `Сфера: ${sphere}` : ""}

Данные заявителя:
ФИО: ${fio}
Дата рождения: ${dob}
Адрес: ${address}
Телефон: ${phone}
Email: ${email}

Данные о событии:
${specificFields}

Описание обстоятельств:
${description}

Требования к документу:
- Строгий юридический стиль
- Правильная структура (шапка, заголовок, основная часть, просительная часть, список приложений, подпись)
- Ссылки на конкретные статьи законов РФ
- Полный текст готового документа без пояснений`;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { docType, situation, sphere, organ, description } = data;

    const prompt = buildPrompt(data);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const generatedText = (message.content[0] as { type: string; text: string }).text;
    const price = PRICES[docType] || 499;

    const userId = (session.user as { id?: string }).id!;

    const application = await prisma.application.create({
      data: {
        userId,
        docType,
        situation: situation || "",
        sphere,
        organ,
        formData: JSON.stringify(data),
        description,
        generatedText,
        status: "new",
        price,
        paid: false,
      },
    });

    const preview = generatedText.slice(0, 600);

    return NextResponse.json({ id: application.id, preview, price, fullText: generatedText });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка генерации документа" }, { status: 500 });
  }
}
