"use client";
import { useState } from "react";
import type { FormData } from "@/app/generate/page";

interface Props {
  form: FormData;
  updateForm: (d: FormData) => void;
  onNext: () => void;
  onPrev: () => void;
}

function Field({ label, name, type = "text", placeholder, value, onChange, required = true }: {
  label: string; name: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="label">{label}{required && <span className="text-bordeaux ml-1">*</span>}</label>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("9") && d.length <= 10) d = "7" + d;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  if (d.length <= 1) return "+7";
  if (d.length <= 4) return `+7 (${d.slice(1)}`;
  if (d.length <= 7) return `+7 (${d.slice(1, 4)}) ${d.slice(4)}`;
  if (d.length <= 9) return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
}

function SpecificFields({ form, updateForm }: { form: FormData; updateForm: (d: FormData) => void }) {
  const [usePeriod, setUsePeriod] = useState(false);
  const f = (k: string) => form[k] || "";
  const u = (k: string, v: string) => updateForm({ [k]: v });

  if (form.docType === "crime") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={usePeriod} onChange={(e) => setUsePeriod(e.target.checked)} className="w-4 h-4 accent-bordeaux" />
            <span className="text-sm text-dark">Указать период (а не конкретную дату)</span>
          </label>
        </div>
        {usePeriod ? (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Дата начала" name="dateFrom" type="date" value={f("dateFrom")} onChange={(v) => u("dateFrom", v)} />
            <Field label="Дата окончания" name="dateTo" type="date" value={f("dateTo")} onChange={(v) => u("dateTo", v)} />
          </div>
        ) : (
          <Field label="Дата события" name="eventDate" type="date" value={f("eventDate")} onChange={(v) => u("eventDate", v)} />
        )}
        <Field label="Место события" name="eventPlace" placeholder="г. Москва, ул. Примерная, д. 1" value={f("eventPlace")} onChange={(v) => u("eventPlace", v)} />
        <Field label="Сумма ущерба (₽)" name="damageAmount" type="number" placeholder="0" value={f("damageAmount")} onChange={(v) => u("damageAmount", v)} required={false} />
        <Field label="Данные виновного (если известны)" name="suspectInfo" placeholder="ФИО, адрес, телефон" value={f("suspectInfo")} onChange={(v) => u("suspectInfo", v)} required={false} />
      </div>
    );
  }

  if (form.docType === "prokuratura") {
    return (
      <div className="space-y-4">
        <Field label="Место совершения обжалуемых действий" name="eventPlace" placeholder="г. Москва, ОВД Пресненское" value={f("eventPlace")} onChange={(v) => u("eventPlace", v)} />
        <Field label="Данные лица / организации" name="respondentInfo" placeholder="ФИО, должность, орган" value={f("respondentInfo")} onChange={(v) => u("respondentInfo", v)} />
      </div>
    );
  }

  if (form.docType === "zhaloba") {
    const sphere = form.sphere;
    return (
      <div className="space-y-4">
        {sphere === "military" && <>
          <Field label="Воинская часть" name="militaryUnit" value={f("militaryUnit")} onChange={(v) => u("militaryUnit", v)} />
          <Field label="ФИО командира" name="commanderName" value={f("commanderName")} onChange={(v) => u("commanderName", v)} />
          <div>
            <label className="label">Вид нарушения <span className="text-bordeaux">*</span></label>
            <select className="input-field" value={f("violationType")} onChange={(e) => u("violationType", e.target.value)}>
              <option value="">Выберите...</option>
              <option>Невыплата денежного довольствия</option>
              <option>Нарушение прав на льготы</option>
              <option>Жилищные вопросы</option>
              <option>Права членов семьи</option>
              <option>Иное</option>
            </select>
          </div>
        </>}
        {sphere === "consumer" && <>
          <Field label="Организация (магазин / компания)" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="Дата покупки / оказания услуги" name="purchaseDate" type="date" value={f("purchaseDate")} onChange={(v) => u("purchaseDate", v)} />
          <Field label="Сумма (₽)" name="amount" type="number" value={f("amount")} onChange={(v) => u("amount", v)} />
          <Field label="Суть нарушения" name="violationDetails" placeholder="Кратко опишите" value={f("violationDetails")} onChange={(v) => u("violationDetails", v)} />
        </>}
        {sphere === "zhkh" && <>
          <Field label="Управляющая компания" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="Адрес объекта" name="objectAddress" value={f("objectAddress")} onChange={(v) => u("objectAddress", v)} />
          <div>
            <label className="label">Вид нарушения <span className="text-bordeaux">*</span></label>
            <select className="input-field" value={f("violationType")} onChange={(e) => u("violationType", e.target.value)}>
              <option value="">Выберите...</option>
              <option>Ненадлежащее содержание общего имущества</option>
              <option>Завышенные тарифы</option>
              <option>Непредоставление коммунальных услуг</option>
              <option>Незаконные начисления</option>
              <option>Иное</option>
            </select>
          </div>
        </>}
        {sphere === "labor" && <>
          <Field label="Работодатель" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="Должность" name="position" value={f("position")} onChange={(v) => u("position", v)} />
          <Field label="Период задолженности" name="debtPeriod" placeholder="Январь–Март 2024" value={f("debtPeriod")} onChange={(v) => u("debtPeriod", v)} />
          <Field label="Сумма задолженности (₽)" name="debtAmount" type="number" value={f("debtAmount")} onChange={(v) => u("debtAmount", v)} />
        </>}
        {sphere === "medicine" && <>
          <Field label="Больница / клиника" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="ФИО врача" name="doctorName" value={f("doctorName")} onChange={(v) => u("doctorName", v)} />
          <Field label="Дата обращения" name="visitDate" type="date" value={f("visitDate")} onChange={(v) => u("visitDate", v)} />
          <Field label="Последствия для здоровья" name="healthConsequences" placeholder="Опишите" value={f("healthConsequences")} onChange={(v) => u("healthConsequences", v)} />
        </>}
        {sphere === "bank" && <>
          <Field label="Название банка / МФО" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="Номер договора" name="contractNumber" value={f("contractNumber")} onChange={(v) => u("contractNumber", v)} />
          <Field label="Сумма спора (₽)" name="amount" type="number" value={f("amount")} onChange={(v) => u("amount", v)} />
          <Field label="Суть нарушения" name="violationDetails" value={f("violationDetails")} onChange={(v) => u("violationDetails", v)} />
        </>}
        {sphere === "education" && <>
          <Field label="Название учебного учреждения" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="ФИО директора / руководителя" name="directorName" value={f("directorName")} onChange={(v) => u("directorName", v)} />
          <Field label="Суть нарушения" name="violationDetails" value={f("violationDetails")} onChange={(v) => u("violationDetails", v)} />
        </>}
        {sphere === "transport" && <>
          <Field label="Перевозчик" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="Номер рейса / маршрута" name="flightNumber" value={f("flightNumber")} onChange={(v) => u("flightNumber", v)} />
          <Field label="Дата поездки" name="travelDate" type="date" value={f("travelDate")} onChange={(v) => u("travelDate", v)} />
          <Field label="Сумма ущерба (₽)" name="damageAmount" type="number" value={f("damageAmount")} onChange={(v) => u("damageAmount", v)} />
        </>}
        {sphere === "gosuslugi" && <>
          <Field label="Название органа / МФЦ" name="organization" value={f("organization")} onChange={(v) => u("organization", v)} />
          <Field label="ФИО должностного лица" name="officialName" value={f("officialName")} onChange={(v) => u("officialName", v)} />
          <Field label="Дата обращения" name="visitDate" type="date" value={f("visitDate")} onChange={(v) => u("visitDate", v)} />
        </>}
      </div>
    );
  }

  // isk
  const s = form.situation || "";
  return (
    <div className="space-y-4">
      {s.includes("брак") && <>
        <Field label="ФИО супруга" name="spouseName" value={f("spouseName")} onChange={(v) => u("spouseName", v)} />
        <Field label="Дата регистрации брака" name="marriageDate" type="date" value={f("marriageDate")} onChange={(v) => u("marriageDate", v)} />
        <Field label="Орган ЗАГС" name="zagsName" value={f("zagsName")} onChange={(v) => u("zagsName", v)} />
        <div>
          <label className="label">Наличие общих детей</label>
          <select className="input-field" value={f("hasChildren")} onChange={(e) => u("hasChildren", e.target.value)}>
            <option value="Нет">Нет</option>
            <option value="Да">Да</option>
          </select>
        </div>
      </>}
      {s.includes("алимент") && <>
        <Field label="ФИО плательщика алиментов" name="payerName" value={f("payerName")} onChange={(v) => u("payerName", v)} />
        <Field label="ФИО ребёнка" name="childName" value={f("childName")} onChange={(v) => u("childName", v)} />
        <Field label="Дата рождения ребёнка" name="childDob" type="date" value={f("childDob")} onChange={(v) => u("childDob", v)} />
        <Field label="Официальный доход плательщика (₽/мес.)" name="payerIncome" type="number" value={f("payerIncome")} onChange={(v) => u("payerIncome", v)} required={false} />
      </>}
      {s.includes("Раздел совместно") && <>
        <Field label="ФИО супруга" name="spouseName" value={f("spouseName")} onChange={(v) => u("spouseName", v)} />
        <Field label="Перечень имущества" name="propertyList" placeholder="Квартира, автомобиль, вклады..." value={f("propertyList")} onChange={(v) => u("propertyList", v)} />
        <Field label="Общая стоимость имущества (₽)" name="propertyValue" type="number" value={f("propertyValue")} onChange={(v) => u("propertyValue", v)} />
        <Field label="Доля истца" name="plaintiffShare" placeholder="1/2" value={f("plaintiffShare")} onChange={(v) => u("plaintiffShare", v)} />
      </>}
      {s.includes("место жительства") && <>
        <Field label="ФИО ребёнка" name="childName" value={f("childName")} onChange={(v) => u("childName", v)} />
        <Field label="Дата рождения ребёнка" name="childDob" type="date" value={f("childDob")} onChange={(v) => u("childDob", v)} />
        <Field label="ФИО второго родителя" name="secondParentName" value={f("secondParentName")} onChange={(v) => u("secondParentName", v)} />
        <Field label="Адрес ответчика" name="respondentAddress" value={f("respondentAddress")} onChange={(v) => u("respondentAddress", v)} />
      </>}
      {s.includes("долга") && <>
        <Field label="ФИО должника" name="debtorName" value={f("debtorName")} onChange={(v) => u("debtorName", v)} />
        <Field label="Сумма долга (₽)" name="debtAmount" type="number" value={f("debtAmount")} onChange={(v) => u("debtAmount", v)} />
        <Field label="Дата займа" name="loanDate" type="date" value={f("loanDate")} onChange={(v) => u("loanDate", v)} />
        <div>
          <label className="label">Наличие расписки</label>
          <select className="input-field" value={f("hasReceipt")} onChange={(e) => u("hasReceipt", e.target.value)}>
            <option value="Да">Да, есть расписка</option>
            <option value="Нет">Нет расписки</option>
            <option value="Договор">Есть договор займа</option>
          </select>
        </div>
      </>}
      {(s.includes("материального ущерба") || s.includes("вреда здоровью") || s.includes("морального вреда")) && <>
        <Field label="ФИО виновника" name="culpritName" value={f("culpritName")} onChange={(v) => u("culpritName", v)} />
        <Field label="Дата события" name="eventDate" type="date" value={f("eventDate")} onChange={(v) => u("eventDate", v)} />
        <Field label="Сумма требований (₽)" name="claimAmount" type="number" value={f("claimAmount")} onChange={(v) => u("claimAmount", v)} />
        <Field label="Характер ущерба / вреда" name="damageDescription" value={f("damageDescription")} onChange={(v) => u("damageDescription", v)} />
      </>}
      {s.includes("ДТП") && <>
        <Field label="ФИО виновника ДТП" name="culpritName" value={f("culpritName")} onChange={(v) => u("culpritName", v)} />
        <Field label="Дата ДТП" name="eventDate" type="date" value={f("eventDate")} onChange={(v) => u("eventDate", v)} />
        <Field label="Гос. номер авто виновника" name="carNumber" placeholder="А000АА77" value={f("carNumber")} onChange={(v) => u("carNumber", v)} />
        <Field label="Сумма ущерба (₽)" name="damageAmount" type="number" value={f("damageAmount")} onChange={(v) => u("damageAmount", v)} />
      </>}
      {s.includes("увольнение") && <>
        <Field label="Работодатель" name="employer" value={f("employer")} onChange={(v) => u("employer", v)} />
        <Field label="Должность" name="position" value={f("position")} onChange={(v) => u("position", v)} />
        <Field label="Дата увольнения" name="dismissalDate" type="date" value={f("dismissalDate")} onChange={(v) => u("dismissalDate", v)} />
        <Field label="Причина увольнения по приказу" name="dismissalReason" value={f("dismissalReason")} onChange={(v) => u("dismissalReason", v)} />
      </>}
      {s.includes("зарплаты") && <>
        <Field label="Работодатель" name="employer" value={f("employer")} onChange={(v) => u("employer", v)} />
        <Field label="Должность" name="position" value={f("position")} onChange={(v) => u("position", v)} />
        <Field label="Период задолженности" name="debtPeriod" placeholder="Январь–Март 2024" value={f("debtPeriod")} onChange={(v) => u("debtPeriod", v)} />
        <Field label="Сумма задолженности (₽)" name="debtAmount" type="number" value={f("debtAmount")} onChange={(v) => u("debtAmount", v)} />
      </>}
      {s.includes("Восстановление на работе") && <>
        <Field label="Работодатель" name="employer" value={f("employer")} onChange={(v) => u("employer", v)} />
        <Field label="Должность" name="position" value={f("position")} onChange={(v) => u("position", v)} />
        <Field label="Дата увольнения" name="dismissalDate" type="date" value={f("dismissalDate")} onChange={(v) => u("dismissalDate", v)} />
        <Field label="Номер приказа об увольнении" name="orderNumber" value={f("orderNumber")} onChange={(v) => u("orderNumber", v)} />
      </>}
      {(s.includes("товар") || s.includes("услугу") || s.includes("неустойки") || s.includes("Расторжение договора")) && <>
        <Field label="Продавец / исполнитель" name="seller" value={f("seller")} onChange={(v) => u("seller", v)} />
        <Field label="Сумма (₽)" name="amount" type="number" value={f("amount")} onChange={(v) => u("amount", v)} />
        <Field label="Дата покупки / заключения договора" name="purchaseDate" type="date" value={f("purchaseDate")} onChange={(v) => u("purchaseDate", v)} />
        {s.includes("неустойки") && <Field label="Период просрочки" name="delayPeriod" placeholder="с 01.01.2024 по 01.03.2024" value={f("delayPeriod")} onChange={(v) => u("delayPeriod", v)} />}
        {s.includes("Расторжение договора") && <Field label="Предмет договора" name="contractSubject" value={f("contractSubject")} onChange={(v) => u("contractSubject", v)} />}
      </>}
      {s.includes("Выселение") && <>
        <Field label="ФИО ответчика" name="respondentName" value={f("respondentName")} onChange={(v) => u("respondentName", v)} />
        <Field label="Адрес объекта" name="objectAddress" value={f("objectAddress")} onChange={(v) => u("objectAddress", v)} />
        <div>
          <label className="label">Основание выселения</label>
          <select className="input-field" value={f("evictionBasis")} onChange={(e) => u("evictionBasis", e.target.value)}>
            <option value="">Выберите...</option>
            <option>Прекращение права пользования жилым помещением</option>
            <option>Неоплата коммунальных услуг</option>
            <option>Систематическое нарушение прав соседей</option>
            <option>Развод (бывший член семьи)</option>
          </select>
        </div>
      </>}
      {s.includes("застройщиком") && <>
        <Field label="Застройщик" name="developer" value={f("developer")} onChange={(v) => u("developer", v)} />
        <Field label="Номер ДДУ" name="dduNumber" value={f("dduNumber")} onChange={(v) => u("dduNumber", v)} />
        <Field label="Адрес объекта" name="objectAddress" value={f("objectAddress")} onChange={(v) => u("objectAddress", v)} />
        <Field label="Сумма требований (₽)" name="claimAmount" type="number" value={f("claimAmount")} onChange={(v) => u("claimAmount", v)} />
      </>}
      {s.includes("лицевого счёта") && <>
        <Field label="Адрес квартиры" name="objectAddress" value={f("objectAddress")} onChange={(v) => u("objectAddress", v)} />
        <Field label="ФИО совладельцев" name="coOwners" value={f("coOwners")} onChange={(v) => u("coOwners", v)} />
        <Field label="Доля истца" name="plaintiffShare" placeholder="1/2" value={f("plaintiffShare")} onChange={(v) => u("plaintiffShare", v)} />
      </>}
      {s.includes("Истребование") && <>
        <Field label="ФИО владельца" name="currentOwnerName" value={f("currentOwnerName")} onChange={(v) => u("currentOwnerName", v)} />
        <Field label="Описание имущества" name="propertyDescription" value={f("propertyDescription")} onChange={(v) => u("propertyDescription", v)} />
        <Field label="Стоимость имущества (₽)" name="propertyValue" type="number" value={f("propertyValue")} onChange={(v) => u("propertyValue", v)} />
      </>}
      {s.includes("Признание права собственности") && <>
        <Field label="Описание объекта" name="propertyDescription" value={f("propertyDescription")} onChange={(v) => u("propertyDescription", v)} />
        <Field label="Адрес объекта" name="objectAddress" value={f("objectAddress")} onChange={(v) => u("objectAddress", v)} />
        <div>
          <label className="label">Основание возникновения права</label>
          <select className="input-field" value={f("ownershipBasis")} onChange={(e) => u("ownershipBasis", e.target.value)}>
            <option value="">Выберите...</option>
            <option>Наследование</option>
            <option>Приобретательная давность</option>
            <option>Самовольная постройка</option>
            <option>Договор</option>
          </select>
        </div>
      </>}
      {s.includes("ст. 125") && <>
        <Field label="ФИО и должность обжалуемого лица" name="officialInfo" value={f("officialInfo")} onChange={(v) => u("officialInfo", v)} />
        <Field label="Номер уголовного дела" name="caseNumber" value={f("caseNumber")} onChange={(v) => u("caseNumber", v)} />
        <Field label="Дата обжалуемого решения" name="decisionDate" type="date" value={f("decisionDate")} onChange={(v) => u("decisionDate", v)} />
        <Field label="Суть обжалуемого решения" name="decisionDetails" value={f("decisionDetails")} onChange={(v) => u("decisionDetails", v)} />
      </>}
    </div>
  );
}

