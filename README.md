# Ashram Amanecer

Sitio del Ashram Caminantes del Amanecer, en Next.js (exportación estática) con un mapa interactivo: las nubes se abren con el scroll y cada edificio se ilumina y muestra su nombre al pasar el cursor.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera la carpeta estática out/
```

## Dónde editar

- `src/data/places.ts`: nombres, descripciones y posición de cada edificio (nombres **provisionales**).
- `src/components/InteractiveMap.tsx`: animación de nubes (`CLOUDS`), hover y clic.
- `src/components/PlaceDetail.tsx`: página provisional de cada lugar (`/lugares/<slug>/`).
- `src/app/globals.css`: estilos y paleta de colores de la marca (variables en `:root`).
- `public/brand/`: logos (ícono, letras, logo completo) en los colores de la paleta.

## Deploy en Cloudflare

- **Pages:** comando de build `npm run build`, directorio de salida `out`.
- **Workers (static assets):** build `npm run build`, deploy `npx wrangler deploy` (usa `wrangler.jsonc`).
