# EGYPT PRODUÇÕES — Site Institucional

Site institucional cinematográfico da **EGYPT PRODUÇÕES**. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + framer-motion. O vídeo introdutório (`farao-camera.mp4`) é sincronizado com a rolagem (scroll-scrubbing bidirecional).

## Stack

- Next.js 15 App Router, React 19, TypeScript (strict)
- Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline`)
- framer-motion 12, lucide-react
- next/font (Anton display + Inter body)
- Deploy VPS: Docker multi-stage (`output: "standalone"`) + Nginx + Certbot

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
```

Verificação:

```bash
npm run lint
npm run typecheck
npm run build      # gera .next/standalone
```

## Produção (Docker)

```bash
cp .env.example .env   # defina NEXT_PUBLIC_SITE_URL
docker compose up -d --build
```

### Primeiro certificado SSL (uma vez)

```bash
docker compose run --rm certbot certonly --webroot \
  --webroot-path /var/www/certbot \
  -d seudominio.com.br -d www.seudominio.com.br
docker compose restart nginx
```

O container `certbot` renova automaticamente a cada 12h.

## Conteúdo

**Todo** o conteúdo institucional vive em [`data/dadosSite.ts`](data/dadosSite.ts) — textos, cenas do vídeo, serviços, portfólio, contato. Campos provisórios estão marcados com `TODO PROVISÓRIO` e devem ser substituídos antes do deploy (e-mail, Instagram, WhatsApp).

## Assets

| Arquivo | Onde | Papel |
| --- | --- | --- |
| `public/videos/egypt-intro.mp4` | — | vídeo do scroll-film (gerado de `farao-camera.mp4` com `ffmpeg -g 1`) |
| `public/videos/egypt-intro-poster.jpg` | — | 1º frame do vídeo |
| `public/videos/showreel.mp4` | opcional | showreel (modal; 404 tolerado) |
| `public/brand/logo-white.png` | conversão do `LOGO EGITO.pdf` | logo (fallback: wordmark Anton) |
| `public/brand/logo-black.png` | conversão do `LOGO EGITO.pdf` | logo para fundos claros |
| `public/brand/branding-*.png/jpg` | fotos originais | strip editorial do "Sobre" |
| `public/images/portfolio/*` | novo | imagens do portfólio |

### Gerar o vídeo e o poster (opcional — sem ffmpeg o site usa o original)

```bash
ffmpeg -i farao-camera.mp4 -c:v libx264 -g 1 -movflags +faststart -pix_fmt yuv420p public/videos/egypt-intro.mp4
ffmpeg -i farao-camera.mp4 -frames:v 1 -q:v 2 public/videos/egypt-intro-poster.jpg
```

### Gerar os logos do PDF

```bash
pdftoppm -png -r 300 "src/LOGO EGITO.pdf" public/brand/logo
mv public/brand/logo-1.png public/brand/logo-white.png
mv public/brand/logo-2.png public/brand/logo-black.png   # conforme a ordem das páginas
```

Confira e renomeie conforme a ordem real das páginas do PDF.

## Cores e tipografia

Definidas em `app/globals.css` (`@theme inline`):

- `--color-egypt-orange: #FF3B1F` — laranja da marca
- `--color-egypt-black: #080808` — fundo
- `--color-egypt-white: #F5F5F2` — texto
- `--font-display` (Anton) / `--font-body` (Inter)

## Deploy (VPS)

1. Domínio apontado para o IP do servidor (A/AAAA).
2. Instale Docker + Docker Compose.
3. Clone o repositório e copie `.env.example` → `.env` com o domínio real.
4. `docker compose up -d --build`.
5. Gere o certificado (seção acima) e verifique HTTPS.

O Nginx (`nginx/default.conf`) faz proxy para o container `web:3000`, aplica cache para assets estáticos e força HTTPS.
