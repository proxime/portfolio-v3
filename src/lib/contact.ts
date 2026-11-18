export type ContactInput = {
  name: string;
  email: string;
  message: string;
  /** Honeypot field: real visitors never see or fill it. */
  website: string;
};

export type ContactData = { name: string; email: string; message: string };
export type ContactField = "name" | "email" | "message";

/** Why a field was rejected. The form maps each code to a message in the page's language. */
export type ContactErrorCode = "required" | "invalid" | "tooShort" | "tooLong";
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactValidation =
  | { ok: true; spam: boolean; data: ContactData }
  | { ok: false; errors: ContactErrors };

/** State of the contact form returned by the server action. */
export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; error: "validation"; errors: ContactErrors; values: ContactData }
  | { status: "error"; error: "send"; values: ContactData };

export const NAME_MAX = 100;
export const EMAIL_MAX = 200;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the contact form. Runs in the browser before submitting and again in the server action,
 * so both sides apply exactly the same rules. Reports every invalid field, not just the first.
 */
export function validateContact(input: ContactInput): ContactValidation {
  const data: ContactData = {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  };
  const errors: ContactErrors = {};

  if (data.name.length === 0) errors.name = "required";
  else if (data.name.length > NAME_MAX) errors.name = "tooLong";

  if (data.email.length === 0) errors.email = "required";
  else if (data.email.length > EMAIL_MAX || !EMAIL_PATTERN.test(data.email)) errors.email = "invalid";

  if (data.message.length === 0) errors.message = "required";
  else if (data.message.length < MESSAGE_MIN) errors.message = "tooShort";
  else if (data.message.length > MESSAGE_MAX) errors.message = "tooLong";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, spam: input.website.trim() !== "", data };
}
