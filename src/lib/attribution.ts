// Browser-only: captures UTM params + referrer on the first visit of the session.
const KEY = "gd-attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | "referrer", string>>;

export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k)?.trim();
      if (v) data[k] = v.slice(0, 200);
    }
    const ref = document.referrer;
    if (ref && !ref.startsWith(window.location.origin)) data.referrer = ref.slice(0, 500);
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage unavailable — ignore
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
