"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Step1 from "@/components/generate/Step1";
import Step2 from "@/components/generate/Step2";
import Step3 from "@/components/generate/Step3";
import Step4 from "@/components/generate/Step4";
import Step5 from "@/components/generate/Step5";

export type FormData = Record<string, string>;

const STEP_LABELS = ["Тип документа", "Уточнение", "Ваши данные", "Обстоятельства", "Оплата"];

export default function GeneratePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({});
  const [generated, setGenerated] = useState<{ id: string; preview: string; price: number } | null>(null);

  function updateForm(data: FormData) {
    setForm((f) => ({ ...f, ...data }));
  }

  function next() { setStep((s) => Math.min(s + 1, 5)); }
  function prev() { setStep((s) => Math.max(s - 1, 1)); }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-beige py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEP_LABELS.map((label, i) => {
                const n = i + 1;
                const active = n === step;
                const done = n < step;
                return (
                  <div key={n} className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${
                      done ? "bg-green-500 text-white" : active ? "bg-bordeaux text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {done ? "✓" : n}
                    </div>
                    <span className={`text-xs text-center hidden sm:block ${active ? "text-bordeaux font-semibold" : "text-gray-400"}`}>
                      {label}
                    </span>
                    {i < STEP_LABELS.length - 1 && (
                      <div className="absolute" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div
                className="h-1 bg-bordeaux rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="card">
            {step === 1 && <Step1 form={form} updateForm={updateForm} onNext={next} />}
            {step === 2 && <Step2 form={form} updateForm={updateForm} onNext={next} onPrev={prev} />}
            {step === 3 && <Step3 form={form} updateForm={updateForm} onNext={next} onPrev={prev} />}
            {step === 4 && (
              <Step4
                form={form}
                updateForm={updateForm}
                onNext={async () => {
                  const res = await fetch("/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                  });
                  if (res.status === 401) {
                    window.location.href = "/auth/login";
                    return;
                  }
                  const data = await res.json();
                  if (data.id) {
                    setGenerated({ id: data.id, preview: data.preview, price: data.price });
                    next();
                  }
                }}
                onPrev={prev}
              />
            )}
            {step === 5 && generated && (
              <Step5 form={form} generated={generated} onPrev={prev} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
