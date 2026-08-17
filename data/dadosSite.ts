/**
 * TODO — TODOS os conteúdos institucionais ficam aqui.
 * Nada de texto/endereço/contato duro dentro dos componentes.
 * Campos marcados como PROVISÓRIO devem ser substituídos pelos dados reais
 * da EGYPT PRODUÇÕES antes do deploy.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ScrollScene = {
  id: string;
  /** range do scroll (0–1) onde a cena vive */
  start: number;
  end: number;
  /** largura da faixa de fade (0–1) nas bordas */
  fade?: number;
  lines: string[];
  size?: "xs" | "md" | "xl";
  align?: "left" | "center" | "right";
  vpos?: "top" | "center" | "bottom";
  /** "dark" = texto preto (para sobreposição laranja) */
  tone?: "light" | "dark";
  tagline?: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  index: string;
  title: string;
  description: string;
  /** caminho em public/images/portfolio — vazio = sem imagem */
  image?: string;
};

export type Project = {
  title: string;
  category: string;
  image: string;
  alt: string;
};

export type BrandImage = {
  src: string;
  alt: string;
};

export type SiteData = {
  siteName: string;
  siteUrl: string;
  nav: NavLink[];
  hero: {
    kicker: string;
    words: string[];
    location: string;
  };
  scrollFilm: {
    video: string;
    poster: string;
    durationHint: string;
    scenes: ScrollScene[];
  };
  manifesto: {
    lines: string[];
  };
  services: {
    label: string;
    items: Service[];
  };
  portfolio: {
    label: string;
    emptyMessage: string;
    projects: Project[];
  };
  showreel: {
    title: string;
    year: string;
    video: string;
    note: string;
  };
  about: {
    label: string;
    headline: string;
    location: string;
    text: string[];
    images: BrandImage[];
  };
  contact: {
    label: string;
    headline: string;
    email: string; // TODO PROVISÓRIO
    instagram: string; // TODO PROVISÓRIO
    whatsapp: string; // TODO PROVISÓRIO
    form: {
      nameLabel: string;
      contactLabel: string;
      messageLabel: string;
      submitLabel: string;
    };
  };
  footer: {
    note: string;
    madeIn: string;
  };
};

/* ------------------------------------------------------------------ */
/* Dados                                                               */
/* ------------------------------------------------------------------ */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://egyptproducoes.com.br";

