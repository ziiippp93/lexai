"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { IconMenu2, IconX, IconScale, IconMessageCircle } from "@tabler/icons-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-dark text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-playfair text-xl font-bold text-gold">
            <IconScale size={24} />
            LexAI
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/services" className="hover:text-gold transition-colors">Услуги</Link>
            <Link href="/about" className="hover:text-gold transition-colors">О нас</Link>
            <Link href="/contacts" className="hover:text-gold transition-colors">Контакты</Link>
            <Link href="/chat" className="flex items-center gap-1 hover:text-gold transition-colors">
              <IconMessageCircle size={16} />
              AI-Юрист
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/dashboard" className="text-sm hover:text-gold transition-colors">Кабинет</Link>
                <button onClick={() => signOut()} className="btn-gold text-sm px-4 py-2">Выйти</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm hover:text-gold transition-colors">Войти</Link>
                <Link href="/generate" className="btn-gold text-sm px-4 py-2 rounded-lg">Получить документ</Link>
              </>
            )}
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-dark border-t border-gray-700 px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4 text-sm">
            <Link href="/services" onClick={() => setOpen(false)} className="hover:text-gold">Услуги</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-gold">О нас</Link>
            <Link href="/contacts" onClick={() => setOpen(false)} className="hover:text-gold">Контакты</Link>
            <Link href="/chat" onClick={() => setOpen(false)} className="hover:text-gold flex items-center gap-1">
              <IconMessageCircle size={16} />
              AI-Юрист
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="hover:text-gold">Личный кабинет</Link>
                <button onClick={() => signOut()} className="btn-gold text-sm px-4 py-2 w-full">Выйти</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setOpen(false)} className="hover:text-gold">Войти</Link>
                <Link href="/generate" onClick={() => setOpen(false)} className="btn-gold text-sm px-4 py-2 text-center rounded-lg">Получить документ</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
