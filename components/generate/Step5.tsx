"use client";
import { useState } from "react";
import Link from "next/link";
import { IconLoader2, IconShield, IconCheck } from "@tabler/icons-react";
import type { FormData } from "@/app/generate/page";

interface Props {
  form: FormData;
  generated: { id: string; preview: string; price: number };
  onPrev: () => void;
}

const docTypeLabels: Record<string, string> = {
  crime: "Заявление о преступлении",
  prokuratura: "Заявление в прокуратуру",
  zhaloba: "Жалоба",
  isk: "Исковое заявление в суд",
};

export default function Step5({ form, generated, onPrev }: Props) {
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const docLabel = docTypeLabels[form.docType] || form.docType;
  const fio = `${form.lastName || ""} ${form.firstName || ""} ${form.middleName || ""}`.trim();

  async function handlePay() {
    setPaying(true);
    setError("");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: generated.id }),
      });
      const data = await res.json();
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      } else {
        setError("Не удалось создать платёж. Попробуйте снова.");
        setPaying(false);
      }
    } catch {
      setError("Ошибка соединения. Попробуйте снова.");
      setPaying(false);
    }
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-dark mb-2">Предпросмотр документа</h2>
      <p className="text-gray-500 text-sm mb-6">Ваш документ готов. Оплатите для получения полной версии.</p>

      {/* Document preview */}
      <div className="relative border border-beige-dark rounded-xl overflow-hidden mb-6">
        <div className="bg-white p-6">
          <div className="text-sm font-semibold text-bordeaux mb-3 uppercase tracking-wide">{docLabel}</div>
          <pre className="whitespace-pre-wrap font-inter text-sm text-dark leading-relaxed">
            {generated.preview}
          </pre>
        </div>
        {/* Watermark overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige via-beige/80 to-transparent flex items-end justify-center pb-4">
          <div className="flex items-center gap-2 bg-bordeaux/10 border border-bordeaux/20 text-bordeaux px-4 py-2 rounded-full text-sm font-medium">
            <IconShield size={16} />
            Полный текст доступен после оплаты
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-beige border border-beige-dark rounded-xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-dark">{docLabel}</div>
            <div className="text-gray-500 text-sm mt-0.5">{fio}</div>
            <div className="text-gray-500 text-sm">{form.situation}</div>
            <div className="mt-3 space-y-1">
              {["PDF-файл документа", "Word-файл для редактирования", "Отправка на email"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <IconCheck size={14} className="text-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="font-playfair text-3xl font-bold text-bordeaux">{generated.price} ₽</div>
            <div className="text-gray-400 text-xs mt-1">единоразовый платёж</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={paying}
        className="btn-primary w-full py-4 text-base rounded-xl flex items-center justify-center gap-2 mb-4"
      >
        {paying ? (
          <>
            <IconLoader2 size={20} className="animate-spin" />
            Переход к оплате...
          </>
        ) : (
          <>
            <IconShield size={20} />
            Оплатить и скачать — {generated.price} ₽
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-6">
        <span>Безопасная оплата</span>
        <span>•</span>
        <span>Карта / СБП</span>
        <span>•</span>
        <span>Без подписки</span>
      </div>

      <div className="flex gap-3">
        <button onClick={onPrev} className="btn-outline flex-1 py-3 rounded-lg text-sm">
          Изменить данные
        </button>
        <Link href="/generate" className="btn-outline flex-1 py-3 rounded-lg text-sm text-center">
          Создать новый документ
        </Link>
      </div>
    </div>
  );
}
