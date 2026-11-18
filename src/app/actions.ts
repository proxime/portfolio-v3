"use server";

import { type ContactState, validateContact } from "@/lib/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

/**
 * Sends the contact form through Resend.
 * Needs RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL; without them the visitor
 * gets the error state with the e-mail fallback, never a fake success.
 */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };

  const result = validateContact({ ...values, website: field(formData, "website") });
  // The browser runs the same validation first; this covers direct requests and visitors without JavaScript.
  if (!result.ok) return { status: "error", error: "validation", errors: result.errors, values };
  // Bots that fill the honeypot get a success response and nothing is sent.
  if (result.spam) return { status: "sent" };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contact form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return { status: "error", error: "send", values };
  }

  const { name, email, message } = result.data;
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio: ${name}`,
        text: `${message}\n\n${name} <${email}>`,
      }),
    });
    if (!response.ok) {
      console.error(`Resend rejected the contact message: ${response.status} ${await response.text()}`);
      return { status: "error", error: "send", values };
    }
  } catch (error) {
    console.error("Sending the contact message failed:", error);
    return { status: "error", error: "send", values };
  }

  return { status: "sent" };
}
