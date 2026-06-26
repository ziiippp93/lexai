import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  IconShield, IconFileText, IconGavel, IconAlertCircle,
  IconBolt, IconLock, IconCheck, IconDeviceMobile,
  IconStar, IconArrowRight,
} from "@tabler/icons-react";

export const metadata = {
  title: "LexAI — Ваш надёжный юридический защитник",
  description: "Профессиональные юридические документы онлайн: заявления, жалобы, исковые заявления. Быстро, конфиденциально, юридически грамотно.",
};

const services = [
  {
    icon: IconAlertCircle,
    title: "Заявление о преступлении",
    desc: "Мошенничество, кража, угрозы, превышение полномочий — составим заявление в нужный орган",
    href: "/services#crime",
  },
  {
    icon: IconShield,
    title: "Заявление в прокуратуру",
    desc: "Жалобы на бездействие органов, нарушение прав, коррупция и злоупотребления",
    href: "/services#prokuratura",
  },
  {
    icon: IconFileText,
    title: "Жалоба",
    desc: "В Роспотребнадзор, трудовую инспекцию, ЦБ, ЖКХ и другие инстанции",
    href: "/services#zhaloba",
  },
  {
    icon: IconGavel,
    title: "Исковое заявление в суд",
    desc: "Долги, алименты, раздел имущества, возмещение ущерба — 21 вид иска",
    href: "/services#isk",
  },
];

const advantages = [
  { icon: IconBolt, title: "Быстро", desc: "Документ готов за 2–5 минут. Никаких очередей и долгих ожиданий." },
  { icon: IconLock, title: "Конфиденциально", desc: "Ваши данные защищены. Мы никому не передаём личную информацию." },
  { icon: IconCheck, title: "Юридически грамотно", desc: "Ссылки на нормы закона, правильная структура, профессиональный стиль." },
  { icon: IconDeviceMobile, title: "Удобно", desc: "Работает на любом устройстве. Получите документ на email." },
];

const steps = [
  { n: "01", title: "Выбрать", desc: "Укажите тип нужного документа" },
  { n: "02", title: "Заполнить", desc: "Ответьте на вопросы формы — это займёт пару минут" },
  { n: "03", title: "Оплатить", desc: "Безопасная оплата картой или СБП" },
  { n: "04", title: "Получить", desc: "Документ PDF и Word придут на email мгновенно" },
];

const reviews = [
  {
    name: "Алексей М.",
    city: "Москва",
    text: "Обратился с проблемой мошенничества. Заявление составили грамотно, со всеми ссылками на законы. Полиция приняла с первого раза.",
    stars: 5,
  },
  {
    name: "Ирина К.",
    city: "Санкт-Петербург",
    text: "Нужно было подать жалобу на управляющую компанию. Всё заполнила за 3 минуты, получила документ на email. Очень удобно!",
    stars: 5,
  },
  {
    name: "Дмитрий В.",
    city: "Екатеринбург",
    text: "Составляли исковое заявление о взыскании долга. Качество документа превзошло ожидания. Суд прошёл успешно.",
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-bordeaux to-dark text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ваш надёжный<br />
            <span className="text-gold">юридический защитник</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Профессиональные юридические документы за минуты. Заявления, жалобы, исковые заявления — составим грамотно и быстро.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate" className="btn-gold text-base px-8 py-4 rounded-lg font-semibold">
              Получить документ
            </Link>
            <Link href="/contacts" className="btn-outline border-white text-white hover:bg-white hover:text-dark text-base px-8 py-4 rounded-lg font-semibold">
              Бесплатная консультация
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-gold font-playfair">500+</div>
              <div className="text-gray-400 text-sm mt-1">успешных дел</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold font-playfair">94%</div>
              <div className="text-gray-400 text-sm mt-1">успешных исходов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold font-playfair">10 лет</div>
              <div className="text-gray-400 text-sm mt-1">юридического опыта</div>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className="py-20 bg-beige" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Наши услуги</h2>
            <p className="section-subtitle">Выберите нужный тип документа и мы составим его профессионально</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="card hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-bordeaux/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-bordeaux/20 transition-colors">
                  <s.icon size={24} className="text-bordeaux" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-dark mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-4 text-bordeaux text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Подробнее <IconArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/generate" className="btn-primary text-base px-8 py-4 rounded-lg">
              Создать документ сейчас
            </Link>
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Почему выбирают LexAI</h2>
            <p className="section-subtitle">Мы сделали юридическую помощь доступной каждому</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((a) => (
              <div key={a.title} className="text-center">
                <div className="w-16 h-16 bg-bordeaux rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <a.icon size={28} className="text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-dark mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как работает */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Как это работает</h2>
            <p className="section-subtitle">Четыре простых шага до готового документа</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gold/40" />
                )}
                <div className="w-16 h-16 bg-bordeaux rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="font-playfair text-lg font-bold text-white">{s.n}</span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-dark mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Отзывы клиентов</h2>
            <p className="section-subtitle">Нам доверяют сотни людей по всей России</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div key={r.name} className="card">
                <div className="flex mb-3">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <IconStar key={i} size={18} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="font-semibold text-dark text-sm">{r.name}</div>
                <div className="text-gray-500 text-xs">{r.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bordeaux text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Готовы защитить свои права?
          </h2>
          <p className="text-lg text-red-200 mb-8">
            Создайте юридически грамотный документ прямо сейчас
          </p>
          <Link href="/generate" className="bg-gold text-dark px-10 py-4 rounded-lg font-bold text-lg hover:bg-gold-light transition-colors inline-block">
            Создать документ
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
