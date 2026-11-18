"use client";

import { type ReactNode, type SubmitEvent, useActionState, useState } from "react";
import { sendContactMessage } from "@/app/actions";
import type { ContactFormCopy } from "@/content/types";
import {
  type ContactErrors,
  type ContactField,
  type ContactState,
  EMAIL_MAX,
  MESSAGE_MAX,
  NAME_MAX,
  validateContact,
} from "@/lib/contact";
import { Icon } from "./Icon";

const initialState: ContactState = { status: "idle" };
const fields: ContactField[] = ["name", "email", "message"];
const labelClass = "text-xs font-medium uppercase tracking-widest text-zinc-500";

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const text = (name: string) => String(data.get(name) ?? "");
  return { name: text("name"), email: text("email"), message: text("message"), website: text("website") };
}

/** Label, control and the error message under it. The control is tied to the message for screen readers. */
function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm leading-snug text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ copy, email }: { copy: ContactFormCopy; email: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  // Errors found in the browser on the last submit attempt; null when that attempt went to the server.
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
  // Fields changed since the last submit attempt: their errors and the "sent" label are dropped.
  const [edited, setEdited] = useState<ContactField[]>([]);

  // React resets the form after every action, so a failed submission restores what was typed.
  const values = state.status === "error" ? state.values : undefined;
  const serverErrors = state.status === "error" && state.error === "validation" ? state.errors : {};
  const errors = clientErrors ?? serverErrors;
  const sent = state.status === "sent" && edited.length === 0 && !pending;

  const messageFor = (field: ContactField) => {
    const code = errors[field];
    return code && !edited.includes(field) ? copy.fieldErrors[field][code] : undefined;
  };
  // Attributes that mark a control as invalid and point at its message.
  const invalidProps = (field: ContactField) =>
    messageFor(field) ? { "aria-invalid": true, "aria-describedby": `contact-${field}-error` } : {};

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const result = validateContact(readForm(form));
    setEdited([]);
    if (result.ok) {
      setClientErrors(null);
      return; // The form action takes it from here.
    }
    // Stopping the submit here keeps the typed values: the action never runs, so React does not reset the form.
    event.preventDefault();
    setClientErrors(result.errors);
    const firstInvalid = fields.find((field) => result.errors[field]);
    if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
  };

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      onChange={(event) => {
        // The event bubbles up from whichever control was edited.
        const control: EventTarget = event.target;
        if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) return;
        const field = fields.find((name) => name === control.name);
        if (field) setEdited((current) => (current.includes(field) ? current : [...current, field]));
      }}
      // Browser validation bubbles are off; every message is rendered by the form in the page's language.
      noValidate
      className="card card-static flex flex-col gap-5 p-6 md:p-8"
    >
      <div className="grid items-start gap-5 sm:grid-cols-2">
        <Field id="contact-name" label={copy.name} error={messageFor("name")}>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            maxLength={NAME_MAX}
            autoComplete="name"
            placeholder={copy.namePh}
            defaultValue={values?.name}
            className="field"
            {...invalidProps("name")}
          />
        </Field>
        <Field id="contact-email" label={copy.email} error={messageFor("email")}>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            maxLength={EMAIL_MAX}
            autoComplete="email"
            placeholder={copy.emailPh}
            defaultValue={values?.email}
            className="field"
            {...invalidProps("email")}
          />
        </Field>
      </div>
      <Field id="contact-message" label={copy.message} error={messageFor("message")}>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          maxLength={MESSAGE_MAX}
          placeholder={copy.messagePh}
          defaultValue={values?.message}
          className="field resize-none"
          {...invalidProps("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology, filled only by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {state.status === "error" && state.error === "send" && !pending && (
        <p role="alert" className="text-sm leading-relaxed text-rose-300">
          {copy.errorSend} {copy.errorFallback}{" "}
          <a href={`mailto:${email}`} className="font-mono underline underline-offset-4 hover:text-rose-200">
            {email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-grad inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold text-white"
      >
        {pending && (
          <span
            aria-hidden="true"
            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin"
          />
        )}
        {/* The key restarts the label's fade whenever the state changes. */}
        <span key={pending ? "sending" : sent ? "sent" : "send"} aria-live="polite" className="label-in">
          {pending ? copy.sending : sent ? copy.sent : copy.send}
        </span>
        {sent && <Icon name="check" className="draw-check h-4 w-4" />}
        {!pending && !sent && <Icon name="arrowUpRight" className="h-4 w-4" />}
      </button>
    </form>
  );
}
