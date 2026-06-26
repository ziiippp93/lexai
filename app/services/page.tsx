import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconAlertCircle, IconShield, IconFileText, IconGavel, IconArrowRight } from "@tabler/icons-react";

export const metadata = {
  title: "Услуги — LexAI",
  description: "Все виды юридических документов: заявления, жалобы, исковые заявления. Профессионально и быстро.",
};

const services = [
  {
    id: "crime",
    icon: IconAlertCircle,
    title: "Заявление о преступлении",
    price: "499 ₽",
    desc: "Составим юридически грамотное заявление в правоохранительные органы по любому виду преступления.",
    situations: [
      "Мошенничество — вас обманули, присвоили деньги",
      "Кража или грабёж — похитили имущество",
      "Угрозы или насилие — поступают угрозы жизни",
      "Превышение полномочий — нарушения со стороны должностных лиц",
      "Порча имущества — намеренно повредили вашу собственность",
    ],
    organs: ["МВД России (полиция)", "Следственный комитет РФ", "Прокуратура", "ФСБ России"],
  },
  {
    id: "prokuratura",
    icon: IconShield,
    title: "Заявление в прокуратуру",
    price: "499 ₽",
    desc: "Защита прав через прокуратуру — надзорный орган, контролирующий законность действий всех государственных структур.",
    situations: [
      "Бездействие следователя или полиции",
      "Нарушения трудовых прав работодателем",
      "Коррупция и злоупотребления чиновников",
      "Нарушение прав участников СВО",
      "Нарушения в сфере ЖКХ",
    ],
    organs: ["Прокуратура направит в нужный отдел самостоятельно"],
  },
  {
    id: "zhaloba",
    icon: IconFileText,
    title: "Жалоба",
    price: "499 ₽",
    desc: "Жалобы в контролирующие органы по 9 ключевым сферам — от ЖКХ до медицины.",
    situations: [
      "ЖКХ — управляющая компания нарушает права",
      "Трудовые права — невыплата зарплаты, незаконное увольнение",
      "Защита потребителей — отказ в возврате, некачественный товар",
      "Медицина — врачебная ошибка, отказ в помощи",
      "Банки — нарушения со стороны МФО, страховых компаний",
      "Образование, транспорт, госуслуги",
    ],
    organs: ["Роспотребнадзор", "Трудовая инспекция", "ЦБ РФ", "Прокуратура", "Росздравнадзор"],
  },
  {
    id: "isk",
    icon: IconGavel,
    title: "Исковое заявление в суд",
    price: "1 499 ₽",
    desc: "21 вид искового заявления для защиты прав в суде. Строгое соблюдение требований ГПК РФ.",
    situations: [
      "Расторжение брака, алименты, раздел имущества",
      "Взыскание долга по расписке или договору",
      "Незаконное увольнение, невыплата зарплаты",
      "ДТП, возмещение вреда здоровью",
      "Споры с застройщиком по ДДУ",
    ],
    organs: ["Мировой суд", "Районный суд", "Арбитражный суд"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="bg-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl font-bold mb-4">Наши услуги</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Профессиональные юридические документы для защиты ваших прав
            </p>
          </div>
        </section>

        <section className="py-16 bg-beige">
          <div className="max-w-5xl mx-auto px-4 space-y-10">
            {services.map((s) => (
              <div key={s.id} id={s.id} className="card scroll-mt-20">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-bordeaux/10 rounded-2xl flex items-center justify-center">
                      <s.icon size={32} className="text-bordeaux" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <h2 className="font-playfair text-2xl font-bold text-dark">{s.title}</h2>
                      <span className="font-playfair text-2xl font-bold text-bordeaux flex-shrink-0">{s.price}</span>
                    </div>
                    <p className="text-gray-600 mb-5">{s.desc}</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <div className="text-sm font-semibold text-dark mb-2">Типичные ситуации:</div>
                        <ul className="space-y-1.5">
                          {s.situations.map((sit) => (
                            <li key={sit} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-bordeaux mt-0.5">•</span>
                              {sit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-dark mb-2">Куда подаётся:</div>
                        <ul className="space-y-1.5">
                          {s.organs.map((o) => (
                            <li key={o} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-gold mt-0.5">→</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Link
                      href={`/generate?type=${s.id}`}
                      className="btn-primary text-sm px-6 py-2.5 rounded-lg inline-flex items-center gap-2"
                    >
                      Создать документ <IconArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
