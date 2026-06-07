import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { tenantConfig } from './config/tenant.config';
import { ToastProvider } from './components/Toast';
import StatusIndicator from './components/ui/StatusIndicator';
import Navbar from './components/ui/Navbar';
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

export default function App() {
  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-violeta overflow-x-hidden">
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
              {[...tenantConfig.ticker, ...tenantConfig.ticker].map((text, i) => (
                <span key={i} className="text-white font-display font-black tracking-widest text-sm italic">{text.toUpperCase()}</span>
              ))}
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
      </div>
    </ToastProvider>
  );
}
