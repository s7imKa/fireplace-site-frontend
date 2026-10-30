"use client";

import { useId, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

type CallbackRequest = { id: string; name: string; phone: string; createdAt: string };

/**
 * Форма «Передзвоніть мені».
 * Надсилає лише ті поля, які підтримує API: POST /callback-requests { name, phone }.
 */
export function CallbackForm({
  variant = "light",
  submitLabel = "Передзвоніть мені",
  successText = "Дякуємо! Ми вам передзвонимо.",
  layout = "stack",
}: {
  variant?: "light" | "dark";
  submitLabel?: string;
  successText?: string;
  /** row — поля в один ряд на sm+ */
  layout?: "stack" | "row";
}) {
  const id = useId();
  const dark = variant === "dark";
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
      <div role="status" className={cn("flex items-start gap-4 rounded-lg p-5", dark ? "bg-white/5" : "bg-warm-bg")}>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-white">
          <Icon name="check" size={20} strokeWidth={2.2} />
        </span>
        <div>
          <p className={cn("font-display text-lg font-semibold", dark ? "text-success-dark" : "text-success")}>{successText}</p>
          <p className={cn("mt-1 text-sm", dark ? "text-text-secondary-dark" : "text-text-secondary")}>
            Менеджер зв’яжеться з вами найближчим часом.
          </p>
        </div>
      </div>
    );
  }

  const label = cn("flex flex-col gap-1.5 text-sm font-medium", dark ? "text-white/85" : "text-text-primary");
  const input = cn(
    "h-12 w-full rounded-md border px-4 text-base font-normal transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
    dark
      ? "border-border-dark bg-white/[0.04] text-white placeholder:text-text-secondary-dark focus-visible:outline-accent"
      : "border-input-border bg-white text-text-primary placeholder:text-text-secondary focus-visible:outline-graphite",
  );

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <div className={cn("grid gap-4", layout === "row" && "sm:grid-cols-2")}>
        <label className={label} htmlFor={`${id}-name`}>
          Ім’я
          <input
            id={`${id}-name`}
            className={input}
            placeholder="Іван"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />
        </label>
        <label className={label} htmlFor={`${id}-phone`}>
          Телефон
          <input
            id={`${id}-phone`}
            className={input}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+380XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="\+380\d{9}"
            title="Формат: +380XXXXXXXXX"
          />
        </label>
      </div>
      {errors.length > 0 && (
        <ul role="alert" className={cn("text-sm", dark ? "text-error-dark" : "text-error")}>
          {errors.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className={cn(
          "h-12 rounded-md bg-accent px-6 font-display font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none",
          dark ? "focus-visible:outline-accent" : "focus-visible:outline-graphite",
        )}
      >
        {status === "sending" ? "Надсилаємо..." : submitLabel}
      </button>
      <p className={cn("text-xs leading-relaxed", dark ? "text-text-secondary-dark" : "text-text-secondary")}>
        Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних.
      </p>
    </form>
  );
}
