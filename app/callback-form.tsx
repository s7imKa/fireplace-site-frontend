"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

type CallbackRequest = { id: string; name: string; phone: string; createdAt: string };

export function CallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors([]);
    try {
      await apiFetch<CallbackRequest>("/callback-requests", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      setStatus("done");
    } catch (err) {
      const message = err instanceof ApiError ? (err.body as { message?: unknown })?.message : null;
      setErrors(Array.isArray(message) ? message : ["Не вдалося надіслати заявку. Спробуйте пізніше."]);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return <p>Дякуємо! Ми вам передзвонимо.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-3">
      <h2 className="text-xl font-semibold">Передзвоніть мені</h2>
      <input
        className="rounded border px-3 py-2"
        placeholder="Ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={100}
      />
      <input
        className="rounded border px-3 py-2"
        type="tel"
        placeholder="+380XXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        pattern="\+380\d{9}"
        title="Формат: +380XXXXXXXXX"
      />
      {errors.length > 0 && (
        <ul className="text-sm text-red-600">
          {errors.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {status === "sending" ? "Надсилаємо..." : "Передзвоніть мені"}
      </button>
    </form>
  );
}
