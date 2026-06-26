"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconScale, IconLoader2 } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Неверный email или пароль");
    }
  }

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-playfair text-2xl font-bold text-bordeaux">
            <IconScale size={28} />
            LexAI
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-dark mt-4">Вход в аккаунт</h1>
          <p className="text-gray-500 mt-2">Введите ваши данные для входа</p>
        </div>
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                required
              />
            </div>
            <div>
              <label className="label">Пароль</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Войти
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Нет аккаунта?{" "}
            <Link href="/auth/register" className="text-bordeaux font-medium hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
