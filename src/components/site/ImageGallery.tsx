"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ImageRow, Usage } from "@/lib/image-usage";

const PassCtx = createContext<string>("");

/** Shrinks big photos in the browser before upload (max 2400px, WebP). */
async function prepare(file: File): Promise<{ name: string; data: string; preview: string }> {
  let blob: Blob = file;
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const webp = await new Promise<Blob | null>((r) => c.toBlob(r, "image/webp", 0.82));
    if (webp && webp.type === "image/webp") blob = webp;
  } catch {}
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { name: file.name, data: btoa(bin), preview: URL.createObjectURL(blob) };
}

async function api(path: string, pass: string, body: unknown) {
  const res = await fetch(`/api/admin/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-admin-password": pass },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({ error: `Error ${res.status}` }));
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

function Replace({ from, u, onDone }: { from: string; u: Usage; onDone: (src: string, preview?: string) => void }) {
  const pass = useContext(PassCtx);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<{ busy?: boolean; msg?: string; err?: string }>({});
  if (!u.file || !u.ptr) return null;

  const save = async () => {
    if (!pass) return setState({ err: "Escribe la contraseña de administración arriba." });
    if (!file && !url.trim()) return setState({ err: "Elige una foto o pega una dirección." });
    setState({ busy: true, msg: file ? "Subiendo foto…" : "Guardando…" });
    try {
      let to = url.trim();
      let preview: string | undefined;
      if (file) {
        const prep = await prepare(file);
        preview = prep.preview;
        to = (await api("upload", pass, { name: prep.name, data: prep.data })).src;
        setState({ busy: true, msg: "Guardando…" });
      }
      await api("replace", pass, { file: u.file, ptr: u.ptr, from, to });
      setState({ msg: "Guardado ✓ Se publica en 1–2 minutos." });
      setOpen(false);
      onDone(to, preview);
    } catch (e) {
      setState({ err: (e as Error).message });
    }
  };

  return (
    <div className="ig-replace">
      {!open ? (
        <button type="button" className="ig-change" onClick={() => setOpen(true)}>
          Cambiar aquí
        </button>
      ) : (
        <div className="ig-form">
          <label className="ig-file">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <span>{file ? file.name : "Subir foto desde el dispositivo"}</span>
          </label>
          <span className="ig-or">o</span>
          <input
            type="url"
            placeholder="Pegar dirección: /img/… o https://…"
            value={url}
            disabled={!!file}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="ig-actions">
            <button type="button" className="btn btn-accent" disabled={state.busy} onClick={save}>
              {state.busy ? "…" : "Guardar"}
            </button>
            <button type="button" className="ig-cancel" disabled={state.busy} onClick={() => (setOpen(false), setFile(null), setUrl(""), setState({}))}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {state.msg && !state.err && <p className="ig-msg">{state.msg}</p>}
      {state.err && <p className="ig-err">{state.err}</p>}
    </div>
  );
}

function Card({ r }: { r: ImageRow }) {
  const [copied, setCopied] = useState(false);
  // After a replacement, show what was chosen until the site republishes.
  const [changed, setChanged] = useState<Record<number, { src: string; preview?: string }>>({});
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.src);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };
  return (
    <article className="ig-card">
      <a href={r.src} target="_blank" rel="noopener" className="ig-thumb" title="Abrir la imagen completa">
        <img src={r.thumb} alt={r.desc ?? ""} loading="lazy" decoding="async" />
        {r.codeOnly && <span className="ig-badge">Solo por código</span>}
      </a>
      <div className="ig-body">
        <button type="button" className="ig-path" onClick={copy} title="Copiar la dirección">
          <code>{r.src}</code>
          <span>{copied ? "Copiada ✓" : "Copiar"}</span>
        </button>
        {(r.desc || r.w) && (
          <p className="ig-meta">
            {r.desc}
            {r.w ? ` · ${r.w}×${r.h}px` : ""}
          </p>
        )}
        {r.usages.length > 0 ? (
          <ul className="ig-uses">
            {r.usages.map((u, i) => (
              <li key={i}>
                <span>{u.where}</span>
                {changed[i] && (
                  <span className="ig-new">
                    <img src={changed[i].preview ?? changed[i].src} alt="" />
                    Nueva: <code>{changed[i].src}</code>
                  </span>
                )}
                <span className="ig-links">
                  {u.page && (
                    <a href={u.page} target="_blank" rel="noopener">
                      Ver en el sitio
                    </a>
                  )}
                  {u.edit && (
                    <a href={u.edit} target="_blank" rel="noopener" className="ig-edit">
                      Cambiar en el panel ↗
                    </a>
                  )}
                </span>
                {!r.codeOnly && !changed[i] && (
                  <Replace from={r.src} u={u} onDone={(src, preview) => setChanged((c) => ({ ...c, [i]: { src, preview } }))} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="ig-meta">No aparece en ninguna página. Puedes elegirla desde el panel para reemplazar otra.</p>
        )}
      </div>
    </article>
  );
}

export default function ImageGallery({ used, unused }: { used: ImageRow[]; unused: ImageRow[] }) {
  const groups = useMemo(() => [...new Set(used.map((r) => r.group))], [used]);
  const [group, setGroup] = useState("Todas");
  const [q, setQ] = useState("");
  const [showUnused, setShowUnused] = useState(false);
  const [pass, setPass] = useState(() => {
    try {
      return sessionStorage.getItem("ashram-admin") ?? "";
    } catch {
      return "";
    }
  });
  const [passState, setPassState] = useState<"" | "ok" | "bad" | "checking">("");
  const checkPass = async () => {
    setPassState("checking");
    try {
      await api("check", pass, {});
      setPassState("ok");
      try {
        sessionStorage.setItem("ashram-admin", pass);
      } catch {}
    } catch {
      setPassState("bad");
    }
  };

  const match = (r: ImageRow) => {
    const t = q.trim().toLowerCase();
    if (!t) return true;
    return [r.src, r.desc ?? "", ...r.usages.map((u) => u.where)].join(" ").toLowerCase().includes(t);
  };
  const list = used.filter((r) => (group === "Todas" || r.group === group) && match(r));
  const free = unused.filter(match);

  return (
    <PassCtx.Provider value={passState === "ok" || pass ? pass : ""}>
      <form
        className="ig-pass"
        onSubmit={(e) => {
          e.preventDefault();
          checkPass();
        }}
      >
        <input
          type="password"
          placeholder="Contraseña de administración"
          value={pass}
          autoComplete="current-password"
          onChange={(e) => (setPass(e.target.value), setPassState(""))}
        />
        <button type="submit" className="btn">
          Entrar
        </button>
        <span className="ig-pass-state">
          {passState === "ok" && "Listo: ya puedes cambiar imágenes."}
          {passState === "bad" && "Contraseña incorrecta o el servidor aún no está configurado."}
          {passState === "checking" && "Comprobando…"}
        </span>
      </form>
      <div className="ig-tools">
        <input
          type="search"
          placeholder="Buscar por página, sección o nombre de archivo…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar imágenes"
        />
        <div className="ig-chips" role="group" aria-label="Filtrar por grupo">
          {["Todas", ...groups].map((g) => (
            <button key={g} type="button" className={g === group ? "is-on" : undefined} onClick={() => setGroup(g)}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <p className="ig-count">{list.length} imágenes</p>
      <div className="ig-grid">
        {list.map((r) => (
          <Card key={r.src} r={r} />
        ))}
      </div>

      <section className="ig-unused">
        <button type="button" className="btn" onClick={() => setShowUnused((v) => !v)} aria-expanded={showUnused}>
          {showUnused ? "Ocultar" : "Ver"} fotos de la biblioteca sin usar ({free.length})
        </button>
        {showUnused && (
          <div className="ig-grid">
            {free.map((r) => (
              <Card key={r.src} r={r} />
            ))}
          </div>
        )}
      </section>
    </PassCtx.Provider>
  );
}
