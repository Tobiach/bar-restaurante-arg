import { ChevronRight, Phone, Calendar, MessageCircle, Instagram } from 'lucide-react';
import { tenantConfig } from '../../config/tenant.config';
import { useToast } from '../Toast';

const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;

export default function Footer() {
  const { showToast } = useToast();

  return (
    <footer className="bg-violeta-medio py-20 border-t border-naranja-borde/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-4 mb-6">
              <img src={tenantConfig.logo} alt={tenantConfig.nombre} className="h-14 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="font-titulo text-2xl font-black tracking-tighter text-white">ISLA</span>
                <span className="font-display text-[10px] tracking-[0.2em] text-naranja">BAR CULTURAL</span>
              </div>
            </a>
            <p className="text-sm text-blanco-muted leading-relaxed">{tenantConfig.footer.descripcion}</p>
          </div>

          <div>
            <h4 className="font-display tracking-widest text-xs uppercase text-naranja mb-6">Explorá</h4>
            <div className="flex flex-col gap-3 text-sm text-blanco-muted">
              {tenantConfig.footer.links.explorar.map(link => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display tracking-widest text-xs uppercase text-naranja mb-6">Festejos</h4>
            <div className="flex flex-col gap-3 text-sm text-blanco-muted">
              {tenantConfig.footer.links.festejos.map(link => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              ))}
              <button onClick={() => showToast("Muy pronto: Comprá online tu Gift Card", "info")} className="text-left hover:text-white transition-colors">Gift Cards</button>
            </div>
          </div>

          {tenantConfig.features.newsletter && (
            <div>
              <h4 className="font-display tracking-widest text-xs uppercase text-naranja mb-6">Isla News</h4>
              <p className="text-xs text-blanco-muted mb-4 leading-relaxed">Sumate para enterarte de los shows sorpresa.</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as any).querySelector('input').value;
                  if (email) {
                    showToast("¡Te sumaste a las noticias!", "exito");
                    (e.target as any).reset();
                  }
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Tu email..."
                  className="bg-violeta/50 border border-violeta-borde rounded-lg px-4 py-2 text-xs outline-none focus:border-naranja flex-1"
                />
                <button type="submit" className="bg-naranja p-3 rounded-lg hover:bg-naranja-claro transition-colors">
                  <ChevronRight size={16} />
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-violeta-borde flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-blanco-muted uppercase tracking-[0.2em]">
          <span>{tenantConfig.footer.copyright}</span>
          <div className="flex gap-8">
            <button onClick={() => showToast("Sección en construcción", "info")} className="hover:text-white">Privacidad</button>
            <button onClick={() => showToast("Sección en construcción", "info")} className="hover:text-white">Términos</button>
            <button onClick={() => showToast(`Mandanos tu CV a ${tenantConfig.email}`, "info")} className="hover:text-white">Trabajá con nosotros</button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden sticky bottom-0 left-0 w-full bg-violeta-medio border-t border-naranja-borde flex h-16 z-50">
        <a href={`tel:${tenantConfig.telefono}`} className="flex-1 flex flex-col items-center justify-center gap-1 border-r border-violeta-borde">
          <Phone size={20} className="text-naranja" />
          <span className="text-[10px] font-display font-bold tracking-widest">LLAMAR</span>
        </a>
        <a href={WA_URL} className="flex-1 flex flex-col items-center justify-center gap-1 border-r border-violeta-borde">
          <MessageCircle size={20} className="text-verde-ok" />
          <span className="text-[10px] font-display font-bold tracking-widest">WHATSAPP</span>
        </a>
        <a href="#sec-reservas" className="flex-1 flex flex-col items-center justify-center gap-1 bg-naranja text-white">
          <Calendar size={20} />
          <span className="text-[10px] font-display font-bold tracking-widest">RESERVAR</span>
        </a>
      </div>
    </footer>
  );
}
