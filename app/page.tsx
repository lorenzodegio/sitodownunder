import { CallBar } from "@/components/CallBar";
import { Eventi } from "@/components/Eventi";
import { Footer } from "@/components/Footer";
import { Garden } from "@/components/Garden";
import { Giornata } from "@/components/Giornata";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Pranzo } from "@/components/Pranzo";
import { Serate } from "@/components/Serate";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <div className="page" id="top">
      <div className="demo-bar">{site.demoBanner}</div>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Giornata />
        <Pranzo />
        <div className="onda" aria-hidden="true">
          <svg className="wave onda-svg" viewBox="0 0 1700 40" preserveAspectRatio="none">
            <defs>
              <pattern id="wv" width="100" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 22q25-22 50 0t50 0V40H0z" fill="#1E282B" />
              </pattern>
            </defs>
            <rect width="1700" height="40" fill="url(#wv)" />
          </svg>
        </div>
        <Menu />
        <Serate />
        <Garden />
        <Eventi />
        <Info />
      </main>
      <Footer />
      <CallBar />
    </div>
  );
}

