import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "./contact.ts";

const valid = {
  name: "Anna",
  email: "anna@example.com",
  message: "Dzień dobry, mam pytanie.",
  website: "",
};

test("accepts a valid message and trims fields", () => {
  const result = validateContact({ ...valid, name: "  Anna  " });
  assert.deepEqual(result, {
    ok: true,
    spam: false,
    data: { name: "Anna", email: "anna@example.com", message: "Dzień dobry, mam pytanie." },
  });
});

test("reports an empty name as required", () => {
  assert.deepEqual(validateContact({ ...valid, name: "   " }), { ok: false, errors: { name: "required" } });
});

test("reports a too long name", () => {
  assert.deepEqual(validateContact({ ...valid, name: "a".repeat(101) }), { ok: false, errors: { name: "tooLong" } });
});

test("tells an empty email from a malformed one", () => {
  assert.deepEqual(validateContact({ ...valid, email: "" }), { ok: false, errors: { email: "required" } });
  assert.deepEqual(validateContact({ ...valid, email: "anna@" }), { ok: false, errors: { email: "invalid" } });
});

test("tells an empty, a too short and a too long message apart", () => {
  assert.deepEqual(validateContact({ ...valid, message: " " }), { ok: false, errors: { message: "required" } });
  assert.deepEqual(validateContact({ ...valid, message: "hej" }), { ok: false, errors: { message: "tooShort" } });
  assert.deepEqual(validateContact({ ...valid, message: "a".repeat(5001) }), {
    ok: false,
    errors: { message: "tooLong" },
  });
});

test("reports every invalid field at once", () => {
  assert.deepEqual(validateContact({ name: "", email: "x", message: "", website: "" }), {
    ok: false,
    errors: { name: "required", email: "invalid", message: "required" },
  });
});

test("flags a filled honeypot as spam", () => {
  const result = validateContact({ ...valid, website: "http://spam.example" });
  assert.equal(result.ok && result.spam, true);
});
