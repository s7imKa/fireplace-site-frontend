"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

type CallbackRequest = { id: string; name: string; phone: string; createdAt: string };

const inputClass =
  "h-11 rounded-md border border-input-border bg-white px-3 text-base font-normal placeholder:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

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
    return (
      <p role="status" className="text-success">
        Дякуємо! Ми вам передзвонимо.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <h2 className="text-3xl leading-tight font-semibold md:text-4xl">Передзвоніть мені</h2>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Ім&apos;я
        <input
          className={inputClass}
          placeholder="Іван"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Телефон
        <input
          className={inputClass}
          type="tel"
          placeholder="+380XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="\+380\d{9}"
          title="Формат: +380XXXXXXXXX"
        />
      </label>
      {errors.length > 0 && (
        <ul role="alert" className="text-sm text-error">
          {errors.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-11 rounded-md bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite active:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        {status === "sending" ? "Надсилаємо..." : "Передзвоніть мені"}
      </button>
    </form>
  );
}
