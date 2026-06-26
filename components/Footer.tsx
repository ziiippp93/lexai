import Link from "next/link";
import { IconScale, IconPhone, IconMail, IconMapPin } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-playfair text-xl font-bold text-gold mb-3">
              <IconScale size={24} />
              LexAI
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Профессиональная юридическая помощь онлайн. Документы для защиты ваших прав.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services#crime" className="hover:text-white transition-colors">Заявление о преступлении</Link></li>
              <li><Link href="/services#prokuratura" className="hover:text-white transition-colors">Заявление в прокуратуру</Link></li>
              <li><Link href="/services#zhaloba" className="hover:text-white transition-colors">Жалоба</Link></li>
              <li><Link href="/services#isk" className="hover:text-white transition-colors">Исковое заявление</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
              <li><Link href="/generate" className="hover:text-white transition-colors">Создать документ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><IconPhone size={16} /><span>+7 (800) 000-00-00</span></li>
              <li className="flex items-center gap-2"><IconMail size={16} /><span>info@lexai.ru</span></li>
              <li className="flex items-center gap-2"><IconMapPin size={16} /><span>Москва, ул. Пример, д. 1</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} LexAI. Все права защищены.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
