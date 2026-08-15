// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const defaultFirebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

function normalizeMeasurementId(measurementId) {
  if (!measurementId) return undefined;

  const value = String(measurementId).trim().replace(/\s+/g, "");
  if (!value || value === "YOUR_MEASUREMENT_ID") return undefined;

  return value.replace(/[Øø]/g, "0");
}

function sanitizeFirebaseConfig(config) {
  if (!config || typeof config !== "object") {
    return {};
  }

  const sanitized = { ...config };

  for (const key of Object.keys(sanitized)) {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitized[key].trim();
    }
  }

  if (sanitized.measurementId) {
    sanitized.measurementId = normalizeMeasurementId(sanitized.measurementId);
  }

  if (!sanitized.measurementId) {
    delete sanitized.measurementId;
  }

  return sanitized;
}

function hasRequiredFirebaseConfig(config) {
  return Boolean(
    config?.apiKey &&
    config.apiKey !== "YOUR_API_KEY" &&
    config?.projectId &&
    config.projectId !== "YOUR_PROJECT" &&
    config?.appId &&
    config.appId !== "YOUR_APP_ID"
  );
}

function readRuntimeFirebaseConfig() {
  const globalScope = typeof globalThis !== "undefined" ? globalThis : {};
  const runtimeConfig =
    globalScope.__FIREBASE_CONFIG__ ||
    globalScope.__ENV__?.firebase ||
    globalScope.__ENV__?.FIREBASE_CONFIG ||
    null;

  if (runtimeConfig) {
    return sanitizeFirebaseConfig(runtimeConfig);
  }

  const metaEnv = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : null;
  if (metaEnv) {
    return sanitizeFirebaseConfig({
      apiKey: metaEnv.VITE_FIREBASE_API_KEY || metaEnv.FIREBASE_API_KEY || metaEnv.NEXT_PUBLIC_FIREBASE_API_KEY || undefined,
      authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || metaEnv.FIREBASE_AUTH_DOMAIN || undefined,
      projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || metaEnv.FIREBASE_PROJECT_ID || undefined,
      storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || metaEnv.FIREBASE_STORAGE_BUCKET || undefined,
      messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || metaEnv.FIREBASE_MESSAGING_SENDER_ID || undefined,
      appId: metaEnv.VITE_FIREBASE_APP_ID || metaEnv.FIREBASE_APP_ID || undefined,
      measurementId: metaEnv.VITE_FIREBASE_MEASUREMENT_ID || metaEnv.FIREBASE_MEASUREMENT_ID || undefined
    });
  }

  return sanitizeFirebaseConfig(defaultFirebaseConfig);
}

function getFirebaseConfigEndpointCandidates() {
  const candidates = [];
  const globalScope = typeof globalThis !== "undefined" ? globalThis : {};

  if (globalScope.__FIREBASE_CONFIG_ENDPOINT__) {
    candidates.push(globalScope.__FIREBASE_CONFIG_ENDPOINT__);
  }

  if (globalScope.__FIREBASE_CONFIG_URL__) {
    candidates.push(globalScope.__FIREBASE_CONFIG_URL__);
  }

  if (typeof window !== "undefined") {
    candidates.push(new URL("./firebase-config.json", window.location.href).toString());
    candidates.push(new URL("/firebase-config.json", window.location.origin).toString());
    candidates.push(new URL("./frontend/api/firebase-config", window.location.href).toString());
    candidates.push(new URL("/frontend/api/firebase-config", window.location.origin).toString());
  }

  candidates.push("/firebase-config.json");
  candidates.push("/frontend/api/firebase-config");
  return [...new Set(candidates)];
}

async function loadRemoteFirebaseConfig() {
  // Remote fetching is disabled to prevent 404 console errors when running locally.
  // If you add a real backend or firebase-config.json, you can restore this logic.
  return null;
}

async function loadFirebaseConfig() {
  const runtimeConfig = readRuntimeFirebaseConfig();
  const hasPlaceholderValues =
    !runtimeConfig?.apiKey ||
    runtimeConfig.apiKey === "YOUR_API_KEY" ||
    !runtimeConfig?.projectId ||
    runtimeConfig.projectId === "YOUR_PROJECT";

  if (!hasPlaceholderValues) {
    return runtimeConfig;
  }

  const remoteConfig = await loadRemoteFirebaseConfig();
  return remoteConfig || runtimeConfig;
}

const firebaseConfig = await loadFirebaseConfig();
const isFirebaseConfigured = hasRequiredFirebaseConfig(firebaseConfig);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
const auth = isFirebaseConfigured ? getAuth(app) : null;
const googleProvider = isFirebaseConfigured ? new GoogleAuthProvider() : null;

isSupported().then((supported) => {
  if (supported && app) {
    getAnalytics(app);
  }
});

export { app, auth, googleProvider, isFirebaseConfigured, firebaseConfig };
