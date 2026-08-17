import EgyptAbout from "@/components/EgyptAbout";
import EgyptContact from "@/components/EgyptContact";
import EgyptFooter from "@/components/EgyptFooter";
import EgyptHero from "@/components/EgyptHero";
import EgyptManifesto from "@/components/EgyptManifesto";
import EgyptNavbar from "@/components/EgyptNavbar";
import EgyptPortfolio from "@/components/EgyptPortfolio";
import EgyptScrollFilm from "@/components/EgyptScrollFilm";
import EgyptServices from "@/components/EgyptServices";
import EgyptShowreel from "@/components/EgyptShowreel";

export default function Home() {
  return (
    <main>
      <EgyptNavbar />
      <EgyptHero />
      <EgyptScrollFilm />
      <EgyptManifesto />
      <EgyptServices />
      <EgyptPortfolio />
      <EgyptShowreel />
      <EgyptAbout />
      <EgyptContact />
      <EgyptFooter />
    </main>
  );
}
