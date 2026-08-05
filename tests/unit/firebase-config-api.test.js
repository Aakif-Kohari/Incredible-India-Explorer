import { describe, it, expect, beforeEach, afterEach } from 'vitest';

function createReq({ method = 'GET', origin } = {}) {
  const headers = {};
  if (origin !== undefined) headers.origin = origin;
  return { method, headers };
}

function createRes() {
  const res = {
    _status: null,
    _json: null,
    _headers: {},
    status(code) { res._status = code; return res; },
    json(data) { res._json = data; return res; },
    setHeader(k, v) { res._headers[k] = v; }
  };
  return res;
}

async function loadHandler() {
  const mod = await import('../../frontend/api/firebase-config.js');
  return mod.default;
}

describe('frontend/api/firebase-config.js', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.FIREBASE_API_KEY = 'test-key';
    process.env.FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';
    process.env.FIREBASE_PROJECT_ID = 'test-project';
    process.env.FIREBASE_STORAGE_BUCKET = 'test.appspot.com';
    process.env.FIREBASE_MESSAGING_SENDER_ID = '123456';
    process.env.FIREBASE_APP_ID = '1:123:web:abc';
    process.env.FIREBASE_MEASUREMENT_ID = 'G-TEST123';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns 405 for POST requests', async () => {
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq({ method: 'POST' }), res);
    expect(res._status).toBe(405);
    expect(res._json.error).toBe('Method not allowed');
  });

  it('returns 405 for DELETE requests', async () => {
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq({ method: 'DELETE' }), res);
    expect(res._status).toBe(405);
  });

  it('returns 200 with config when ALLOWED_ORIGIN is not set', async () => {
    delete process.env.ALLOWED_ORIGIN;
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq(), res);
    expect(res._status).toBe(200);
    expect(res._json.apiKey).toBe('test-key');
    expect(res._json.projectId).toBe('test-project');
  });

  it('returns 200 when origin matches ALLOWED_ORIGIN exactly', async () => {
    process.env.ALLOWED_ORIGIN = 'https://trusted.example.com';
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq({ origin: 'https://trusted.example.com' }), res);
    expect(res._status).toBe(200);
    expect(res._json.apiKey).toBe('test-key');
  });

  it('returns 403 when origin does not match ALLOWED_ORIGIN', async () => {
    process.env.ALLOWED_ORIGIN = 'https://trusted.example.com';
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq({ origin: 'https://evil.com' }), res);
    expect(res._status).toBe(403);
    expect(res._json.error).toBe('Forbidden');
  });

  it('returns 403 when no Origin header is sent and ALLOWED_ORIGIN is set', async () => {
    process.env.ALLOWED_ORIGIN = 'https://trusted.example.com';
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq(), res);
    expect(res._status).toBe(403);
  });

  it('returns 403 for prefix-spoofed origin', async () => {
    process.env.ALLOWED_ORIGIN = 'https://trusted.example.com';
    const handler = await loadHandler();
    const res = createRes();
    await handler(createReq({ origin: 'https://trusted.example.com.evil.com' }), res);
    expect(res._status).toBe(403);
  });
});
