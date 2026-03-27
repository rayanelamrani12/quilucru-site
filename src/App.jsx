import React, { useState, useEffect } from 'react';
import { 
  Mail, Instagram, Phone, Theater, ArrowRight, 
  Menu, X, FileText, Send, ChevronRight, Ticket, 
  MapPin, Award, CheckCircle2, Expand, Info 
} from 'lucide-react';

// --- DONNÉES STATIQUES ---

const TEAM = [
  { 
    name: "Jeanne Arsac", 
    role: "Mise en scène / Jeu", 
    bio: "Celle qui donne la direction avec un regard frais et sincère.",
    details: "À 21 ans, Jeanne insuffle une énergie vitale au projet. Diplômée du Cours Florent Montpellier, elle privilégie une direction d'acteurs basée sur l'instinct et la vérité émotionnelle. Elle incarne la vision artistique de QuiLuCru ?.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Gabriel Rodriguez", 
    role: "Auteur / Jeu", 
    bio: "C'est les larmes de rigoler.",
    details: "My name is Uvuvwevwevwe Onyetenyevwe Ugwemubwem Osas.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Hugo Metais", 
    role: "Auteur / Jeu", 
    bio: "La force tranquille capable de vous faire rire et pleurer d'un trait.",
    details: "À 29 ans, Hugo allie maturité et sens de l'improvisation. Son expérience nourrit un jeu rythmé et une écriture percutante.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Augustin Allard", 
    role: "Jeu", 
    bio: "La précision et l'engagement total au service du groupe.",
    details: "À 24 ans, Augustin se distingue par une rigueur technique impeccable. Il est le garant de la cohérence rythmique sur scène.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Albin Thevenin", 
    role: "Jeu", 
    bio: "La nouvelle garde, de la fraîcheur et une justesse rare.",
    details: "À 21 ans, Albin incarne la sensibilité et la jeunesse de la promotion. Son jeu, tout en nuances, apporte une touche de poésie nécessaire aux créations.",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=400"
  }
];

const SHOWS = [
  {
    id: 'cavaliers',
    title: "La Danse des Cavaliers",
    tag: "Création Originale",
    desc: "L'histoire de deux frères unis par les échecs, explorée à travers quatre âges de leur vie.",
    accent: "bg-[#7C1A1A]/10 text-[#7C1A1A] border-[#7C1A1A]/20",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800",
    fullDesc: "Max et Léon, deux frères, un échiquier, et la vie qui défile. De la passion dévorante de l'enfance aux silences de la vieillesse, la pièce interroge nos liens et le temps qui passe.",
  },
  {
    id: 'cyrano',
    title: "Cyrano Autrement",
    tag: "Réécriture Engagée",
    desc: "Une version jeune, humoristique et contemporaine du chef-d'œuvre de Rostand.",
    accent: "bg-[#111111]/5 text-[#111111] border-[#111111]/10",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=800",
    fullDesc: "Oubliez les dorures. Voici un Cyrano nerveux, drôle et profondément humain. Une réécriture qui respecte l'âme du texte tout en parlant aux enjeux de notre époque.",
  }
];