export const siteData: SiteData = {
  siteName: "EGYPT PRODUÇÕES",
  siteUrl,

  nav: [
    { label: "INÍCIO", href: "#inicio" },
    { label: "MANIFESTO", href: "#manifesto" },
    { label: "SERVIÇOS", href: "#servicos" },
    { label: "TRABALHOS", href: "#trabalhos" },
    { label: "SHOWREEL", href: "#showreel" },
    { label: "SOBRE", href: "#sobre" },
    { label: "CONTATO", href: "#contato" },
  ],

  hero: {
    kicker: "Estúdio audiovisual de produção de imagem.",
    words: ["FILM", "DIRECTION", "PRODUCTION", "VISUAL"],
    location: "RIO DE JANEIRO — BRASIL",
  },

  scrollFilm: {
    video: "/videos/egypt-intro.mp4",
    poster: "/videos/egypt-intro-poster.jpg",
    durationHint: "RE-VEJA: ROLE PARA CIMA",
    scenes: [
      {
        id: "origem",
        start: 0,
        end: 0.18,
        fade: 0.04,
        lines: ["ORIGEM."],
        size: "md",
        align: "left",
        vpos: "bottom",
        tone: "light",
      },
      {
        id: "visao",
        start: 0.18,
        end: 0.38,
        fade: 0.03,
        lines: ["TODA IMAGEM", "COMEÇA COM", "UMA VISÃO."],
        size: "xl",
        align: "left",
        vpos: "center",
        tone: "light",
      },
      {
        id: "frame",
        start: 0.38,
        end: 0.68,
        fade: 0.02,
        lines: ["FRAME", "001"],
        size: "md",
        align: "right",
        vpos: "bottom",
        tone: "light",
      },
      {
        id: "da-visao-a-imagem",
        start: 0.68,
        end: 0.88,
        fade: 0.03,
        lines: ["DA VISÃO", "À IMAGEM."],
        size: "xl",
        align: "right",
        vpos: "center",
        tone: "light",
      },
      {
        id: "egypt",
        start: 0.92,
        end: 1,
        fade: 0.02,
        lines: ["EGYPT", "PRODUÇÕES"],
        size: "xl",
        align: "center",
        vpos: "center",
        tone: "dark",
        tagline: "A IMAGEM COMEÇA ANTES DA CÂMERA.",
      },
    ],
  },

  manifesto: {
    lines: [
      "NÓS NÃO APENAS GRAVAMOS.",
      "CRIAMOS IMAGENS",
      "QUE PERMANECEM.",
    ],
  },

  services: {
    label: "SERVIÇOS",
    items: [
      {
        index: "01",
        title: "DIREÇÃO",
        description:
          "Direção de cena, direção de fotografia e condução criativa do conceito à imagem final.",
      },
      {
        index: "02",
        title: "ROTEIRO & CONTEÚDO",
        description:
          "Construção de narrativa, roteiro e conteúdo audiovisual para marcas, produtos e ideias.",
      },
      {
        index: "03",
        title: "CAPTAÇÃO",
        description:
          "Captação de imagem e som com olhar cinematográfico — em estúdio ou locação.",
      },
      {
        index: "04",
        title: "PÓS-PRODUÇÃO",
        description:
          "Montagem, colorização e finalização de imagem com padrão de cinema.",
      },
      {
        index: "05",
        title: "MOTION & IDENTIDADE",
        description:
          "Motion design e identidade visual em movimento para criar presença audiovisual de marca.",
      },
    ],
  },

  portfolio: {
    label: "TRABALHOS",
    emptyMessage: "NOVOS PROJETOS EM BREVE",
    projects: [],
  },

  showreel: {
    title: "SHOW REEL",
    year: "2026",
    video: "/videos/showreel.mp4",
    note: "REEL EM PRODUÇÃO",
  },

  about: {
    label: "SOBRE",
    headline: "EGYPT IS A VISUAL PRODUCTION STUDIO.",
    location: "RIO DE JANEIRO — BRASIL",
    text: [
      "A EGYPT PRODUÇÕES é um estúdio audiovisual dedicado a transformar visão em imagem. Cada projeto nasce de um olhar: primeiro o conceito, depois a câmera.",
      "Do roteiro à finalização, acreditamos que imagem é linguagem — e que uma boa imagem fala por conta própria.",
    ],
    images: [
      { src: "/brand/branding-1.png", alt: "Identidade visual da EGYPT" },
      { src: "/brand/branding-2.png", alt: "Material de identidade da EGYPT" },
      { src: "/brand/branding-3.jpg", alt: "Credencial de produção" },
      { src: "/brand/branding-4.jpg", alt: "Cordão de credencial" },
    ],
  },

  contact: {
    label: "CONTATO",
    headline: "LET'S CREATE SOMETHING.",
    // TODO PROVISÓRIO — substituir pelos contatos reais antes do deploy.
    email: "contato@egyptproducoes.com.br",
    instagram: "instagram.com/egyptproducoes",
    whatsapp: "https://wa.me/5500000000000",
    form: {
      nameLabel: "NOME",
      contactLabel: "E-MAIL / WHATSAPP",
      messageLabel: "MENSAGEM",
      submitLabel: "ENVIAR",
    },
  },

  footer: {
    note: "A IMAGEM COMEÇA ANTES DA CÂMERA.",
    madeIn: "FEITO NO RIO DE JANEIRO — BRASIL",
  },
};
