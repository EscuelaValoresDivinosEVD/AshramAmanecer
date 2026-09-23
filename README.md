# Ashram Amanecer

Sitio del Ashram Caminantes del Amanecer, en Next.js (exportación estática) con un mapa interactivo: las nubes se abren con el scroll y cada edificio se ilumina y muestra su nombre al pasar el cursor.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera la carpeta estática out/
```

## Páginas

Mismas URLs que el sitio anterior (WordPress), para no romper enlaces: `/quienes-somos/`, `/espacios/` (+ una página por espacio), `/experimentar-el-ashram/`, `/estadias/…`, `/refugio-natural/`, `/sala-chikitsa/`, `/amenidades/`, `/lineamientos/`, `/que-visitar/`, `/preguntas-frecuentes/`, `/mataji-shaktiananda/`, `/talleres-y-retiros/`, `/contactanos/`.

## Dónde editar

- `src/data/places.ts`: edificios del mapa (6 identificados enlazan a su espacio; 6 aún **provisionales**).
- `src/data/site.ts`: menú, footer, contacto, redes y formularios (GoHighLevel).
- `src/data/espacios.ts`, `src/data/pages.ts`, `src/data/maestros.ts`: textos (copiados del sitio anterior).
- `src/data/eventos.ts`: talleres y retiros (**ejemplos**, reemplazar por los reales).
- `src/data/images.json` + `public/img/`: fotos del sitio anterior optimizadas (WebP).
- `src/components/InteractiveMap.tsx`: animación de nubes (`CLOUDS`), hover y clic.
- `src/components/PlaceDetail.tsx`: página provisional de cada lugar (`/lugares/<slug>/`).
- `src/app/globals.css`: estilos y paleta de colores de la marca (variables en `:root`).
- `public/brand/`: logos (ícono, letras, logo completo) en los colores de la paleta.

## Deploy en Cloudflare

- **Pages:** comando de build `npm run build`, directorio de salida `out`.
- **Workers (static assets):** build `npm run build`, deploy `npx wrangler deploy` (usa `wrangler.jsonc`).
