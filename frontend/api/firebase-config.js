function normalizeMeasurementId(measurementId) {
  if (!measurementId) return undefined;

  const value = String(measurementId).trim().replace(/\s+/g, "");
  return value ? value.replace(/[Øø]/g, "0") : undefined;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const configSecret = process.env.FIREBASE_CONFIG_SECRET;
  if (configSecret) {
    const provided = req.headers["x-firebase-config-secret"];
    if (!provided || provided !== configSecret) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const requestOrigin = req.headers.origin || "";
  if (allowedOrigin && requestOrigin !== allowedOrigin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const config = {
    apiKey: process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || "",
    measurementId: normalizeMeasurementId(process.env.FIREBASE_MEASUREMENT_ID || process.env.VITE_FIREBASE_MEASUREMENT_ID || "")
  };

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(config);
}
