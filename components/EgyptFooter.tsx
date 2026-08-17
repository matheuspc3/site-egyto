import { siteData } from "@/data/dadosSite";
import Logo from "./Logo";

export default function EgyptFooter() {
  return (
    <footer className="border-t border-egypt-white/10 bg-egypt-black px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-4">
          <Logo variant="white" className="h-6" />
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
            {siteData.footer.note}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
            {siteData.footer.madeIn}
          </p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-egypt-white/40">
            © {new Date().getFullYear()} {siteData.siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
