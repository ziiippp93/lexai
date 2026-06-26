"use client";
import { useState } from "react";
import { IconLoader2, IconUpload, IconX } from "@tabler/icons-react";
import type { FormData } from "@/app/generate/page";

interface Props {
  form: FormData;
  updateForm: (d: FormData) => void;
  onNext: () => Promise<void>;
  onPrev: () => void;
}

export default function Step4({ form, updateForm, onNext, onPrev }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const isProkuratura = form.docType === "prokuratura";
  const textLabel = isProkuratura ? "Изложите суть обращения своими словами" : "Изложите суть произошедшего своими словами";
  const fileLabel = isProkuratura
    ? "Прикрепить документ, который обжалуется (решение, постановление, ответ)"
    : "Прикрепить доказательства";

  async function handleSubmit() {
    if (!form.description) return;
    setError("");
    setLoading(true);
    try {
      await onNext();
    } catch {
      setError("Ошибка при генерации документа. Попробуйте ещё раз.");
    }
    setLoading(false);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      setError("Файл слишком большой. Максимальный размер — 25 МБ");
      return;
    }
    setFileName(file.name);
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-dark mb-2">Описание обстоятельств</h2>
      <p className="text-gray-500 text-sm mb-6">Опишите ситуацию подробно — чем больше деталей, тем точнее документ</p>

      <div className="space-y-5">
        <div>
          <label className="label">{textLabel} <span className="text-bordeaux">*</span></label>
          <textarea
            className="input-field min-h-[180px] resize-y"
            placeholder="Опишите всё, что произошло: дата, место, действия сторон, последствия..."
            value={form.description || ""}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {(form.description || "").length} символов
          </div>
        </div>

        <div>
          <label className="label">{fileLabel} <span className="text-gray-400">(необязательно)</span></label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-bordeaux/50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFile}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {fileName ? (
                <div className="flex items-center justify-center gap-2 text-bordeaux">
                  <span className="text-sm font-medium">{fileName}</span>
                  <button
                    onClick={(e) => { e.preventDefault(); setFileName(""); }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <IconX size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <IconUpload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Нажмите для загрузки файла</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — до 25 МБ</p>
                </>
              )}
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onPrev} disabled={loading} className="btn-outline flex-1 py-3 rounded-lg">Назад</button>
        <button
          onClick={handleSubmit}
          disabled={loading || !form.description}
          className="btn-primary flex-1 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <IconLoader2 size={18} className="animate-spin" />
              Составляем документ...
            </>
          ) : (
            "Составить документ"
          )}
        </button>
      </div>
    </div>
  );
}
