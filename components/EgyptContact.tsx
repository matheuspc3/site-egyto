"use client";

import { useState } from "react";
import { Instagram, Mail } from "lucide-react";
import { siteData } from "@/data/dadosSite";
import SectionTitle from "./SectionTitle";

export default function EgyptContact() {
  const { contact } = siteData;
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Contato via site — EGYPT PRODUÇÕES");
    const body = encodeURIComponent(
      `Nome: ${nome}\nContato: ${contato}\n\n${mensagem}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contato" className="bg-egypt-black px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="04"
          label={contact.label}
          title={contact.headline}
          className="text-egypt-white"
        />

        <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2">
          {/* links diretos */}
          <div className="flex flex-col gap-6">
            <ContactLink
              icon={<Mail size={18} aria-hidden />}
              label="E-MAIL"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <ContactLink
              icon={<Instagram size={18} aria-hidden />}
              label="INSTAGRAM"
              value={`@${contact.instagram.split("/").pop() ?? ""}`}
              href={`https://${contact.instagram}`}
            />
            <ContactLink
              icon={<span aria-hidden>WA</span>}
              label="WHATSAPP"
              value="(provisório — substituir em dadosSite.ts)"
              href={contact.whatsapp}
            />
          </div>

          {/* formulário mínimo -> mailto */}
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
                {contact.form.nameLabel}
              </span>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border-b border-egypt-white/20 bg-transparent pb-3 text-egypt-white outline-none transition-colors placeholder:text-egypt-white/30 focus:border-egypt-orange"
                placeholder="Seu nome"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
                {contact.form.contactLabel}
              </span>
              <input
                type="text"
                required
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                className="border-b border-egypt-white/20 bg-transparent pb-3 text-egypt-white outline-none transition-colors placeholder:text-egypt-white/30 focus:border-egypt-orange"
                placeholder="E-mail ou WhatsApp"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
                {contact.form.messageLabel}
              </span>
              <textarea
                required
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="resize-none border-b border-egypt-white/20 bg-transparent pb-3 text-egypt-white outline-none transition-colors placeholder:text-egypt-white/30 focus:border-egypt-orange"
                placeholder="Conte sobre o seu projeto"
              />
            </label>
            <button
              type="submit"
              className="self-start border border-egypt-orange bg-egypt-orange px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-egypt-black transition-colors hover:bg-transparent hover:text-egypt-orange"
            >
              {contact.form.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className="group flex items-center gap-5 border-b border-egypt-white/12 py-5"
    >
      <span className="flex h-10 w-10 items-center justify-center border border-egypt-white/20 text-egypt-orange">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
          {label}
        </span>
        <span className="font-display text-lg uppercase tracking-tight text-egypt-white transition-colors group-hover:text-egypt-orange">
          {value}
        </span>
      </span>
    </a>
  );
}