const GALLERY = [
  { url: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=1200", title: "Lumières", size: "md:col-span-2 md:row-span-2" },
  { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800", title: "Répétition", size: "md:col-span-1" },
  { url: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=800", title: "Le Plateau", size: "md:col-span-1" },
  { url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200", title: "Cyrano", size: "md:col-span-2" },
  { url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800", title: "L'instant", size: "md:col-span-2 row-span-1" },
];

const COLORS = {
  bg: "#FEFBEA",
  primary: "#7C1A1A",
  text: "#111111",
};

// --- COMPOSANT PRINCIPAL ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [resStep, setResStep] = useState('select'); 
  const [resData, setResData] = useState({ date: null, name: '', email: '', tickets: 1 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;1,9..144,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes hypnotic-zoom {
        0% { transform: scale(1.0); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1.0); }
      }
      .animate-hypnotic {
        animation: hypnotic-zoom 10s ease-in-out infinite;
      }
      .font-title { font-family: 'Fraunces', serif; }
      .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      .font-accent { font-family: 'Playfair Display', serif; }
      
      .text-outline-contrast {
        -webkit-text-stroke: 1.8px ${COLORS.text};
        paint-order: stroke fill;
      }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
      ::-webkit-scrollbar-thumb { background: ${COLORS.primary}; border-radius: 10px; }
      
      html, body, #root { 
        background-color: ${COLORS.bg} !important; 
        color: ${COLORS.text}; 
        margin: 0; 
        padding: 0; 
        overflow-x: hidden; 
      }
      select, input, textarea { 
        background-color: ${COLORS.bg} !important; 
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = encodeURIComponent(`Message de ${formData.get('name')} - Site QuiLuCru`);
    const body = encodeURIComponent(formData.get('message'));
    window.location.href = `mailto:ciequilucru@gmail.com?subject=${subject}&body=${body}`;
  };

  const ShowOverlay = ({ type, show, onClose }) => {
    const handleNext = () => {
      if (resStep === 'select') setResStep('form');
      else if (resStep === 'form') setResStep('success');
    };

    return (
      <div className="fixed inset-0 z-[110] bg-[#FEFBEA] overflow-y-auto animate-in slide-in-from-right duration-500">
        <div className="max-w-5xl mx-auto px-8 py-20 relative font-body text-[#111111]">
          <button onClick={() => { setResStep('select'); onClose(); }} className="fixed top-8 right-8 p-3 rounded-full bg-[#111111] text-[#FEFBEA] hover:bg-[#7C1A1A] transition-all z-50 flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
            <X size={16} /> Fermer
          </button>
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="text-[#7C1A1A] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              {type === 'dossier' ? 'Dossier Artistique' : 'Espace Billetterie'}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-12 uppercase tracking-tighter font-title">{show.title}</h2>
            
            {type === 'dossier' ? (
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold mb-6 underline decoration-[#7C1A1A]/30 underline-offset-8 font-title">Note d'intention</h3>
                    <p className="text-xl text-zinc-700 font-light leading-relaxed">{show.fullDesc}</p>
                  </section>
                  <div className="bg-[#111111]/5 p-10 rounded-[2rem] border border-[#111111]/10 shadow-sm">
                    <h3 className="text-xs font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-[#7C1A1A]"><FileText size={18}/> Vision de la troupe</h3>
                    <p className="text-zinc-600 font-light leading-relaxed italic text-lg">On mise sur la force du collectif et sur une écriture qui cherche à toucher la sensibilité de chacun, sans filtre social.</p>
                  </div>
                </div>
                <div className="p-6 bg-[#FEFBEA] border border-[#111111]/10 rounded-2xl shadow-sm h-fit text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Durée</p>
                  <p className="font-bold text-xl uppercase tracking-tight font-title">1h15 environ</p>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto py-10">
                {resStep === 'select' && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <p className="text-lg font-medium mb-8 italic">Sélectionnez une séance :</p>
                    {[{ id: 1, date: "11 Octobre", lieu: "Carcans", heure: "19h00" }, { id: 2, date: "18 Octobre", lieu: "Montpellier", heure: "20h30" }].map((date, i) => (
                      <button key={i} onClick={() => { setResData({...resData, date}); setResStep('form'); }} className="w-full flex items-center justify-between p-8 bg-[#FEFBEA] hover:bg-[#7C1A1A] hover:text-[#FEFBEA] border border-[#111111]/10 rounded-3xl transition-all group">
                        <div className="text-left font-body"><p className="font-extrabold text-lg uppercase tracking-tight">{date.date} — {date.lieu}</p></div>
                        <div className="flex items-center gap-6 font-bold text-lg">{date.heure} <ArrowRight size={18}/></div>
                      </button>
                    ))}
                  </div>
                )}
                {resStep === 'form' && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-4">
                    <div className="space-y-6">
                      <input type="text" placeholder="Votre nom complet" className="w-full bg-[#FEFBEA] border border-[#111111]/20 rounded-2xl p-5 outline-none font-medium focus:border-[#7C1A1A]" onChange={(e) => setResData({...resData, name: e.target.value})} />
                      <input type="email" placeholder="Votre email" className="w-full bg-[#FEFBEA] border border-[#111111]/20 rounded-2xl p-5 outline-none font-medium focus:border-[#7C1A1A]" onChange={(e) => setResData({...resData, email: e.target.value})} />
                      <button onClick={() => setResStep('success')} disabled={!resData.name || !resData.email} className="w-full bg-[#7C1A1A] text-[#FEFBEA] py-5 rounded-full font-bold uppercase tracking-widest disabled:opacity-30">Réserver maintenant</button>
                    </div>
                  </div>
                )}
                {resStep === 'success' && (
                  <div className="text-center py-10 animate-in zoom-in-95">
                    <CheckCircle2 size={64} className="mx-auto text-[#7C1A1A] mb-6" />
                    <h3 className="text-3xl font-bold mb-4 font-title text-[#111111]">C'est réservé !</h3>
                    <p className="text-zinc-600 italic text-lg">On a bien noté tout ça. On vous envoie un mail de confirmation très vite.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-body bg-[#FEFBEA]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#FEFBEA]/95 backdrop-blur-md py-4 border-b border-[#111111]/5 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[#111111]">
          <button onClick={() => setCurrentPage('accueil')} className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7C1A1A] rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm">
              <Theater size={18} className="text-[#FEFBEA]" />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase font-title">
              QUILU<span className="text-[#7C1A1A] font-accent font-light italic lowercase">cru</span>
            </span>
          </button>
          <div className="hidden md:flex items-center space-x-8">
            {['La Compagnie', 'Spectacles', 'Galerie', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase().replace(' ', ''))}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-[#7C1A1A] ${currentPage === item.toLowerCase().replace(' ', '') ? 'text-[#7C1A1A]' : 'text-zinc-500'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#FEFBEA] z-[100] flex flex-col justify-center items-center space-y-10 animate-in fade-in">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-[#111111]"><X size={32}/></button>
          {['La Compagnie', 'Spectacles', 'Galerie', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '')); setIsMenuOpen(false); }}
              className="text-4xl font-extrabold uppercase tracking-tighter font-title text-[#111111]"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Pop-up Théâtre Populaire */}
      {isPopOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#FEFBEA] p-10 rounded-[3rem] max-w-lg w-full relative shadow-2xl border border-[#111111]/10">
            <button onClick={() => setIsPopOpen(false)} className="absolute top-6 right-6 text-[#111111] hover:rotate-90 transition-transform"><X size={24} /></button>
            <h3 className="text-3xl font-bold mb-6 font-title text-[#111111]">C'est quoi pour nous ?</h3>
            <div className="space-y-4 font-body text-zinc-700 leading-relaxed italic text-lg">
              <p>C'est tout simplement l'envie que vous soyez tous invités, sans exception.</p>
              <p>On ne veut pas d'un théâtre intimidant ou réservé à ceux qui ont déjà tous les codes. On veut des histoires qui se partagent, qui font rire ou pleurer parce qu'elles parlent de la vie, la vraie.</p>
              <p>C'est direct, c'est généreux, et c'est surtout pour vous. Bienvenue dans notre théâtre sans chichis.</p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Galerie */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[200] bg-[#111111]/95 flex items-center justify-center p-4 animate-in fade-in duration-300 cursor-zoom-out" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-8 right-8 text-[#FEFBEA]"><X size={40}/></button>
          <img src={lightboxImg.url} alt={lightboxImg.title} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
          <div className="absolute bottom-10 text-[#FEFBEA] text-center w-full">
            <p className="font-title text-3xl uppercase tracking-tighter">{lightboxImg.title}</p>
          </div>
        </div>
      )}

      {/* Modal Détails Membre */}
      {selectedMember && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#FEFBEA] rounded-[2.5rem] max-w-2xl w-full overflow-hidden relative shadow-2xl border border-[#111111]/5">
            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-2 rounded-full bg-[#111111]/5 text-[#111111] hover:bg-[#7C1A1A] hover:text-[#FEFBEA] transition-colors z-10"><X size={20} /></button>
            <div className="grid md:grid-cols-2">
              <img src={selectedMember.image} className="h-64 md:h-full w-full object-cover" alt={selectedMember.name} />
              <div className="p-12">
                <span className="text-[#7C1A1A] text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">L'Équipe artistique</span>
                <h3 className="text-3xl font-extrabold mb-6 uppercase tracking-tighter font-title text-[#111111]">{selectedMember.name}</h3>
                <p className="text-zinc-600 font-light leading-relaxed mb-8">{selectedMember.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeOverlay && <ShowOverlay type={activeOverlay.type} show={activeOverlay.show} onClose={() => setActiveOverlay(null)} />}

      <main>
        {/* Accueil */}
        {currentPage === 'accueil' && (
          <section className="relative min-h-screen flex items-center px-8 overflow-hidden text-center justify-center bg-[#FEFBEA]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60 animate-hypnotic" alt="Scène" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FEFBEA]/40 via-transparent to-[#FEFBEA]/95"></div>
            </div>
            <div className="max-w-4xl z-10">
              <button 
                onClick={() => setIsPopOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FEFBEA]/90 border border-zinc-200 text-[#7C1A1A] text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-sm hover:bg-[#7C1A1A] hover:text-[#FEFBEA] transition-all group font-body"
              >
                <Info size={14} className="group-hover:rotate-12 transition-transform" /> Théâtre Populaire
              </button>
              <h1 className="text-5xl md:text-8xl font-extrabold text-[#111111] leading-[1.1] mb-10 tracking-tighter font-title">
                L'émotion brute, <br/> 
                <span className="italic font-light text-[#7C1A1A] font-accent text-outline-contrast">sans les codes.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-800 max-w-2xl mx-auto mb-12 font-light leading-relaxed font-body">
                Cinq artistes, une vision : créer un théâtre vivant qui parle à tout le monde. Une scène sincère, loin de l'entre-soi.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-body">
                <button onClick={() => setCurrentPage('spectacles')} className="w-full sm:w-auto bg-[#7C1A1A] text-[#FEFBEA] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-[#111111] transition-all shadow-xl shadow-[#7C1A1A]/30">Nos Créations <ArrowRight size={16} /></button>
                <button onClick={() => setCurrentPage('lacompagnie')} className="w-full sm:w-auto px-12 py-5 rounded-full border border-zinc-200 bg-[#FEFBEA]/60 text-[#111111] font-bold uppercase tracking-widest text-[10px] hover:bg-[#FEFBEA] transition-all">La Compagnie</button>
              </div>
            </div>
          </section>
        )}

        {/* La Compagnie */}
        {currentPage === 'lacompagnie' && (
          <div className="pt-40 pb-32 px-8 animate-in fade-in duration-700 bg-[#FEFBEA]">
            <div className="max-w-6xl mx-auto text-[#111111]">
              <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#7C1A1A] font-black text-[10px] uppercase tracking-[0.3em] mb-6 font-body"><Award size={14}/> Prix Carcans 2025</div>
                  <h2 className="text-5xl md:text-7xl font-bold mb-10 uppercase tracking-tighter font-title leading-tight">Qui Lu <span className="text-[#7C1A1A] font-accent italic">Cru ?</span></h2>
                  <div className="space-y-6 text-xl leading-relaxed font-body text-zinc-800">
                    <p>On est une bande de cinq amis, sortis de la même promotion du Cours Florent Montpellier en juin 2024. Très vite, une évidence s'est imposée à nous : l'aventure ne pouvait pas s'arrêter aux portes de l'école.</p>
                    <p>Notre projet est né d'une envie simple : partager notre amour du jeu avec tout le monde. On croit fermement que le théâtre n'est pas un art réservé à une élite ou aux grandes salles feutrées. C'est avant tout un moment de vie, de rire et de sincérité qui appartient à chacun d'entre vous.</p>
                    <p>On défend un théâtre qui va droit au cœur, sans filtre et sans détours. Depuis notre premier prix au festival de Carcans, on parcourt les routes pour venir vous raconter nos histoires, avec toute notre énergie et notre passion.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-[#7C1A1A]/5 rounded-[3rem] -rotate-2 scale-105"></div>
                  <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200" className="relative rounded-[3rem] shadow-xl grayscale hover:grayscale-0 transition-all duration-1000 border border-[#111111]/5" alt="La Troupe" />
                </div>
              </div>
              <div className="text-center mb-20">
                <h3 className="text-3xl font-extrabold uppercase tracking-tighter mb-4 font-title">L'Équipe Artistique</h3>
                <div className="h-1 w-20 bg-[#7C1A1A] mx-auto rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {TEAM.map((member, i) => (
                  <div key={i} onClick={() => setSelectedMember(member)} className="group cursor-pointer p-10 rounded-[2.5rem] bg-[#FEFBEA] border border-[#111111]/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-[2rem] overflow-hidden mb-8 group-hover:scale-105 transition-transform shadow-sm"><img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} /></div>
                    <h4 className="text-xl font-extrabold mb-1 uppercase tracking-tight font-title text-[#111111]">{member.name}</h4>
                    <p className="text-[#7C1A1A] text-[10px] font-black uppercase mb-6 tracking-widest font-body">{member.role}</p>
                    <p className="text-zinc-500 font-light text-sm mb-6 line-clamp-2 font-body italic">"{member.bio}"</p>
                    <span className="text-[10px] text-[#7C1A1A] font-black uppercase tracking-[0.2em] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all font-body">Voir sa fiche <ChevronRight size={12} /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spectacles */}
        {currentPage === 'spectacles' && (
          <div className="pt-40 pb-32 px-8 animate-in fade-in duration-700 bg-[#FEFBEA]">
            <div className="max-w-6xl mx-auto space-y-40 text-[#111111]">
              <div className="text-center mb-32">
                <h2 className="text-6xl md:text-8xl font-extrabold mb-6 uppercase tracking-tighter font-title">Répertoire</h2>
                <div className="h-1.5 w-32 bg-[#7C1A1A] mx-auto rounded-full"></div>
              </div>
              {SHOWS.map((show, i) => (
                <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-20 items-center`}>
                  <div className="w-full md:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative group border border-[#111111]/5"><img src={show.image} className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105" alt={show.title} /></div>
                  <div className="w-full md:w-1/2 text-left">
                    <div className={`inline-block px-5 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-8 font-body ${show.accent}`}>{show.tag}</div>
                    <h3 className="text-5xl md:text-7xl font-extrabold mb-8 uppercase tracking-tighter leading-none font-title">{show.title}</h3>
                    <p className="text-zinc-600 text-xl font-light leading-relaxed mb-12 font-body">{show.desc}</p>
                    <div className="flex flex-wrap gap-5 font-body">
                      <button onClick={() => { setResStep('select'); setActiveOverlay({ type: 'reservation', show }); }} className="flex items-center gap-4 bg-[#7C1A1A] text-[#FEFBEA] px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#111111] transition-all shadow-xl active:scale-95"><Ticket size={18} /> Réserver</button>
                      <button onClick={() => setActiveOverlay({ type: 'dossier', show })} className="flex items-center gap-4 border-2 border-[#111111] text-[#111111] px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#111111] hover:text-[#FEFBEA] transition-all active:scale-95"><FileText size={18} /> Dossier Artistique</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Galerie */}
        {currentPage === 'galerie' && (
          <div className="pt-40 pb-32 px-8 animate-in fade-in duration-700 bg-[#FEFBEA]">
            <div className="max-w-6xl mx-auto text-[#111111]">
              <div className="text-center mb-24">
                <h2 className="text-6xl md:text-8xl font-extrabold mb-6 uppercase tracking-tighter font-title">Galerie</h2>
                <p className="text-[#7C1A1A] font-body font-medium italic text-xl">Quelques souvenirs de scène, tout simplement.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[350px]">
                {GALLERY.map((img, i) => (
                  <div key={i} className={`relative overflow-hidden group rounded-[1.5rem] md:rounded-[2.5rem] ${img.size} border border-[#111111]/5 shadow-sm cursor-zoom-in`} onClick={() => setLightboxImg(img)}>
                    <img src={img.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0" alt={img.title} />
                    <div className="absolute inset-0 bg-[#111111]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 md:p-8 text-[#FEFBEA]">
                      <Expand className="mb-2" size={24} />
                      <p className="font-title text-lg md:text-2xl uppercase tracking-tighter">{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact */}
        {currentPage === 'contact' && (
          <div className="pt-40 pb-32 px-8 min-h-screen animate-in fade-in duration-700 bg-[#FEFBEA]">
            <div className="max-w-6xl mx-auto">
              <div className="relative mb-24 py-10">
                <div className="absolute top-0 left-0 w-32 h-2 bg-[#7C1A1A] rounded-full"></div>
                <div className="flex flex-col space-y-1">
                  <p className="text-[#6B7280] font-body text-xl md:text-3xl italic">Programmation, Collaboration, Suggestion...</p>
                  <h2 className="text-[#111111] font-title text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-tight">ou simplement pour nous féliciter</h2>
                  <p className="text-[#7C1A1A] font-accent text-3xl md:text-5xl italic lowercase">(on vous aime aussi).</p>
                </div>
              </div>
              <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2 space-y-4 font-body text-[#111111]">
                  <a href="mailto:ciequilucru@gmail.com" className="flex items-center justify-between p-10 rounded-[3rem] bg-[#FEFBEA] border border-[#111111]/10 shadow-sm transition-all duration-500 hover:translate-y-[-5px] group">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-8">Écrivez-nous</p>
                      <div className="text-xl font-extrabold font-title group-hover:text-[#7C1A1A] transition-colors">ciequilucru@gmail.com</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#7C1A1A]/5 flex items-center justify-center text-[#7C1A1A] group-hover:bg-[#7C1A1A] group-hover:text-[#FEFBEA] transition-all"><Mail size={22}/></div>
                  </a>
                  <a href="tel:+33614522032" className="flex items-center justify-between p-10 rounded-[3rem] bg-[#FEFBEA] border border-[#111111]/10 shadow-sm transition-all duration-500 hover:translate-y-[-5px] group">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-8">Appelez-nous</p>
                      <div className="text-2xl font-extrabold font-title italic underline decoration-[#7C1A1A] decoration-2 underline-offset-4">+33 6 14 52 20 32</div>
                      <p className="mt-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest italic">nous aussi on a envie d'entendre votre voix.</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#7C1A1A]/5 flex items-center justify-center text-[#7C1A1A] group-hover:bg-[#7C1A1A] group-hover:text-[#FEFBEA] transition-all"><Phone size={22}/></div>
                  </a>
                  <div onClick={() => window.open('https://instagram.com/cie_quilucru')} className="flex items-center justify-between p-10 rounded-[3rem] bg-[#FEFBEA] border border-[#111111]/10 shadow-sm group transition-all duration-500 hover:translate-y-[-5px] hover:border-[#7C1A1A] cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#7C1A1A]/10 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-[#7C1A1A] group-hover:text-[#FEFBEA] text-[#7C1A1A]"><Instagram size={22}/></div>
                      <span className="font-extrabold uppercase tracking-widest text-[10px]">@cie_quilucru</span>
                    </div>
                    <ChevronRight size={16}/>
                  </div>
                </div>
                <div className="lg:col-span-3 bg-[#FEFBEA] p-12 rounded-[3.5rem] border border-[#111111]/10 shadow-xl">
                  <form className="space-y-8" onSubmit={handleSendMessage}>
                    <div className="grid sm:grid-cols-2 gap-8 font-body text-[#111111]">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4 italic">Votre Identité</label>
                        <input name="name" type="text" placeholder="Qui êtes-vous ?" className="w-full bg-[#FEFBEA] border-b border-[#111111]/10 rounded-none p-4 text-[#111111] focus:border-[#7C1A1A] outline-none transition-all font-medium placeholder:opacity-30" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4 italic">Email</label>
                        <input name="email" type="email" placeholder="Pour vous répondre..." className="w-full bg-[#FEFBEA] border-b border-[#111111]/10 rounded-none p-4 text-[#111111] focus:border-[#7C1A1A] outline-none transition-all font-medium placeholder:opacity-30" required />
                      </div>
                    </div>
                    <div className="space-y-2 font-body text-[#111111]">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4 italic">Votre Message</label>
                      <textarea name="message" placeholder="Dites-nous tout ! On a hâte de vous lire." rows="5" className="w-full bg-[#FEFBEA] border-b border-[#111111]/10 rounded-none p-4 text-[#111111] focus:border-[#7C1A1A] outline-none transition-all resize-none font-medium placeholder:opacity-30" required></textarea>
                    </div>
                    <button type="submit" className="flex items-center gap-4 bg-[#7C1A1A] text-[#FEFBEA] px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#111111] transition-all shadow-xl active:scale-95">Envoyer le message <Send size={16}/></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#FEFBEA] py-20 px-8 border-t border-[#111111]/5 text-center font-body text-[#111111]">
        <div className="text-[10px] font-black uppercase tracking-[0.8em] italic opacity-20 mb-4">QuiLuCru ?</div>
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 italic">© 2026 — Compagnie de Théâtre — Montpellier</p>
      </footer>
    </div>
  );
};

export default App;