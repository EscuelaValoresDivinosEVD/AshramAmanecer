"use client";

import { useMemo, useState } from "react";
import type { ImageRow } from "@/lib/image-usage";

function Card({ r }: { r: ImageRow }) {
  const [copied, setCopied] = useState(false);
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

  const match = (r: ImageRow) => {
    const t = q.trim().toLowerCase();
    if (!t) return true;
    return [r.src, r.desc ?? "", ...r.usages.map((u) => u.where)].join(" ").toLowerCase().includes(t);
  };
  const list = used.filter((r) => (group === "Todas" || r.group === group) && match(r));
  const free = unused.filter(match);

  return (
    <>
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
    </>
  );
}
