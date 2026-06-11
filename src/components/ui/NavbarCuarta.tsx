import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Beer, MessageCircle } from 'lucide-react';
import { getConfig } from '../../config/active';

export default function NavbarCuarta() {
  const tc = getConfig();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'CANILLAS', href: '#cuarta-menu' },
    { label: 'KARAOKE', href: '#cuarta-karaoke' },
    { label: 'CLUB LA CUARTA', href: '#cuarta-puntos' },
    { label: 'GALERÍA', href: '#cuarta-galeria' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(13,26,13,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,169,110,0.12)' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Beer size={22} style={{ color: '#C8A96E' }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.35em', color: '#9E8E7A', lineHeight: 1, textTransform: 'uppercase' }}>NOS TRAJO</div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', letterSpacing: '0.1em', color: '#E8DCC8', lineHeight: 1 }}>LA CUARTA</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '36px' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.22em', color: '#9E8E7A', textDecoration: 'none', transition: 'color 0.2s', textTransform: 'uppercase' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8A96E'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9E8E7A'; }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="#cuarta-reservas"
              className="hidden md:inline-flex"
              style={{
                background: '#C8A96E', color: '#0D1A0D',
                padding: '8px 20px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px', letterSpacing: '0.22em', fontWeight: 700,
                textDecoration: 'none', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DFC28A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C8A96E'; }}
            >
              RESERVAR
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#E8DCC8', padding: '4px' }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 90,
              background: 'rgba(13,26,13,0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Bebas Neue', cursive", fontSize: '52px', letterSpacing: '0.08em',
                  color: '#E8DCC8', textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8A96E'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#E8DCC8'; }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <a
                href="#cuarta-reservas"
                onClick={() => setOpen(false)}
                style={{
                  background: '#C8A96E', color: '#0D1A0D',
                  padding: '14px 40px',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '13px', letterSpacing: '0.25em', fontWeight: 700,
                  textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block',
                }}
              >
                RESERVAR MESA
              </a>
            </motion.div>
            <motion.a
              href={WA_URL}
              target="_blank"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.2em', color: '#4CAF88', textDecoration: 'none', textTransform: 'uppercase' }}
            >
              <MessageCircle size={16} /> WHATSAPP
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
