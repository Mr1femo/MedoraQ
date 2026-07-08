import type { FormData } from "./form-data";

export async function submitForm(data: FormData): Promise<void> {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl || scriptUrl.includes("YOUR_SCRIPT_ID")) {
    throw new Error(
      "Google Script URL is not configured. Set NEXT_PUBLIC_GOOGLE_SCRIPT_URL in your environment."
    );
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      submittedAt: new Date().toISOString(),
    }),
  });

  // no-cors mode returns opaque response; we assume success if no network error
  if (response.type === "opaque") return;
  if (!response.ok) {
    throw new Error("Failed to submit form. Please try again.");
  }
}
