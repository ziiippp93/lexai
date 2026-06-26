"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconPhone, IconMail, IconMapPin, IconClock, IconLoader2, IconCheck } from "@tabler/icons-react";

const QUESTION_TYPES = [
  "Заявление о преступлении",
  "Заявление в прокуратуру",
  "Жалоба",
  "Исковое заявление",
  "Консультация",
  "Другое",
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function change(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="bg-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl font-bold mb-4">Контакты</h1>
            <p className="text-gray-300 text-lg">Свяжитесь с нами — ответим на любой вопрос</p>
          </div>
        </section>

        <section className="py-16 bg-beige">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Form */}
              <div className="card">
                <h2 className="font-playfair text-2xl font-bold text-dark mb-6">Оставить заявку</h2>
                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconCheck size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-dark mb-2">Заявка отправлена!</h3>
                    <p className="text-gray-500">Мы свяжемся с вами в течение 1 рабочего дня.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="label">Имя <span className="text-bordeaux">*</span></label>
                      <input type="text" className="input-field" placeholder="Ваше имя" value={form.name} onChange={(e) => change("name", e.target.value)} required />
                    </div>
                    <div>
                      <label className="label">Телефон <span className="text-bordeaux">*</span></label>
                      <input type="tel" className="input-field" placeholder="+7 (999) 999-99-99" value={form.phone} onChange={(e) => change("phone", e.target.value)} required />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input type="email" className="input-field" placeholder="example@mail.ru" value={form.email} onChange={(e) => change("email", e.target.value)} />
                    </div>
                    <div>
                      <label className="label">Тип вопроса</label>
                      <select className="input-field" value={form.type} onChange={(e) => change("type", e.target.value)}>
                        <option value="">Выберите тип</option>
                        {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label">Описание ситуации</label>
                      <textarea
                        className="input-field min-h-[100px] resize-y"
                        placeholder="Кратко опишите вашу ситуацию..."
                        value={form.message}
                        onChange={(e) => change("message", e.target.value)}
                      />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-lg flex items-center justify-center gap-2">
                      {loading && <IconLoader2 size={18} className="animate-spin" />}
                      Отправить заявку
                    </button>
                  </form>
                )}
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="font-playfair text-lg font-bold text-dark mb-4">Контактная информация</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-bordeaux/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconPhone size={18} className="text-bordeaux" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Телефон</div>
                        <div className="font-medium">+7 (800) 000-00-00</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-bordeaux/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconMail size={18} className="text-bordeaux" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Email</div>
                        <div className="font-medium">info@lexai.ru</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-bordeaux/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconMapPin size={18} className="text-bordeaux" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Адрес</div>
                        <div className="font-medium">Москва, ул. Примерная, д. 1</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-bordeaux/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconClock size={18} className="text-bordeaux" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Режим работы</div>
                        <div className="font-medium">Пн–Пт: 9:00–18:00</div>
                        <div className="text-sm text-gray-400">Онлайн-сервис — 24/7</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card bg-bordeaux text-white">
                  <h3 className="font-playfair text-lg font-bold mb-3">Нужен документ прямо сейчас?</h3>
                  <p className="text-red-200 text-sm mb-4">Используйте генератор документов — получите готовый документ за 5 минут</p>
                  <a href="/generate" className="bg-gold text-dark px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors inline-block">
                    Создать документ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
