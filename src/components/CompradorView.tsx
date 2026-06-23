import React, { useState } from "react";
import { Product, Order } from "../data";
import { 
  Search, ShoppingCart, Heart, LogOut, ShieldCheck, 
  Wine, Coffee, Leaf, ChevronRight, Award, Trash2, 
  HelpCircle, Sparkles, Check, CheckCircle, Info, BookOpen 
} from "lucide-react";
import { RulesReferenceView } from "./RulesReferenceView";

interface CompradorViewProps {
  products: Product[];
  cart: Array<{ product: Product; quantity: number }>;
  onAddToCart: (p: Product) => void;
  onRemoveFromCart: (id: string) => void;
  onUpdateCartQuantity: (id: string, q: number) => void;
  onCheckout: () => void;
  currentUser: { email: string; nome: string; role: string; avatar: string };
  onLogout: () => void;
  onNavigateTo: (view: string) => void;
  personalImpact: {
    co2Offset: number;
    waterSaved: number;
    areaRegenerated: number;
    producersSupported: number;
  };
}

export default function CompradorView({
  products,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onCheckout,
  currentUser,
  onLogout,
  onNavigateTo,
  personalImpact,
}: CompradorViewProps) {
  // Navigation tabs in Buyer Sidebar
  const [activeTab, setActiveTab] = useState<"descobrir" | "compras" | "impacto" | "favoritos" | "perfil">("descobrir");
  
  // Shopping Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"Todos" | "vinho" | "cacau" | "cafe" | "natureza">("Todos");
  const [selectedSort, setSelectedSort] = useState<"relevancia" | "preco-baixo" | "impacto-alto">("relevancia");
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  
  // Local list of favorited product IDs
  const [favorites, setFavorites] = useState<string[]>(["prod-1", "prod-3"]);
  
  // Slide out cart controller
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<Array<{date: string, total: number, co2: number, items: string}>>([
    { date: "15/06/2026", total: 221.90, co2: 3.6, items: "1x Chardonnay Orange, 2x Barra de Cacau Selvagem" },
    { date: "02/06/2026", total: 64.90, co2: 1.8, items: "1x Café Bourbon Verde Agroecológico" }
  ]);

  const toggleFavorite = (prodId: string) => {
    setFavorites((prev) =>
      prev.includes(prodId) ? prev.filter((id) => id !== prodId) : [...prev, prodId]
    );
  };

  const handleToggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  // Filter and sort products reactively
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.producer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesCerts = selectedCerts.every((c) => p.certifications.includes(c as any));
    return matchesSearch && matchesCategory && matchesCerts;
  });

  if (selectedSort === "preco-baixo") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "impacto-alto") {
    filteredProducts.sort((a, b) => b.impact.co2Offset - a.impact.co2Offset);
  }

  const subtotalCart = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalOffsetInCart = cart.reduce((acc, item) => acc + item.product.impact.co2Offset * item.quantity, 0).toFixed(1);
  const totalWaterInCart = cart.reduce((acc, item) => acc + item.product.impact.waterSaved * item.quantity, 0);

  const performCartCheckout = () => {
    if (cart.length === 0) return;
    
    // Add item summary to purchase history locally
    const info = cart.map(i => `${i.quantity}x ${i.product.name.split(' ')[0]}`).join(', ');
    setPurchaseHistory(prev => [
      {
        date: "Hoje",
        total: subtotalCart,
        co2: Number(totalOffsetInCart),
        items: info
      },
      ...prev
    ]);
    
    // Call parent checkout callback
    onCheckout();
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-ivory text-cocoa font-sans flex flex-col">
      
      {/* 1. Header with logo, indicators and "Painel Admin" toggle */}
      <header className="bg-warmwhite border-b border-cocoa/10 px-4 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateTo("landing")}>
            <span className="text-3xl">🍷</span>
            <span className="font-serif text-2xl font-bold text-bordeaux tracking-wide">VivaVinho</span>
          </div>
          <span className="hidden sm:inline bg-moss/10 border border-moss/20 text-moss text-[11px] font-semibold py-0.5 px-2.5 rounded-full">
            Marketplace Circular
          </span>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Always available Admin switch for testing */}
          <button
            onClick={() => onNavigateTo("admin")}
            id="btn-admin-pane"
            className="text-xs bg-bordeaux/10 text-bordeaux hover:bg-bordeaux hover:text-white border border-bordeaux/20 font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Painel Admin
          </button>

          {/* Cart triggers */}
          <button
            onClick={() => setIsCartOpen(true)}
            id="btn-open-cart"
            className="relative p-2 rounded-xl bg-cocoa/5 hover:bg-cocoa/10 transition-all text-cocoa text-sm flex items-center gap-1.5 font-medium"
          >
            <ShoppingCart className="w-4 h-4 text-bordeaux" />
            <span className="hidden md:inline text-cocoa/80 text-xs">Carrinho</span>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-bordeaux text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>

          {/* User badge */}
          <div className="flex items-center gap-2 border-l border-cocoa/10 pl-3">
            <div className="w-8 h-8 rounded-full bg-bordeaux text-white font-bold text-xs flex items-center justify-center shadow-inner">
              {currentUser.avatar}
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-semibold">{currentUser.nome}</div>
              <div className="text-[9px] text-cocoa/60 font-mono capitalize">Cliente Premium</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main body: Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar navigation */}
        <aside className="w-full md:w-64 bg-warmwhite/75 border-r border-cocoa/10 p-6 flex flex-col justify-between gap-8 md:min-h-[calc(100vh-73px)]">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cocoa/40">Navegação Comprador</div>
            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab("descobrir")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "descobrir" ? "bg-bordeaux text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <Wine className="w-4 h-4" /> Comprar Marketplace
              </button>
              <button
                onClick={() => setActiveTab("compras")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "compras" ? "bg-bordeaux text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <ChevronRight className="w-4 h-4 text-amber" /> Minhas Compras ({purchaseHistory.length})
              </button>
              <button
                onClick={() => setActiveTab("impacto")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "impacto" ? "bg-bordeaux text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <Leaf className="w-4 h-4 text-moss" /> Meu Impacto Florestal
              </button>
              <button
                onClick={() => setActiveTab("favoritos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "favoritos" ? "bg-bordeaux text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <Heart className="w-4 h-4 text-red-500" /> Meus Favoritos ({favorites.length})
              </button>
              <button
                onClick={() => setActiveTab("perfil")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "perfil" ? "bg-bordeaux text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <Info className="w-4 h-4" /> Perfil & Cadastros
              </button>
              <button
                id="btn-nav-regras-comprador"
                onClick={() => setActiveTab("regras")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "regras" ? "bg-bordeaux text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <BookOpen className="w-4 h-4 text-bordeaux/80" /> Manual de Regras
              </button>
            </nav>
          </div>

          <div className="border-t border-cocoa/10 pt-4">
            <button
              onClick={onLogout}
              className="w-full text-left py-2 px-3 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sair da Plataforma
            </button>
          </div>
        </aside>

        {/* Content staging area */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: Descobrir / Comprar Marketplace */}
          {activeTab === "descobrir" && (
            <div className="space-y-8">
              
              {/* 3.1 — Painel de impacto pessoal (cards glass) */}
              <div className="bg-cocoa/5 rounded-2xl p-6 border border-cocoa/5">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-cocoa">Seu Impacto Coletivo</h2>
                    <p className="text-xs text-cocoa/60 font-light">Métricas reais retroalimentadas por seus hábitos saudáveis de hedonismo:</p>
                  </div>
                  <span className="bg-moss text-white text-[10px] font-bold py-1 px-2.5 rounded-full uppercase">
                    🌳 Nível Ecologista
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
                    <span className="text-xs text-cocoa/50 block font-mono">CO₂ Removido</span>
                    <span className="text-2xl font-serif font-bold text-bordeaux block my-0.5">{personalImpact.co2Offset.toFixed(1)} kg</span>
                    <span className="text-[9px] text-moss font-semibold flex items-center justify-center gap-0.5">🌱 remoção por biochar/agroforesta</span>
                  </div>

                  <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
                    <span className="text-xs text-cocoa/50 block font-mono">Água Preservada</span>
                    <span className="text-2xl font-serif font-bold text-amber block my-0.5">{personalImpact.waterSaved} Litros</span>
                    <span className="text-[9px] text-moss font-semibold flex items-center justify-center gap-0.5">💧 aquíferos recarregados</span>
                  </div>

                  <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
                    <span className="text-xs text-cocoa/50 block font-mono">Área Regenerada</span>
                    <span className="text-2xl font-serif font-bold text-moss block my-0.5">{personalImpact.areaRegenerated.toFixed(1)} m²</span>
                    <span className="text-[9px] text-moss font-semibold flex items-center justify-center gap-0.5">🌿 reflorestamento ativo</span>
                  </div>

                  <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
                    <span className="text-xs text-cocoa/50 block font-mono">Produtores Apoiados</span>
                    <span className="text-2xl font-serif font-bold text-cocoa block my-0.5">{personalImpact.producersSupported} Famílias</span>
                    <span className="text-[9px] text-moss font-semibold flex items-center justify-center gap-0.5">🧑‍🌾 comércio justo ativo</span>
                  </div>
                </div>
              </div>

              {/* Filter controls and search */}
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                  
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2">
                    {(["Todos", "vinho", "cacau", "cafe", "natureza"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                          selectedCategory === cat 
                            ? "bg-bordeaux text-white shadow-sm" 
                            : "bg-cocoa/5 hover:bg-cocoa/10 text-cocoa/70"
                        }`}
                      >
                        {cat === "Todos" ? "Todos os Itens" : cat}
                      </button>
                    ))}
                  </div>

                  {/* Ordering selector */}
                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <span className="text-xs text-cocoa/50 shrink-0">Ordenar por:</span>
                    <select
                      value={selectedSort}
                      onChange={(e: any) => setSelectedSort(e.target.value)}
                      className="text-xs bg-warmwhite border border-cocoa/10 px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber text-cocoa w-full sm:w-44"
                    >
                      <option value="relevancia">Relevância / Destaque</option>
                      <option value="preco-baixo">Menor Preço</option>
                      <option value="impacto-alto">Maior CO₂ Removido</option>
                    </select>
                  </div>

                </div>

                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  {/* Search query box */}
                  <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cocoa/40">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Pesquisar vinho biodinâmico, produtor, mel..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-warmwhite border border-cocoa/10 focus:border-amber rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none text-cocoa"
                    />
                  </div>

                  {/* Certifications filter checkpoints */}
                  <div className="flex flex-wrap items-center gap-3 text-xs bg-cocoa/5 rounded-xl px-4 py-2">
                    <span className="text-cocoa/50 font-medium">Selo Ativo:</span>
                    {["Orgânico", "Biodinâmico", "Comércio Justo", "Vegano"].map((cert) => (
                      <label key={cert} className="flex items-center gap-1.5 cursor-pointer hover:text-bordeaux transition-all select-none font-medium">
                        <input
                          type="checkbox"
                          checked={selectedCerts.includes(cert)}
                          onChange={() => handleToggleCert(cert)}
                          className="rounded border-cocoa/20 text-bordeaux focus:ring-bordeaux/40 w-3.5 h-3.5 accent-bordeaux"
                        />
                        <span>{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3.2 — Grid de produtos */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-cocoa/5 rounded-2xl">
                  <span className="text-3xl block">🌳</span>
                  <h3 className="font-serif font-bold text-cocoa mt-2">Nenhum produto atende aos filtros</h3>
                  <p className="text-xs text-cocoa/60 mt-1 font-light">Tente desmarcar algumas certificações ou limpar o campo de busca.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => {
                    const isFav = favorites.includes(p.id);
                    return (
                      <div 
                        key={p.id}
                        className="group flex flex-col justify-between glass-panel border border-white bg-white/45 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        
                        {/* Visual background placeholder */}
                        <div className="h-44 bg-warmwhite relative flex items-center justify-center p-4">
                          <div className={`absolute inset-0 opacity-10 ${p.colorBackground}`}></div>
                          <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300 z-10">{p.imageText.split(' ')[0]}</span>
                          
                          {/* Heart wishlist trigger */}
                          <button
                            type="button"
                            onClick={() => toggleFavorite(p.id)}
                            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-all text-xs z-10"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "text-cocoa/40"}`} />
                          </button>

                          {/* Top left categories logo */}
                          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur text-cocoa/70 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {p.category}
                          </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] text-cocoa/50 uppercase font-mono">{p.producer}</div>
                            <h4 className="font-serif font-bold text-cocoa mb-2 mt-0.5 min-h-10 text-[15px] group-hover:text-bordeaux transition-all">
                              {p.name}
                            </h4>

                            {/* Ficha técnica de impacto */}
                            <div className="bg-moss/10 border border-moss/15 rounded-xl p-3 mb-4 space-y-1 text-xs">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-cocoa/60 flex items-center gap-1">🌱 CO₂ Removido (Biochar/Agroforesta):</span>
                                <span className="font-bold text-moss font-mono">-{p.impact.co2Offset} kg</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-cocoa/60 flex items-center gap-1">💧 Água Preservada:</span>
                                <span className="font-bold text-moss font-mono">{p.impact.waterSaved} L</span>
                              </div>
                            </div>

                            {/* Certifications badges */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {p.certifications.map((c) => (
                                <span key={c} className="text-[9px] bg-cocoa/5 text-cocoa/70 border border-cocoa/10 px-2 py-0.5 rounded-md font-semibold">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-cocoa/5 pt-3 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] text-cocoa/40 uppercase block">Valor Unitário</span>
                              <span className="font-serif font-bold text-bordeaux text-base">R$ {p.price.toFixed(2)}</span>
                            </div>
                            
                            <button
                              id={`item-buy-${p.id}`}
                              onClick={() => onAddToCart(p)}
                              className="px-3.5 py-2 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                            >
                              Adicionar
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3.4 — Seção "Você vai gostar" (3 items) */}
              <div className="border-t border-cocoa/10 pt-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-amber animate-pulse" />
                  <h3 className="font-serif text-xl font-bold text-cocoa">Seleção Especial Recomendada</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((r) => (
                    <div 
                      key={`rec-${r.id}`}
                      className="p-4 rounded-xl border border-cocoa/5 bg-warmwhite/50 flex gap-4 items-center hover:bg-warmwhite transition-all cursor-pointer"
                      onClick={() => onAddToCart(r)}
                    >
                      <div className="w-12 h-14 bg-cocoa/10 rounded flex items-center justify-center text-2xl">
                        {r.imageText.split(' ')[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] text-cocoa/50 font-mono uppercase block">{r.producer}</span>
                        <h4 className="text-xs font-bold text-cocoa font-serif truncate">{r.name}</h4>
                        <span className="text-xs text-amber font-semibold font-serif">R$ {r.price.toFixed(2)}</span>
                      </div>
                      <span className="text-moss text-[10px] font-bold bg-moss/10 px-2 py-0.5 rounded shrink-0">
                        -{r.impact.co2Offset} kg CO₂
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Minhas Compras */}
          {activeTab === "compras" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-bordeaux font-bold">Histórico de Consumo Hedonista</h2>
              <p className="text-sm text-cocoa/70 font-light">Confira os pedidos que você já encadeou e o impacto coletivo de suas transações:</p>
              
              <div className="space-y-4">
                {purchaseHistory.map((item, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-2xl border border-white bg-white/40 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-cocoa font-mono">Pedido #VV-2026-90{idx + 5}</span>
                        <span className="text-cocoa/40">•</span>
                        <span className="text-cocoa/60">{item.date}</span>
                        <span className="text-cocoa/40">•</span>
                        <span className="bg-moss/10 text-moss font-bold px-2 py-0.5 rounded">Processado</span>
                      </div>
                      <h4 className="text-sm font-semibold text-cocoa mt-2">{item.items}</h4>
                    </div>
                    <div className="text-left sm:text-right border-t sm:border-t-0 border-cocoa/5 pt-3 sm:pt-0 w-full sm:w-auto">
                      <div className="text-amber font-serif font-bold text-lg">R$ {item.total.toFixed(2)}</div>
                      <div className="text-[10px] text-moss font-bold font-mono">-{item.co2} kg CO₂ removidos (Biochar/Agroforesta)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Meu Impacto */}
          {activeTab === "impacto" && (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-4xl">🌳</span>
                <h2 className="text-3xl font-serif text-moss font-bold">Seu Portfólio de CO₂ Removido</h2>
                <p className="text-sm text-cocoa/75 font-light leading-relaxed">
                  Para cada unidade comercializada no VivaVinho, os produtores realizam a remoção direta de CO₂ da atmosfera aplicando práticas como o uso de biochar na lavoura e enriquecimento de sistemas agroflorestais. Abaixo estão suas conquistas agroecológicas agregadas:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-2xl bg-white/40 border border-white">
                  <h3 className="font-serif font-bold text-bordeaux mb-4">Certificação de Emissão Removida (Biochar/Agroforesta)</h3>
                  <p className="text-xs text-cocoa/80 leading-relaxed font-light mb-4">
                    Seus hábitos de consumo removeram efetivamente <strong className="font-bold">{personalImpact.co2Offset.toFixed(1)} kg</strong> de carbono do balanço atmosférico direto. Isso equivale ao ciclo anual de sequestro de carbono de <strong className="font-bold text-moss">3 árvores nativas adultas</strong> de sistemas agroflorestais regenerativos.
                  </p>
                  <div className="bg-cocoa/5 p-4 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-cocoa/65">Nível de Selo:</span>
                    <span className="font-bold text-moss uppercase">Protetor do Clima 🌱</span>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl bg-white/40 border border-white">
                  <h3 className="font-serif font-bold text-amber mb-4">Eficiência Hídrica de Mananciais</h3>
                  <p className="text-xs text-cocoa/80 leading-relaxed font-light mb-4">
                    Ao preferir rótulos ecológicos e café biodinâmico de altitude, você salvou <strong className="font-bold">{personalImpact.waterSaved} litros</strong> de aspersão hídrica desperdiçada em lavouras de monocultura de larga escala comercial.
                  </p>
                  <div className="bg-cocoa/5 p-4 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-cocoa/65">Preservação de Rios:</span>
                    <span className="font-bold text-amber uppercase">Protetor das Águas 💧</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Favoritos */}
          {activeTab === "favoritos" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-bordeaux font-bold">Seus Itens Selecionados ({favorites.length})</h2>
              
              {favorites.length === 0 ? (
                <div className="text-center py-12 bg-cocoa/5 rounded-2xl">
                  <span className="text-3xl block">❤️</span>
                  <h3 className="font-serif font-bold text-cocoa mt-2">Nenhum favorito salvo</h3>
                  <p className="text-xs text-cocoa/60 mt-1 font-light">Adicione aos favoritos clicando no ícone de coração nos cards.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.filter((p) => favorites.includes(p.id)).map((p) => (
                    <div 
                      key={`fav-${p.id}`}
                      className="glass-panel border border-white bg-white/45 rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] text-cocoa/50 font-mono mb-2">
                          <span className="capitalize">{p.category}</span>
                          <button onClick={() => toggleFavorite(p.id)} className="text-red-500 hover:text-cocoa transition-all">
                            Remover
                          </button>
                        </div>
                        <h4 className="font-serif font-semibold text-cocoa text-sm">{p.name}</h4>
                        <span className="text-amber font-serif font-bold text-sm block mt-2">R$ {p.price.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => onAddToCart(p)}
                        className="mt-4 w-full py-2 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-xl text-xs font-semibold transition-all"
                      >
                        Mover para o Carrinho
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Perfil */}
          {activeTab === "perfil" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-bordeaux font-bold">Seu Perfil de Consumo</h2>
              <div className="glass-panel p-6 rounded-2xl bg-white/45 max-w-lg space-y-4">
                <div className="flex items-center gap-4 border-b border-cocoa/10 pb-4">
                  <div className="w-12 h-12 bg-bordeaux rounded-full text-white font-bold text-lg flex items-center justify-center shadow-md">
                    {currentUser.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa">{currentUser.nome}</h3>
                    <p className="text-xs text-cocoa/60">{currentUser.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-cocoa/5">
                    <span className="text-cocoa/60">Categoria de Impacto:</span>
                    <span className="font-semibold text-moss">Agroflorestal Avançado</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cocoa/5">
                    <span className="text-cocoa/60">Data de Cadastro:</span>
                    <span className="font-semibold text-cocoa">23 Junho de 2026</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-cocoa/60">Endereço de Entrega Principal:</span>
                    <span className="font-semibold text-cocoa text-right max-w-xs truncate">Rua das Palmeiras, 102 - Apt 41, SP</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "regras" && (
            <RulesReferenceView />
          )}

        </main>
      </div>

      {/* 4. Slide-out cart drawer with Backdrop glass blur */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-cocoa/40 backdrop-blur-sm z-50 flex justify-end">
          <div 
            className="w-full max-w-md bg-warmwhite h-full shadow-[0_0_40px_rgba(0,0,0,0.3)] flex flex-col justify-between p-6 animate-slide-in relative border-l border-cocoa/10"
          >
            <div>
              <div className="flex justify-between items-center border-b border-cocoa/10 pb-4">
                <h3 className="font-serif font-bold text-xl text-cocoa flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-bordeaux" /> Seu Carrinho
                </h3>
                <button
                  id="btn-close-cart"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-cocoa/5 text-cocoa/60 hover:text-cocoa transition-all"
                >
                  ✕ Fechar
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-24 space-y-4">
                  <span className="text-4xl block">🛒</span>
                  <p className="text-sm text-cocoa/60 font-light">Seu carrinho está vazio de prazeres sustentáveis.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs bg-bordeaux/10 text-bordeaux px-4 py-2 rounded-xl font-bold"
                  >
                    Voltar às compras
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4 overflow-y-auto max-h-[55vh] pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3 bg-white/50 border border-cocoa/5 rounded-xl flex gap-3 items-center justify-between"
                    >
                      <div className="w-10 h-10 rounded bg-cocoa/10 flex items-center justify-center text-xl shrink-0">
                        {item.product.imageText.split(' ')[0]}
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="text-xs font-bold text-cocoa font-serif truncate">{item.product.name}</h4>
                        <div className="text-[10px] text-cocoa/60">R$ {item.product.price.toFixed(2)}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) => onUpdateCartQuantity(item.product.id, Math.max(1, Number(e.target.value)))}
                          className="w-10 bg-warmwhite border border-cocoa/10 rounded px-1 py-0.5 text-xs font-semibold text-center select-all focus:outline-none focus:border-amber text-cocoa"
                        />
                        
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-all"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Receipt Summary */}
            {cart.length > 0 && (
              <div className="border-t border-cocoa/10 pt-4 space-y-4 bg-warmwhite">
                
                {/* Eco-Impact badge indicator for Checkout */}
                <div className="bg-moss/10 border border-moss/15 rounded-xl p-4 flex gap-3 text-moss">
                  <Leaf className="w-5 h-5 shrink-0 animate-pulse text-moss" />
                  <div>
                    <h5 className="text-xs font-extrabold uppercase">Seu ecobalance deste pedido:</h5>
                    <p className="text-[10px] font-medium text-cocoa/75 mt-0.5 leading-relaxed">
                      Este pedido resultará na remoção de <strong className="font-mono text-moss">{totalOffsetInCart} kg de CO₂</strong> da atmosfera através do uso de biochar na lavoura ou criação de sistema agroflorestal, além de salvar <strong className="font-mono text-moss">{totalWaterInCart} Litros</strong> hídricos em manejo agroecológico.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-cocoa/60">Itens Adicionados:</span>
                    <span className="font-semibold text-cocoa">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cocoa/60">Socio-Logística Sustentável:</span>
                    <span className="font-semibold text-moss">Grátis (Emissão Compensada)</span>
                  </div>
                  <div className="flex justify-between border-t border-cocoa/5 pt-2 text-sm font-bold text-cocoa">
                    <span>Total do Pedido:</span>
                    <span className="text-bordeaux font-serif font-bold text-lg">R$ {subtotalCart.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="btn-cart-checkout"
                  onClick={performCartCheckout}
                  className="w-full py-3.5 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" /> Finalizar & Gerar Impacto
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
