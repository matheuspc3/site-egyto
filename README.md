# EGYPT PRODUÇÕES

Site institucional cinematográfico da **EGYPT PRODUÇÕES**. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + framer-motion.

O site abre direto no **scroll film**: um vídeo sincronizado com a rolagem (scroll-scrubbing bidirecional) — o frame avança 1:1 conforme o usuário rola, sem `play()`. O hero antigo foi removido; o vídeo é a primeira seção da página.

## Stack

- Next.js 15 App Router, React 19, TypeScript (strict)
- Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline`)
- framer-motion 12 (scroll film + animações de entrada)
- next/font (Anton display + Inter body)
- Deploy VPS: Docker multi-stage (`output: "standalone"`) + Nginx + Certbot

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
```

Se a porta 3000 estiver ocupada, o Next sobe em 3002 (ou outra livre). Verificação:

```bash
npm run lint
npm run typecheck
npm run build      # gera .next/standalone
```

## Arquitetura

- `app/page.tsx` — monta as seções na ordem: Navbar → ScrollFilm → Manifesto → Serviços → Trabalhos → Showreel → Sobre → Contato → Footer.
- `components/` — um componente por seção (`EgyptScrollFilm`, `EgyptManifesto`, `EgyptServices`, `EgyptPortfolio`, `EgyptShowreel`, `EgyptAbout`, `EgyptContact`, `EgyptFooter`, `EgyptNavbar`) + `Logo`.
- `data/dadosSite.ts` — **fonte única de conteúdo** (textos, cenas, contato, assets). Nenhum texto/URL dura nos componentes.
- `lib/` — utils (`cn`, constantes de animação).

### Scroll film (vídeo sincronizado)

`EgyptScrollFilm.tsx` usa um track `h-[380svh]` (mobile) / `h-[500svh]` (desktop) com container `sticky` e `useScroll` para mapear progresso → `video.currentTime = progress * duration`.

Pontos críticos para o scrub ser suave:

1. **Sem `play()`** — o vídeo fica pausado; o frame só avança por `seek` (`currentTime`).
2. **Throttle com `requestAnimationFrame`** (não `setTimeout`) — o seek é aplicado no próximo frame de renderização.
3. **Vídeo com todos os frames como keyframe** — se o MP4 tiver poucos I-frames, cada seek obriga o navegador a decodificar do início (travamento/pulos). O `v2_egypt-intro.mp4` foi gerado com `-g 1`.

Fallback: com `prefers-reduced-motion` ou erro de vídeo, a seção mostra as cenas estáticas empilhadas (`SceneOverlayStatic`).

## Conteúdo

**Todo** o conteúdo institucional vive em `data/dadosSite.ts` — textos, cenas do scroll film, serviços, portfólio, showreel, sobre (incluindo as imagens do carrossel), contato. Campos provisórios estão marcados com `TODO PROVISÓRIO` e devem ser substituídos antes do deploy (e-mail, Instagram, WhatsApp).

## Assets

| Arquivo | Onde | Papel |
| --- | --- | --- |
| `public/videos/v2_egypt-intro.mp4` | usado | vídeo do scroll film (H.264, keyframe em todos os frames — ver abaixo) |
| `public/videos/v2_egypt-intro.MOV` | origem | arquivo-fonte (HEVC) do qual o `.mp4` é gerado |
| `public/videos/eg_01.png` | usado | poster do scroll film (1º frame) |
| `public/videos/egypt-intro.mp4` + `egypt-intro-poster.jpg` | legado | vídeo/poster antigos — não referenciados, podem ser removidos |
| `public/videos/showreel.mp4` | opcional | showreel (modal; 404 tolerado enquanto não existir) |
| `public/brand/logo-horizontal.svg` | usado | logo vetorial (preto; invertido via `filter` para fundos escuros) |
| `app/icon.svg` | usado | favicon — emblema EGYPT branco sobre chip arredondado `#080808` (auto-servido por Next em `/icon.svg`) |
| `public/brand/logo-white.png` | legado | conversão antiga do PDF — não referenciado |
| `public/brand/branding-*.png/jpg` | legado | fotos antigas do "Sobre" — não referenciadas |
| `public/images/portfolio/01_estudio.png`… | usado | imagens do carrossel do "Sobre" |
| `src/LOGO_EGITO*.svg`, `src/LOGO EGITO.pdf` | origem | arquivos-fonte da identidade visual |
| `farao-camera.mp4`, `farao-camera_old.mp4` | legado | fontes antigas na raiz — não referenciados |

### Gerar o vídeo do scroll film

O `.MOV` de origem é HEVC (não decodifica no Chrome). Para o Chrome reproduzir **e** buscar frame a frame, transcode para H.264 com **todos os frames como keyframe** (`-g 1`) — sem isso o seek decodifica do início a cada frame e trava:

```bash
ffmpeg -y -i public/videos/v2_egypt-intro.MOV \
  -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p \
  -g 1 -c:a aac -movflags +faststart \
  public/videos/v2_egypt-intro.mp4
```

Poster (1º frame):

```bash
ffmpeg -i public/videos/v2_egypt-intro.MOV -frames:v 1 -q:v 2 public/videos/eg_01.png
```

O `.MOV` original não precisa ser versionado junto se o `.mp4` já estiver commitado — fica a critério (mantê-lo permite re-encodar com outros parâmetros).

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
