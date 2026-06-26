import { IconAlertCircle, IconShield, IconFileText, IconGavel } from "@tabler/icons-react";
import type { FormData } from "@/app/generate/page";

const DOC_TYPES = [
  {
    id: "crime",
    icon: IconAlertCircle,
    title: "Заявление о преступлении",
    desc: "Мошенничество, кража, угрозы, превышение полномочий, порча имущества",
  },
  {
    id: "prokuratura",
    icon: IconShield,
    title: "Заявление в прокуратуру",
    desc: "Бездействие органов, нарушение прав, жалоба на должностных лиц",
  },
  {
    id: "zhaloba",
    icon: IconFileText,
    title: "Жалоба",
    desc: "ЖКХ, трудовые права, банки, потребители, медицина, образование",
  },
  {
    id: "isk",
    icon: IconGavel,
    title: "Исковое заявление в суд",
    desc: "Долги, алименты, раздел имущества, возмещение вреда — 21 вид иска",
  },
];

interface Props {
  form: FormData;
  updateForm: (d: FormData) => void;
  onNext: () => void;
}

export default function Step1({ form, updateForm, onNext }: Props) {
  function select(id: string) {
    updateForm({ docType: id, situation: "", sphere: "", organ: "" });
    onNext();
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-dark mb-2">Выберите тип документа</h2>
      <p className="text-gray-500 text-sm mb-6">Укажите, какой документ вам нужно составить</p>
      <div className="grid gap-3">
        {DOC_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            className={`flex items-start gap-4 p-4 border-2 rounded-xl text-left transition-all hover:border-bordeaux hover:bg-bordeaux/5 ${
              form.docType === t.id ? "border-bordeaux bg-bordeaux/5" : "border-gray-200 bg-white"
            }`}
          >
            <div className="w-10 h-10 bg-bordeaux/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <t.icon size={22} className="text-bordeaux" />
            </div>
            <div>
              <div className="font-semibold text-dark">{t.title}</div>
              <div className="text-gray-500 text-sm mt-0.5">{t.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
