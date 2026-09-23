/** Add your own hosted payment URL here when it is ready. Never put API keys here. */
export const paymentSettings = {
  url: "",
  buttonLabel: "Pay for your project",
};

export function getPaymentUrl(): string | null {
  try {
    const url = new URL(paymentSettings.url);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
