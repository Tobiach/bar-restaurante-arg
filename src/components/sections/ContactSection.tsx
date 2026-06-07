import { Clock, Phone, Instagram, MessageCircle } from 'lucide-react';
import { tenantConfig } from '../../config/tenant.config';
import { useToast } from '../Toast';

const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;

export default function ContactSection() {
  const { showToast } = useToast();

  return (
    <section id="sec-contacto" className="py-20 bg-violeta">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card-premium h-[400px] relative overflow-hidden flex flex-col">
            <div className="flex-1 bg-violeta-medio flex items-center justify-center p-8 text-center bg-[radial-gradient(var(--naranja-glow)_1px,transparent_1px)] bg-[size:20px_20px]">
              <div className="relative">
                <div className="w-12 h-12 bg-naranja rounded-full flex items-center justify-center animate-ping absolute -top-4 -left-4 opacity-40"></div>
                <div className="w-4 h-4 bg-naranja rounded-full relative z-10 border-2 border-white"></div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-2">{tenantConfig.direccion.split(',')[0]}</h3>
                  <p className="text-blanco-muted">{tenantConfig.direccion.split(',').slice(1).join(',').trim()}</p>
                </div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${tenantConfig.googleMapsQuery}`}
              target="_blank"
              className="p-4 bg-naranja text-white font-display text-center font-bold tracking-widest hover:bg-naranja-claro transition-all"
            >
              VER EN GOOGLE MAPS →
            </a>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">Vení a Vivir la Isla</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="text-naranja mt-1" size={20} />
                    <div className="text-sm">
                      <h4 className="font-bold text-naranja uppercase text-[10px] tracking-widest mb-2">Horarios</h4>
                      {tenantConfig.horarios.detalle.map((d, i) => (
                        <p key={i} className="text-blanco-muted">{d}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="text-naranja mt-1" size={20} />
                    <div className="text-sm">
                      <h4 className="font-bold text-naranja uppercase text-[10px] tracking-widest mb-2">Contacto</h4>
                      <p className="text-blanco-muted">{tenantConfig.telefono}</p>
                      <p className="text-blanco-muted">{tenantConfig.email}</p>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={`https://instagram.com/${tenantConfig.instagram}`}
                          target="_blank"
                          className="p-2 bg-violeta-card rounded-lg hover:text-naranja transition-colors"
                        >
                          <Instagram size={18} />
                        </a>
                        <a
                          href={WA_URL}
                          target="_blank"
                          className="p-2 bg-violeta-card rounded-lg hover:text-naranja transition-colors"
                        >
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-violeta-card p-8 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-6 italic">¿Tenés alguna consulta?</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#sec-reservas" className="btn-primary flex-1 text-center py-4">RESERVÁ YA</a>
                <button
                  onClick={() => window.open(WA_URL, '_blank')}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2 py-4"
                >
                  <MessageCircle size={20} /> CHATEAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