export default function Step3({ form, updateForm, onNext, onPrev }: Props) {
  const f = (k: string) => form[k] || "";
  const u = (k: string, v: string) => updateForm({ [k]: v });

  function handlePhone(raw: string) {
    updateForm({ phone: formatPhone(raw) });
  }

  const commonFilled = f("lastName") && f("firstName") && f("dob") && f("address") && f("phone") && f("email");

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-dark mb-2">Ваши данные</h2>
      <p className="text-gray-500 text-sm mb-6">Заполните личные данные для документа</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Фамилия" name="lastName" value={f("lastName")} onChange={(v) => u("lastName", v)} placeholder="Иванов" />
          <Field label="Имя" name="firstName" value={f("firstName")} onChange={(v) => u("firstName", v)} placeholder="Иван" />
          <Field label="Отчество" name="middleName" value={f("middleName")} onChange={(v) => u("middleName", v)} placeholder="Иванович" required={false} />
        </div>
        <Field label="Дата рождения" name="dob" type="date" value={f("dob")} onChange={(v) => u("dob", v)} />
        <Field label="Адрес регистрации" name="address" placeholder="г. Москва, ул. Примерная, д. 1, кв. 1" value={f("address")} onChange={(v) => u("address", v)} />
        <div>
          <label className="label">Телефон <span className="text-bordeaux">*</span></label>
          <input
            type="tel"
            className="input-field"
            placeholder="+7 (999) 999-99-99"
            value={f("phone")}
            onChange={(e) => handlePhone(e.target.value)}
          />
        </div>
        <Field label="Email" name="email" type="email" placeholder="example@mail.ru" value={f("email")} onChange={(v) => u("email", v)} />

        {/* Specific fields */}
        <div className="border-t border-beige-dark pt-4 mt-2">
          <SpecificFields form={form} updateForm={updateForm} />
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onPrev} className="btn-outline flex-1 py-3 rounded-lg">Назад</button>
        <button
          onClick={() => {
            if (commonFilled) {
              updateForm({
                fio: `${f("lastName")} ${f("firstName")} ${f("middleName")}`.trim(),
              });
              onNext();
            }
          }}
          disabled={!commonFilled}
          className="btn-primary flex-1 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
