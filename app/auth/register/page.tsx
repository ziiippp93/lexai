"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconScale, IconLoader2 } from "@tabler/icons-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function change(field: string, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Пароли не совпадают");
      return;
    }
    if (form.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      router.push("/auth/login?registered=1");
    } else {
      setError(data.error || "Ошибка регистрации");
    }
  }

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-playfair text-2xl font-bold text-bordeaux">
            <IconScale size={28} />
            LexAI
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-dark mt-4">Создать аккаунт</h1>
          <p className="text-gray-500 mt-2">Регистрация займёт меньше минуты</p>
        </div>
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="label">Полное имя</label>
              <input
                type="text"
                className="input-field"
                value={form.name}
                onChange={(e) => change("name", e.target.value)}
                placeholder="Иванов Иван Иванович"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                value={form.email}
                onChange={(e) => change("email", e.target.value)}
                placeholder="example@mail.ru"
                required
              />
            </div>
            <div>
              <label className="label">Пароль</label>
              <input
                type="password"
                className="input-field"
                value={form.password}
                onChange={(e) => change("password", e.target.value)}
                placeholder="Минимум 6 символов"
                required
              />
            </div>
            <div>
              <label className="label">Повторите пароль</label>
              <input
                type="password"
                className="input-field"
                value={form.confirm}
                onChange={(e) => change("confirm", e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading && <IconLoader2 size={18} className="animate-spin" />}
              Зарегистрироваться
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Уже есть аккаунт?{" "}
            <Link href="/auth/login" className="text-bordeaux font-medium hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
