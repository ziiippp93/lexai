import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconScale, IconStar } from "@tabler/icons-react";

export const metadata = {
  title: "О нас — LexAI",
  description: "LexAI — профессиональная юридическая помощь онлайн. Наша команда и ценности.",
};

const team = [
  { name: "Александр Петров", role: "Старший юрист, уголовное право", exp: "15 лет опыта" },
  { name: "Елена Смирнова", role: "Юрист, гражданское право", exp: "10 лет опыта" },
  { name: "Михаил Козлов", role: "Юрист, трудовые споры", exp: "8 лет опыта" },
  { name: "Анна Волкова", role: "Юрист, защита прав потребителей", exp: "7 лет опыта" },
];

const values = [
  { title: "Доступность", desc: "Каждый человек заслуживает качественной юридической помощи, независимо от финансовых возможностей." },
  { title: "Точность", desc: "Каждый документ составляется с точными ссылками на нормы права и требования процессуального законодательства." },
  { title: "Конфиденциальность", desc: "Все данные клиентов строго защищены. Мы никогда не передаём личную информацию третьим лицам." },
  { title: "Результат", desc: "Наша цель — не просто документ, а реальная защита ваших прав и достижение результата." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="bg-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 text-gold font-playfair text-3xl font-bold mb-4">
              <IconScale size={36} />
              LexAI
            </div>
            <h1 className="font-playfair text-4xl font-bold mb-4">О компании</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Мы делаем юридическую защиту доступной для каждого
            </p>
          </div>
        </section>

        <section className="py-16 bg-beige">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-dark mb-4">Наша история</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  LexAI основан командой практикующих юристов с целью сделать профессиональную юридическую помощь доступной для каждого жителя России.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  За 10 лет работы мы помогли более 500 клиентам отстоять свои права в различных инстанциях: от полиции до Верховного суда.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Сегодня LexAI — это современный сервис, объединяющий экспертизу профессиональных юристов и возможности технологий для создания качественных юридических документов.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "500+", label: "Успешных дел" },
                  { num: "94%", label: "Успешных исходов" },
                  { num: "10 лет", label: "На рынке" },
                  { num: "4 юриста", label: "В команде" },
                ].map((s) => (
                  <div key={s.label} className="card text-center">
                    <div className="font-playfair text-2xl font-bold text-bordeaux">{s.num}</div>
                    <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="font-playfair text-3xl font-bold text-dark mb-8 text-center">Наша команда</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {team.map((m) => (
                <div key={m.name} className="card flex items-center gap-4">
                  <div className="w-14 h-14 bg-bordeaux/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair text-xl font-bold text-bordeaux">
                      {m.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-dark">{m.name}</div>
                    <div className="text-gray-500 text-sm">{m.role}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <IconStar size={12} className="text-gold fill-gold" />
                      <span className="text-xs text-gray-500">{m.exp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-playfair text-3xl font-bold text-dark mb-8 text-center">Наши ценности</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="card border-l-4 border-l-bordeaux">
                  <h3 className="font-playfair text-lg font-bold text-dark mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
