import type { FormData } from "@/app/generate/page";

const CRIME_TYPES = [
  "Мошенничество (ст. 159 УК РФ)",
  "Кража / грабёж (ст. 158 УК РФ)",
  "Угрозы / насилие (ст. 119 УК РФ)",
  "Превышение полномочий (ст. 286 УК РФ)",
  "Порча имущества (ст. 167 УК РФ)",
  "Иное",
];
const CRIME_ORGANS = [
  "МВД России (полиция)",
  "Следственный комитет РФ",
  "Прокуратура (перенаправит сама)",
  "ФСБ России",
];
const PROKURATURA_TYPES = [
  "Обжалование решения прокурора",
  "Жалоба на действия (бездействие) должностных лиц",
  "Нарушение трудовых прав",
  "Нарушение прав участников СВО и их семей",
  "Нарушение прав потребителя",
  "Нарушение прав в сфере ЖКХ",
];
const ZHALOBA_SPHERES = [
  { id: "military", label: "Нарушение прав военнослужащих", hint: "выплаты, льготы, жильё, члены семьи" },
  { id: "consumer", label: "Защита прав потребителей", hint: "товары, услуги, магазины, возврат" },
  { id: "zhkh", label: "ЖКХ", hint: "управляющая компания, коммунальные услуги" },
  { id: "labor", label: "Трудовые права", hint: "зарплата, увольнение, условия труда" },
  { id: "medicine", label: "Медицина", hint: "врачебная ошибка, отказ в помощи" },
  { id: "bank", label: "Банки и финансы", hint: "МФО, страховые компании, кредиты" },
  { id: "education", label: "Образование", hint: "школа, детский сад, вуз" },
  { id: "transport", label: "Транспорт", hint: "авиа, ж/д, такси, перевозчики" },
  { id: "gosuslugi", label: "Государственные услуги", hint: "МФЦ, госорганы, бюрократия" },
];
const ISK_GROUPS = [
  {
    group: "Семейные споры",
    items: ["Расторжение брака", "Взыскание алиментов", "Раздел совместно нажитого имущества", "Определение места жительства ребёнка"],
  },
  {
    group: "Имущественные споры",
    items: ["Взыскание долга (займ, расписка)", "Возмещение материального ущерба", "Истребование имущества из чужого владения", "Признание права собственности"],
  },
  {
    group: "Трудовые споры",
    items: ["Незаконное увольнение", "Взыскание невыплаченной зарплаты", "Восстановление на работе"],
  },
  {
    group: "Защита прав потребителей",
    items: ["Возврат денег за товар / услугу", "Взыскание неустойки с продавца", "Расторжение договора купли-продажи"],
  },
  {
    group: "Жилищные споры",
    items: ["Выселение / снятие с регистрации", "Споры с застройщиком (ДДУ)", "Раздел лицевого счёта"],
  },
  {
    group: "Возмещение вреда",
    items: ["Возмещение вреда здоровью", "Возмещение морального вреда", "ДТП (ущерб от аварии)"],
  },
  {
    group: "Обжалование действий должностных лиц",
    items: ["Обжалование решений (прокурора, следователя, дознавателя) в порядке ст. 125 УПК РФ"],
  },
];

interface Props {
  form: FormData;
  updateForm: (d: FormData) => void;
  onNext: () => void;
  onPrev: () => void;
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
            value === opt ? "border-bordeaux bg-bordeaux/5" : "border-gray-200 hover:border-bordeaux/50"
          }`}
        >
          <input type="radio" className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${value === opt ? "border-bordeaux" : "border-gray-400"}`}>
            {value === opt && <span className="w-2 h-2 rounded-full bg-bordeaux block" />}
          </span>
          <span className="text-sm text-dark">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default function Step2({ form, updateForm, onNext, onPrev }: Props) {
  const dt = form.docType;
  const canNext =
    (dt === "crime" && form.situation && form.organ) ||
    (dt === "prokuratura" && form.situation) ||
    (dt === "zhaloba" && form.sphere) ||
    (dt === "isk" && form.situation);

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-dark mb-2">Уточните детали</h2>
      <p className="text-gray-500 text-sm mb-6">Выберите подходящий вариант</p>

      {dt === "crime" && (
        <div className="space-y-6">
          <div>
            <label className="label text-base mb-3">Характер преступления</label>
            <RadioGroup
              options={CRIME_TYPES}
              value={form.situation || ""}
              onChange={(v) => updateForm({ situation: v })}
            />
          </div>
          <div>
            <label className="label text-base mb-3">Орган подачи</label>
            <p className="text-xs text-gray-500 mb-3">Не знаете куда? Выберите «Прокуратура»</p>
            <RadioGroup
              options={CRIME_ORGANS}
              value={form.organ || ""}
              onChange={(v) => updateForm({ organ: v })}
            />
          </div>
        </div>
      )}

      {dt === "prokuratura" && (
        <div>
          <label className="label text-base mb-3">Характер обращения</label>
          <RadioGroup
            options={PROKURATURA_TYPES}
            value={form.situation || ""}
            onChange={(v) => updateForm({ situation: v })}
          />
        </div>
      )}

      {dt === "zhaloba" && (
        <div>
          <label className="label text-base mb-3">Сфера жалобы</label>
          <div className="grid gap-2">
            {ZHALOBA_SPHERES.map((s) => (
              <label
                key={s.id}
                className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  form.sphere === s.id ? "border-bordeaux bg-bordeaux/5" : "border-gray-200 hover:border-bordeaux/50"
                }`}
              >
                <input type="radio" className="sr-only" checked={form.sphere === s.id} onChange={() => updateForm({ sphere: s.id, situation: s.label })} />
                <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${form.sphere === s.id ? "border-bordeaux" : "border-gray-400"}`}>
                  {form.sphere === s.id && <span className="w-2 h-2 rounded-full bg-bordeaux block" />}
                </span>
                <div>
                  <div className="text-sm text-dark font-medium">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.hint}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {dt === "isk" && (
        <div className="space-y-5">
          {ISK_GROUPS.map((g) => (
            <div key={g.group}>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{g.group}</div>
              <div className="grid gap-1.5">
                {g.items.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      form.situation === item ? "border-bordeaux bg-bordeaux/5" : "border-gray-200 hover:border-bordeaux/50"
                    }`}
                  >
                    <input type="radio" className="sr-only" checked={form.situation === item} onChange={() => updateForm({ situation: item })} />
                    <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${form.situation === item ? "border-bordeaux" : "border-gray-400"}`}>
                      {form.situation === item && <span className="w-2 h-2 rounded-full bg-bordeaux block" />}
                    </span>
                    <span className="text-sm text-dark">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button onClick={onPrev} className="btn-outline flex-1 py-3 rounded-lg">Назад</button>
        <button onClick={onNext} disabled={!canNext} className="btn-primary flex-1 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
          Далее
        </button>
      </div>
    </div>
  );
}
