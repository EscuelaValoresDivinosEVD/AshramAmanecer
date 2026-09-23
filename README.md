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

## Panel de edición (Pages CMS)

Los textos, fotos, eventos, espacios y nombres del mapa se editan sin tocar código en **https://app.pagescms.org**:

1. Entra con tu cuenta de GitHub e instala la app de Pages CMS en el repositorio `AshramAmanecer` (solo la primera vez).
2. Abre el repositorio y la rama `main`.
3. Edita y pulsa **Guardar**: se crea un commit y Cloudflare publica el sitio en 1–2 minutos.

La configuración del panel está en `.pages.yml`; el contenido, en `src/content/*.json`. Las fotos nuevas se suben a `public/img/`.

## Dónde editar (código)

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
