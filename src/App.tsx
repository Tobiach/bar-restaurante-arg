import React from 'react';
import { Clock, UtensilsCrossed, Music, Mic, Cake, GlassWater, Disc3, Music2, Calendar, Trophy, type LucideIcon } from 'lucide-react';
import { getConfig } from './config/active';
import { ToastProvider } from './components/Toast';
import BaseLayout from './components/ui/BaseLayout';
import StatusIndicator from './components/ui/StatusIndicator';
import Navbar from './components/ui/Navbar';
import NavbarCielo from './components/ui/NavbarCielo';
import Hero from './components/sections/Hero';
import ShowSection from './components/sections/ShowSection';
import MenuSection from './components/sections/MenuSection';
import ReservationStepper from './components/sections/ReservationStepper';
import KaraokeSection from './components/sections/KaraokeSection';
import GallerySection from './components/sections/GallerySection';
import CumpleanosSection from './components/sections/CumpleanosSection';
import PointsSection from './components/sections/PointsSection';
import ReviewSection from './components/sections/ReviewSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';
import CarritoFlotante from './components/sections/CarritoFlotante';
import PerfilDrawer from './components/sections/PerfilDrawer';

// Cielo-specific components
import CieloHero from './components/sections/cielo/CieloHero';
import CieloIntro from './components/sections/cielo/CieloIntro';
import CieloServicios from './components/sections/cielo/CieloServicios';
import CieloStats from './components/sections/cielo/CieloStats';
import CieloClub from './components/sections/cielo/CieloClub';
import CieloResenas from './components/sections/cielo/CieloResenas';
import CieloEventos from './components/sections/cielo/CieloEventos';
import CieloGaleria from './components/sections/cielo/CieloGaleria';
import CieloFooter from './components/sections/cielo/CieloFooter';
import CieloMenu from './components/sections/cielo/CieloMenu';
import CieloReservas from './components/sections/cielo/CieloReservas';

// Cuarta-specific components
import NavbarCuarta from './components/ui/NavbarCuarta';
import CuartaHero from './components/sections/cuarta/CuartaHero';
import CuartaBeerSpotlight from './components/sections/cuarta/CuartaBeerSpotlight';
import CuartaMenu from './components/sections/cuarta/CuartaMenu';
import CuartaReservas from './components/sections/cuarta/CuartaReservas';
import CuartaKaraoke from './components/sections/cuarta/CuartaKaraoke';
import CuartaCumple from './components/sections/cuarta/CuartaCumple';
import CuartaPuntos from './components/sections/cuarta/CuartaPuntos';
import CuartaGaleria from './components/sections/cuarta/CuartaGaleria';
import CuartaResenas from './components/sections/cuarta/CuartaResenas';
import CuartaContacto from './components/sections/cuarta/CuartaContacto';
import CuartaFooter from './components/sections/cuarta/CuartaFooter';

const IconPin = () => (
  <svg className="inline w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconWA = () => (
  <svg className="inline w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TICKER_ICONS: LucideIcon[] = [
  UtensilsCrossed, Music, Mic, Cake, GlassWater, Disc3, Music2, Calendar, Trophy,
];

export default function App() {
  const tenantConfig = getConfig();
  const tenantId = new URLSearchParams(window.location.search).get('t') || 'isla';

  // Render Cuarta-specific layout
  if (tenantId === 'cuarta') {
    return (
      <ToastProvider>
        <BaseLayout>
          <NavbarCuarta />
          <CuartaHero />
          <CuartaBeerSpotlight />
          <CuartaMenu />
          <CuartaReservas />
          <CuartaKaraoke />
          <CuartaCumple />
          <CuartaPuntos />
          <CuartaGaleria />
          <CuartaResenas />
          <CuartaContacto />
          <CuartaFooter />
          <CarritoFlotante />
          <PerfilDrawer />
        </BaseLayout>
      </ToastProvider>
    );
  }

  // Render Cielo-specific layout
  if (tenantId === 'cielo') {
    return (
      <ToastProvider>
        <BaseLayout>
          <NavbarCielo />
          <CieloHero />
          <CieloIntro />
          <CieloServicios />
          <CieloStats />
          <CieloMenu />
          <CieloReservas />
          <CieloClub />
          <CieloResenas />
          <CieloEventos />
          <CieloGaleria />
          <CieloFooter />
          <CarritoFlotante />
          <PerfilDrawer />
        </BaseLayout>
      </ToastProvider>
    );
  }

  // Default layout for isla
  return (
    <ToastProvider>
      <BaseLayout>
        {/* Top info bar — desktop only */}
        <div className="bg-violeta-medio py-2 border-b border-white/5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-display tracking-[0.2em] text-blanco-muted uppercase">
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><IconPin /> {tenantConfig.direccion}</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {tenantConfig.horarios.resumen}</span>
            </div>
            <StatusIndicator />
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-blanco-suave"><IconWA /> {tenantConfig.telefono}</span>
            </div>
          </div>
        </div>

        <Navbar />

        <main>
          <Hero />

          {/* Ticker marquee */}
          <div className="bg-naranja py-4 overflow-hidden relative border-y border-naranja-oscuro/20">
            <div className="flex gap-12 whitespace-nowrap animate-marquee px-4">
              {[...tenantConfig.ticker, ...tenantConfig.ticker].map((text, i) => {
                const Icon = TICKER_ICONS[i % TICKER_ICONS.length];
                return (
                  <span key={i} className="flex items-center gap-3 text-white font-display font-black tracking-widest text-sm italic">
                    <Icon size={16} className="opacity-80 flex-shrink-0" />
                    {text}
                  </span>
                );
              })}
            </div>
          </div>

          {tenantConfig.features.shows && <ShowSection />}
          <MenuSection />
          <ReservationStepper />
          {tenantConfig.features.karaoke && <KaraokeSection />}
          {tenantConfig.features.galeria && <GallerySection />}
          {tenantConfig.features.cumpleanos && <CumpleanosSection />}
          {tenantConfig.features.puntos && <PointsSection />}
          {tenantConfig.features.resenas && <ReviewSection />}
          <ContactSection />
        </main>

        <Footer />
        <CarritoFlotante />
        <PerfilDrawer />
      </BaseLayout>
    </ToastProvider>
  );
}
