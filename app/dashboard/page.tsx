"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  IconFileText, IconPlus, IconDownload, IconClock,
  IconCheck, IconLoader2, IconScale,
} from "@tabler/icons-react";

interface Application {
  id: string;
  docType: string;
  situation: string;
  status: string;
  paid: boolean;
  price: number;
  createdAt: string;
  pdfUrl: string | null;
  docxUrl: string | null;
}

const docTypeLabels: Record<string, string> = {
  crime: "Заявление о преступлении",
  prokuratura: "Заявление в прокуратуру",
  zhaloba: "Жалоба",
  isk: "Исковое заявление в суд",
};

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "Новая", color: "bg-yellow-100 text-yellow-800" },
  "in-progress": { label: "В работе", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Завершена", color: "bg-green-100 text-green-800" },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => r.json())
      .then((data) => { setApps(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const name = session?.user?.name?.split(" ")[0] || "Пользователь";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-beige py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-bordeaux mb-1">
                <IconScale size={20} />
                <span className="text-sm font-medium">Личный кабинет</span>
              </div>
              <h1 className="font-playfair text-2xl md:text-3xl font-bold text-dark">
                Добро пожаловать, {name}!
              </h1>
            </div>
            <div className="flex gap-3">
              <Link href="/generate" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg">
                <IconPlus size={18} />
                Новый документ
              </Link>
              <button
                onClick={() => signOut()}
                className="btn-outline text-sm px-5 py-2.5 rounded-lg"
              >
                Выйти
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-2xl font-bold text-bordeaux font-playfair">{apps.length}</div>
              <div className="text-gray-500 text-sm mt-1">Всего документов</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 font-playfair">{apps.filter((a) => a.paid).length}</div>
              <div className="text-gray-500 text-sm mt-1">Оплачено</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-yellow-600 font-playfair">{apps.filter((a) => !a.paid).length}</div>
              <div className="text-gray-500 text-sm mt-1">Ожидают оплаты</div>
            </div>
          </div>

          {/* Applications */}
          <div className="card">
            <h2 className="font-playfair text-xl font-bold text-dark mb-6">Мои документы</h2>
            {loading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-gray-500">
                <IconLoader2 size={24} className="animate-spin" />
                Загрузка...
              </div>
            ) : apps.length === 0 ? (
              <div className="text-center py-16">
                <IconFileText size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="font-playfair text-lg font-bold text-dark mb-2">Документов пока нет</h3>
                <p className="text-gray-500 text-sm mb-6">Создайте первый документ прямо сейчас</p>
                <Link href="/generate" className="btn-primary px-6 py-3 rounded-lg text-sm">
                  Создать документ
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {apps.map((app) => {
                  const st = statusLabels[app.status] || statusLabels.new;
                  const date = new Date(app.createdAt).toLocaleDateString("ru-RU");
                  return (
                    <div key={app.id} className="border border-beige-dark rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-bordeaux/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconFileText size={20} className="text-bordeaux" />
                        </div>
                        <div>
                          <div className="font-semibold text-dark text-sm">
                            {docTypeLabels[app.docType] || app.docType}
                          </div>
                          <div className="text-gray-500 text-xs mt-0.5">{app.situation}</div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>
                              {st.label}
                            </span>
                            <span className="text-gray-400 text-xs flex items-center gap-1">
                              <IconClock size={12} /> {date}
                            </span>
                            <span className="text-gray-500 text-xs font-medium">{app.price} ₽</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {app.paid && app.pdfUrl && (
                          <>
                            <a
                              href={`/api/applications/${app.id}/download/pdf`}
                              className="flex items-center gap-1.5 text-xs border border-bordeaux text-bordeaux px-3 py-2 rounded-lg hover:bg-bordeaux hover:text-white transition-colors"
                            >
                              <IconDownload size={14} /> PDF
                            </a>
                            <a
                              href={`/api/applications/${app.id}/download/docx`}
                              className="flex items-center gap-1.5 text-xs border border-bordeaux text-bordeaux px-3 py-2 rounded-lg hover:bg-bordeaux hover:text-white transition-colors"
                            >
                              <IconDownload size={14} /> Word
                            </a>
                          </>
                        )}
                        {!app.paid && (
                          <span className="text-xs text-gray-400 flex items-center gap-1 px-3 py-2">
                            <IconCheck size={14} /> Ожидает оплаты
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
