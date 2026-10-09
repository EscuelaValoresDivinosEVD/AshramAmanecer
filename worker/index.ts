// Cloudflare Worker: serves the static site (out/) and a tiny admin API used by
// /admin/imagenes/ to replace images. Every change is a commit on GitHub;
// Cloudflare then rebuilds and publishes the site.
//
// Secrets (Cloudflare dashboard → Worker → Settings → Variables and Secrets):
//   ADMIN_PASSWORD  password typed in the admin page
//   GITHUB_TOKEN    fine-grained token, Contents: read & write, this repo only

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
  ADMIN_PASSWORD?: string;
  GITHUB_TOKEN?: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH: string;
  /** Override only for local tests. */
  GITHUB_API?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8" } });

const MAX_UPLOAD = 8 * 1024 * 1024;

async function sameSecret(a: string, b: string) {
  // Compare digests so timing does not depend on where the strings differ.
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const u = new Uint8Array(x), v = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < u.length; i++) d |= u[i] ^ v[i];
  return d === 0;
}

function b64encode(bytes: Uint8Array) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
const b64decodeText = (b64: string) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, "")), (c) => c.charCodeAt(0)));

async function gh(env: Env, path: string, init?: RequestInit) {
  const res = await fetch(`${env.GITHUB_API || "https://api.github.com"}/repos/${env.GITHUB_REPO}/contents/${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${env.GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "user-agent": "ashram-admin",
      "content-type": "application/json",
    },
  });
  return res;
}

async function replaceImage(env: Env, body: { file: string; ptr: (string | number)[]; from: string; to: string }) {
  const { file, ptr, from, to } = body;
  if (!/^src\/content\/[a-z0-9/-]+\.json$/.test(file) || file.includes("..")) return json({ error: "Archivo no permitido" }, 400);
  if (!Array.isArray(ptr) || !ptr.length) return json({ error: "Posición inválida" }, 400);
  if (typeof to !== "string" || !/^(\/img\/[\w./-]+|https:\/\/\S+)$/.test(to)) return json({ error: "La nueva dirección debe empezar con /img/ o https://" }, 400);

  const cur = await gh(env, `${file}?ref=${env.GITHUB_BRANCH}`);
  if (!cur.ok) return json({ error: `GitHub respondió ${cur.status} al leer ${file}` }, 502);
  const meta = (await cur.json()) as { content: string; sha: string };
  const data = JSON.parse(b64decodeText(meta.content));

  let node = data;
  for (const k of ptr.slice(0, -1)) node = node?.[k];
  const last = ptr[ptr.length - 1];
  if (!node || node[last] !== from)
    return json({ error: "Esa imagen cambió desde que abriste la página. Recarga e inténtalo de nuevo." }, 409);
  node[last] = to;

  const text = JSON.stringify(data, null, 2) + "\n";
  const put = await gh(env, file, {
    method: "PUT",
    body: JSON.stringify({
      message: `Admin: cambiar imagen en ${file}\n\n${from} → ${to}`,
      content: b64encode(new TextEncoder().encode(text)),
      sha: meta.sha,
      branch: env.GITHUB_BRANCH,
    }),
  });
  if (!put.ok) return json({ error: `GitHub respondió ${put.status} al guardar` }, 502);
  return json({ ok: true });
}

async function upload(env: Env, body: { name: string; data: string }) {
  const bytes = Uint8Array.from(atob(body.data || ""), (c) => c.charCodeAt(0));
  if (!bytes.length || bytes.length > MAX_UPLOAD) return json({ error: "Archivo vacío o mayor a 8 MB" }, 400);
  const isWebp = bytes[0] === 0x52 && bytes[8] === 0x57; // RIFF....WEBP
  const isJpg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
  if (!isWebp && !isJpg && !isPng) return json({ error: "Solo imágenes WebP, JPG o PNG" }, 400);
  const ext = isWebp ? "webp" : isJpg ? "jpg" : "png";
  const slug = (body.name || "foto")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "foto";
  const name = `${new Date().toISOString().slice(0, 10)}-${slug}-${crypto.randomUUID().slice(0, 6)}.${ext}`;
  const put = await gh(env, `public/img/subidas/${name}`, {
    method: "PUT",
    body: JSON.stringify({ message: `Admin: subir imagen ${name}`, content: b64encode(bytes), branch: env.GITHUB_BRANCH }),
  });
  if (!put.ok) return json({ error: `GitHub respondió ${put.status} al subir` }, 502);
  return json({ ok: true, src: `/img/subidas/${name}` });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    // ahora.<domain>/ opens the visitor app (its pages live under /ahora/).
    if (url.hostname.startsWith("ahora.") && url.pathname === "/") {
      url.pathname = "/ahora/";
      return env.ASSETS.fetch(new Request(url, req));
    }
    if (!url.pathname.startsWith("/api/admin/")) return env.ASSETS.fetch(req);
    if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
    if (!env.ADMIN_PASSWORD || !env.GITHUB_TOKEN)
      return json({ error: "Falta configurar ADMIN_PASSWORD y GITHUB_TOKEN en Cloudflare" }, 503);
    if (!(await sameSecret(req.headers.get("x-admin-password") ?? "", env.ADMIN_PASSWORD)))
      return json({ error: "Contraseña incorrecta" }, 401);
    const body = await req.json().catch(() => null);
    if (!body) return json({ error: "Solicitud inválida" }, 400);
    if (url.pathname === "/api/admin/check") return json({ ok: true });
    if (url.pathname === "/api/admin/replace") return replaceImage(env, body);
    if (url.pathname === "/api/admin/upload") return upload(env, body);
    return json({ error: "No encontrado" }, 404);
  },
};
