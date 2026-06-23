import React, { useState, useEffect } from "react";
import { Wine, Navigation, ShoppingBag, Leaf, Award, ShieldAlert, Heart, Star, ArrowRight } from "lucide-react";
import { Product } from "../data";

interface LandingViewProps {
  onExplore: () => void;
  onLoginClick: () => void;
  products: Product[];
}

export default function LandingView({ onExplore, onLoginClick, products }: LandingViewProps) {
  // Simple state for animated impact counter simulation
  const [co2Saved, setCo2Saved] = useState(2570);
  const [waterSaved, setWaterSaved] = useState(87400);
  const [producers, setProducers] = useState(68);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Saved((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      setWaterSaved((prev) => prev + (Math.random() > 0.7 ? 12 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-cocoa font-sans selection:bg-bordeaux/20">
      
      {/* Dynamic Aesthetic Hero Section with radial radial-bg gradient and glass look */}
      <header className="relative overflow-hidden radial-bg text-warmwhite py-16 px-6 sm:px-12 md:py-24 md:px-24">
        {/* Subtle decorative glass background circles */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-amber/20 blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-bordeaux/30 blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
          
          {/* Hero text */}
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warmwhite/10 border border-warmwhite/20 text-amber text-xs font-semibold uppercase tracking-wider mb-6">
              <Wine className="w-4 h-4" /> Hedonismo Sustentável
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight text-white mb-6 leading-tight">
              Escolha o que faz bem. <br />
              <span className="text-amber">Para você.</span> <br />
              <span className="text-moss">Para o planeta.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-warmwhite/80 font-light mb-8 leading-relaxed">
              VivaVinho une a sofisticação de rótulos selecionados, cacau selvagem agroflorestal e cafés exóticos da natureza com a mais alta transparência socioambiental e a remoção real de CO₂ da atmosfera por meio do uso de biochar na lavoura ou agroforesta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="btn-hero-explore"
                onClick={onExplore}
                className="px-8 py-4 rounded-xl bg-amber hover:bg-amber/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                Explorar o Marketplace <ArrowRight className="w-5 h-5 animate-pulse" />
              </button>
              <button
                id="btn-hero-login"
                onClick={onLoginClick}
                className="px-8 py-4 rounded-xl bg-warmwhite/15 outline-1 outline-white/20 hover:bg-warmwhite/25 text-white font-medium transition-all duration-300 flex items-center justify-center"
              >
                Entrar com Conta Demo
              </button>
            </div>
          </div>

          {/* Interactive display mockup holding premium item highlights using Glass Design */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="glass-panel-dark text-warmwhite p-8 rounded-3xl relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/15 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber/10 blur-xl"></div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono">Destaque da Estação</span>
                <span className="bg-moss/40 border border-moss text-white text-[10px] uppercase font-bold py-1 px-2.5 rounded-full flex items-center gap-1">
                  🌱 Carbono Neutro
                </span>
              </div>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-16 h-20 rounded-xl bg-bordeaux flex items-center justify-center text-2xl shadow-inner">
                  🍷
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">Chardonnay Orange Natural</h3>
                  <p className="text-xs text-white/60">Vinhos do Vento Coctel — SC</p>
                  <p className="text-amber font-serif text-sm mt-1">R$ 154,00</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 font-sans">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Biodiversidade Atendida:</span>
                  <span className="text-moss font-semibold">1.1 m² preservados</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Água Doce Poupada:</span>
                  <span className="text-moss font-semibold">52 Litros / Unidade</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">CO₂ Compensado:</span>
                  <span className="text-moss font-semibold">-1.9 kg CO₂eq</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <span className="text-[10px] font-semibold bg-white/10 text-white/90 px-2 py-1 rounded">Selo Orgânico</span>
                <span className="text-[10px] font-semibold bg-white/10 text-white/90 px-2 py-1 rounded">Selo Vegano</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Seção 1 — Como funciona (3 cards glass com ícones) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-bordeaux font-bold mb-4">Como Funciona o Hedonismo Consciente</h2>
          <p className="text-cocoa/70 max-w-lg mx-auto font-light">Uma curadoria elegante de alta gastronomia onde cada compra nutre comunidades locais e preserva biomas protegidos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-white bg-white/40 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-bordeaux/10 text-bordeaux flex items-center justify-center mb-6">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cocoa mb-3">1. Escolha Premium</h3>
            <p className="text-sm text-cocoa/70 leading-relaxed font-light">
              Navegue por nossa adega de vinhos naturais e orgânicos, cafés agroecológicos colhidos na sombra e chocolates puros produzidos sob modelo florestal.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white bg-white/40 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-moss/10 text-moss flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cocoa mb-3">2. Transparência Real</h3>
            <p className="text-sm text-cocoa/70 leading-relaxed font-light">
              Cada produto acompanha uma ficha de impacto calculando litros de água preservados, kg de CO₂ removido (por biochar na lavoura ou sistemas agroflorestais) e biomas restaurados com certificações ativas.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white bg-white/40 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber/10 text-amber flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cocoa mb-3">3. Regeneração Ativa</h3>
            <p className="text-sm text-cocoa/70 leading-relaxed font-light">
              Parte do valor reverte no apoio financeiro a pequenos produtores rurais e no plantio direto de arborizações agrícolas para recuperação hídrica de bacias.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 2 — Categorias em destaque com imagem e impacto estimado */}
      <section className="py-16 bg-warmwhite border-y border-cocoa/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-bordeaux font-bold">Nossa Curadoria Organológica</h2>
              <p className="text-cocoa/70 font-light mt-1">Sabores nativos originários de cultivo agroflorestal sustentável.</p>
            </div>
            <button onClick={onExplore} className="text-amber hover:text-amber/80 font-semibold flex items-center gap-1 group mt-4 md:mt-0">
              Ver catálogo completo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Vinho Categoria */}
            <div className="group rounded-2xl overflow-hidden glass-panel border border-white bg-white/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-40 bg-bordeaux/15 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">🍷</span>
                <span className="absolute top-3 left-3 bg-bordeaux/90 text-[10px] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Uvas Nativas</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-cocoa mb-1">Adega VivaVinho</h3>
                <p className="text-xs text-cocoa/60 min-h-8 mb-4">Biodinâmicos, laranjas, autorais e sem filtragens agressivas.</p>
                <div className="flex justify-between items-center text-xs border-t border-cocoa/5 pt-3">
                  <span className="text-cocoa/50">Média de impacto:</span>
                  <span className="font-semibold text-moss">~1.9 kg CO₂ removido</span>
                </div>
              </div>
            </div>

            {/* Cacau Categoria */}
            <div className="group rounded-2xl overflow-hidden glass-panel border border-white bg-white/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-40 bg-cocoa/15 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">🍫</span>
                <span className="absolute top-3 left-3 bg-cocoa/90 text-[10px] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Cabruca Real</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-cocoa mb-1">Cacau de Origem</h3>
                <p className="text-xs text-cocoa/60 min-h-8 mb-4">Barras de árvores nativas da Mata Atlântica de manejo sustentável.</p>
                <div className="flex justify-between items-center text-xs border-t border-cocoa/5 pt-3">
                  <span className="text-cocoa/50">Média de impacto:</span>
                  <span className="font-semibold text-moss">~2.0 m² floresta regenerada</span>
                </div>
              </div>
            </div>

            {/* Café Categoria */}
            <div className="group rounded-2xl overflow-hidden glass-panel border border-white bg-white/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-40 bg-amber/15 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">☕</span>
                <span className="absolute top-3 left-3 bg-amber/90 text-[10px] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Sombreados</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-cocoa mb-1">Grãos Especiais</h3>
                <p className="text-xs text-cocoa/60 min-h-8 mb-4">Arábicas cultivados na sombra com zero adubação de síntese química.</p>
                <div className="flex justify-between items-center text-xs border-t border-cocoa/5 pt-3">
                  <span className="text-cocoa/50">Média de impacto:</span>
                  <span className="font-semibold text-moss">~55 Litros de água do cerrado</span>
                </div>
              </div>
            </div>

            {/* Natureza Categoria */}
            <div className="group rounded-2xl overflow-hidden glass-panel border border-white bg-white/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="h-40 bg-moss/15 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">🍯</span>
                <span className="absolute top-3 left-3 bg-moss/90 text-[10px] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Biodiversidade</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-cocoa mb-1">Nutrientes Naturais</h3>
                <p className="text-xs text-cocoa/60 min-h-8 mb-4">Méles de abelhas nativas e granolas assadas bioativas premium.</p>
                <div className="flex justify-between items-center text-xs border-t border-cocoa/5 pt-3">
                  <span className="text-cocoa/50">Média de impacto:</span>
                  <span className="font-semibold text-moss">~4.0 m² abrigo de polinizador</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Seção 3 — Impacto coletivo da plataforma (contadores animados) */}
      <section className="py-20 radial-bg text-warmwhite relative overflow-hidden text-center px-6">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-bordeaux/20 blur-3xl rounded-full"></div>
        
        <div className="relative max-w-5xl mx-auto z-10">
          <span className="text-amber uppercase tracking-wider font-mono text-xs font-semibold">Métricas Coletivas Atualizadas</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-bold mt-2 mb-16">O Impacto gerado por cada gole e mordida</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
            <div>
              <div className="text-4xl md:text-5xl font-serif text-amber font-bold mb-2">
                {producers.toLocaleString()}
              </div>
              <p className="text-sm text-warmwhite/70">Produtores e Famílias Parceiras</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-white font-bold mb-2">
                {co2Saved.toLocaleString()} kg
              </div>
              <p className="text-sm text-warmwhite/70">CO₂eq Emitido Neutralizado Direto</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-moss font-bold mb-2 text-emerald-400">
                {waterSaved.toLocaleString()} L
              </div>
              <p className="text-sm text-warmwhite/70">Água de Nascente Preservada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4 — Depoimentos de compradores reais */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-bordeaux font-bold mb-4">Vozes de Quem Vivencia VivaVinho</h2>
          <p className="text-cocoa/70 max-w-lg mx-auto font-light">O depoimento sincero de nossos clientes que decidiram unir suas paixões à responsabilidade climática.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-2xl bg-white/40 border border-white shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber mb-4">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-amber text-amber" />)}
              </div>
              <p className="text-sm font-light text-cocoa/80 italic mb-6 leading-relaxed">
                "Não acreditava ser possível beber um Cabernet de alto padrão produzido com zero agrotóxico e que ao mesmo tempo financiasse sistemas agroecológicos do sul da Bahia. VivaVinho mudou por completo o meu conceito de adega em casa!"
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-cocoa/5 pt-4">
              <div className="w-10 h-10 rounded-full bg-bordeaux/20 flex items-center justify-center font-bold text-bordeaux text-xs">
                MA
              </div>
              <div>
                <h4 className="font-semibold text-cocoa text-sm">Mariana Albuquerque</h4>
                <p className="text-[10px] text-cocoa/50">Favorito: Cabernet Terroir Biodinâmico</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl bg-white/40 border border-white shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber mb-4">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-amber text-amber" />)}
              </div>
              <p className="text-sm font-light text-cocoa/80 italic mb-6 leading-relaxed">
                "O chocolate de cacau selvagem 85% com hortelã é absurdo no paladar, e a transparência do VivaVinho é incomparável. Ver que cada barra compensa mais de 1,5 kg de CO2eq é reconfortante para o coração do consumidor moderno."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-cocoa/5 pt-4">
              <div className="w-10 h-10 rounded-full bg-cocoa/20 flex items-center justify-center font-bold text-cocoa text-xs">
                TH
              </div>
              <div>
                <h4 className="font-semibold text-cocoa text-sm">Thiago Hermano</h4>
                <p className="text-[10px] text-cocoa/50">Favorito: Barra de Cacau Selvagem 85%</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl bg-white/40 border border-white shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber mb-4">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-amber text-amber" />)}
              </div>
              <p className="text-sm font-light text-cocoa/80 italic mb-6 leading-relaxed">
                "Os Cafés de sombreamento têm acidez perfeitamente brilhante. Como barista, aprecio a história do produtor descrita com carinho e o suporte real estendido para as pequenas associações agroecológicas."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-cocoa/5 pt-4">
              <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center font-bold text-amber text-xs">
                GL
              </div>
              <div>
                <h4 className="font-semibold text-cocoa text-sm">Gisele Lemos</h4>
                <p className="text-[10px] text-cocoa/50">Favorito: Café Bourbon Verde</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Seção 5 — CTA Final */}
      <section className="bg-warmwhite py-20 px-6 text-center border-t border-cocoa/5">
        <div className="max-w-3xl mx-auto">
          <Wine className="w-12 h-12 text-bordeaux mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-bordeaux font-bold mb-4">Faça parte dessa mudança sustentável</h2>
          <p className="text-base text-cocoa/80 font-light mb-8 max-w-xl mx-auto">
            Abraçar um estilo de vida hedonista não precisa custar a saúde do planeta. Cadastre-se em nossa plataforma e compre com menor impacto.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-bordeaux hover:bg-bordeaux/90 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-95"
            >
              Inscrever-se no VivaVinho
            </button>
            <button
              onClick={onLoginClick}
              className="px-8 py-4 bg-transparent border border-bordeaux hover:bg-bordeaux/5 text-bordeaux font-semibold rounded-xl transition-all"
            >
              Fazer Login Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cocoa text-warmwhite py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-bordeaux/30 border border-white/20 flex items-center justify-center">
              🍷
            </div>
            <span className="font-serif text-xl tracking-wide">VivaVinho</span>
          </div>
          <p className="text-xs text-white/40">© 2026 VivaVinho S.A. Marketplace de Hedonismo Sustentável e Soluções Ambientais.</p>
          <div className="flex gap-6 text-xs text-white/60">
            <a href="#" className="hover:text-amber">Regras Socioambientais</a>
            <a href="#" className="hover:text-amber">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
