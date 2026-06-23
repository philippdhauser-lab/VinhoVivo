import React, { useState } from "react";
import { Product } from "../data";
import { 
  Plus, Edit2, Power, Eye, EyeOff, Check, BarChart3, 
  ShoppingBag, Star, HelpCircle, Package, ArrowUpRight, 
  Image, CloudLightning, ShieldCheck, LogOut, CheckCircle2, BookOpen 
} from "lucide-react";
import { RulesReferenceView } from "./RulesReferenceView";

interface VendedorViewProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeactivateProduct: (id: string) => void;
  onUpdateStock: (id: string, newStock: number) => void;
  currentUser: { email: string; nome: string; role: string; avatar: string };
  onLogout: () => void;
  onNavigateTo: (view: string) => void;
  showToast: (msg: string, type: "success" | "error") => void;
}

export default function VendedorView({
  products,
  onAddProduct,
  onDeactivateProduct,
  onUpdateStock,
  currentUser,
  onLogout,
  onNavigateTo,
  showToast,
}: VendedorViewProps) {
  const [activeTab, setActiveTab] = useState<"visao" | "produtos" | "novo" | "pedidos" | "impacto" | "config">("visao");

  // Form states for creating new product
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState<"vinho" | "cacau" | "cafe" | "natureza">("vinho");
  const [pDesc, setPDesc] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pStock, setPStock] = useState("");
  const [pCo2, setPCo2] = useState("");
  const [pWater, setPWater] = useState("");
  const [pArea, setPArea] = useState("");
  const [pCerts, setPCerts] = useState<string[]>([]);
  const [pHistory, setPHistory] = useState("");
  
  // Simulated file upload states
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Filter products that belong to the seller (in a mock system, let's treat the preloaded list as ours to manipulate!)
  const sellerProducts = products;

  // Form handler for adding a product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pName || !pPrice || !pStock || !pDesc || !pCo2 || !pWater) {
      showToast("Preencha todos os campos obrigatórios (*)", "error");
      return;
    }

    const priceNum = parseFloat(pPrice);
    const stockNum = parseInt(pStock);
    const co2Num = parseFloat(pCo2);
    const waterNum = parseFloat(pWater);

    if (isNaN(priceNum) || priceNum <= 0) {
      showToast("Insira um preço unitário válido.", "error");
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      showToast("Insira uma quantidade de estoque válida.", "error");
      return;
    }

    // Compose custom product
    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      name: pName,
      producer: "Sua Propriedade Agroecológica",
      category: pCategory,
      price: priceNum,
      stock: stockNum,
      description: pDesc,
      impact: {
        co2Offset: isNaN(co2Num) ? 1.5 : co2Num,
        waterSaved: isNaN(waterNum) ? 30 : waterNum,
        areaRegenerated: parseFloat(pArea) || 1.5
      },
      certifications: pCerts as any[],
      producerHistory: pHistory || "Produtor local focado em agricultura sintrópica e cooperativismo florestal.",
      colorBackground: pCategory === "vinho" ? "bg-bordeaux" : pCategory === "cacau" ? "bg-cocoa" : pCategory === "cafe" ? "bg-amber" : "bg-moss",
      imageText: pCategory === "vinho" ? "🍷 Vinho Criado" : pCategory === "cacau" ? "🍫 Cacau Criado" : pCategory === "cafe" ? "☕ Café Criado" : "🍯 Doce Néctar"
    };

    onAddProduct(newProd);
    showToast("Parabéns! Produto cadastrado e disponível no marketplace!", "success");

    // Reset fields
    setPName("");
    setPCategory("vinho");
    setPDesc("");
    setPPrice("");
    setPStock("");
    setPCo2("");
    setPWater("");
    setPArea("");
    setPCerts([]);
    setPHistory("");
    setFileName("");

    // Route to page
    setActiveTab("produtos");
  };

  const toggleFormCert = (cert: string) => {
    setPCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  // Mocked stats graph data for last 6 months
  const monthlySales = [
    { month: "Jan", sales: 2900, co2: 82 },
    { month: "Fev", sales: 3400, co2: 95 },
    { month: "Mar", sales: 3100, co2: 89 },
    { month: "Abr", sales: 4200, co2: 110 },
    { month: "Mai", sales: 3900, co2: 104 },
    { month: "Jun", sales: 4380, co2: 124 },
  ];

  return (
    <div className="min-h-screen bg-ivory text-cocoa font-sans flex flex-col">
      
      {/* Header */}
      <header className="bg-warmwhite border-b border-cocoa/10 px-4 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateTo("landing")}>
            <span className="text-3xl">🍷</span>
            <span className="font-serif text-2xl font-bold text-bordeaux tracking-wide">VivaVinho</span>
          </div>
          <span className="bg-amber/10 border border-amber/20 text-amber text-[10px] font-bold py-1 px-2.5 rounded-full uppercase">
            Canal Vendedor 🏪
          </span>
        </div>

        {/* Action Header bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => onNavigateTo("admin")}
            className="text-xs bg-bordeaux/10 text-bordeaux hover:bg-bordeaux hover:text-white border border-bordeaux/20 font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Painel Admin
          </button>

          <div className="flex items-center gap-2 border-l border-cocoa/10 pl-3">
            <div className="w-8 h-8 rounded-full bg-amber text-white font-bold text-xs flex items-center justify-center">
              {currentUser.avatar}
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-semibold">{currentUser.nome}</div>
              <div className="text-[9px] text-cocoa/60 font-mono">Assoc. Coletiva Organica</div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid container */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar navigation */}
        <aside className="w-full md:w-64 bg-warmwhite/75 border-r border-cocoa/10 p-6 flex flex-col justify-between gap-8 md:min-h-[calc(100vh-73px)]">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cocoa/40">Painel Vendedor</div>
            <nav className="space-y-1.5 font-sans">
              <button
                onClick={() => setActiveTab("visao")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "visao" ? "bg-amber text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <BarChart3 className="w-4 h-4" /> Visão Geral
              </button>
              <button
                onClick={() => setActiveTab("produtos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "produtos" ? "bg-amber text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <Package className="w-4 h-4" /> Meus Produtos ({sellerProducts.length})
              </button>
              <button
                onClick={() => setActiveTab("novo")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "novo" ? "bg-amber text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <Plus className="w-4 h-4" /> Cadastrar Produto
              </button>
              <button
                onClick={() => setActiveTab("pedidos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "pedidos" ? "bg-amber text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <ShoppingBag className="w-4 h-4" /> Pedidos Recebidos (3)
              </button>
              <button
                onClick={() => setActiveTab("impacto")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "impacto" ? "bg-amber text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <CloudLightning className="w-4 h-4 text-emerald-650" /> Impacto Gerado
              </button>
              <button
                id="btn-nav-regras-vendedor"
                onClick={() => setActiveTab("regras")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${activeTab === "regras" ? "bg-amber text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <BookOpen className="w-4 h-4 text-amber" /> Diretrizes de Regras
              </button>
            </nav>
          </div>

          <div className="border-t border-cocoa/10 pt-4">
            <button
              onClick={onLogout}
              className="w-full text-left py-2 px-3 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* TAB 1: Visão Geral */}
          {activeTab === "visao" && (
            <div className="space-y-8">
              
              <div>
                <h2 className="text-3xl font-serif text-bordeaux font-bold">Saudações, {currentUser.nome}!</h2>
                <p className="text-sm text-cocoa/70 font-light mt-1">Sua cooperativa está ativa. Veja o faturamento e impacto ambiental do seu lote agroecológico:</p>
              </div>

              {/* 4.1 — Cards de métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="glass-panel p-5 rounded-2xl border border-white bg-white/40 shadow-sm">
                  <span className="text-[11px] font-mono text-cocoa/50 uppercase block">Produtos Ativos</span>
                  <div className="text-3xl font-serif font-bold text-cocoa mt-2 mb-1">{sellerProducts.length}</div>
                  <span className="text-[10px] text-moss font-semibold">✓ 100% aprovados</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white bg-white/40 shadow-sm">
                  <span className="text-[11px] font-mono text-cocoa/50 uppercase block">Vendas este Mês</span>
                  <div className="text-3xl font-serif font-bold text-bordeaux mt-2 mb-1">R$ 4.380,00</div>
                  <span className="text-[10px] text-moss font-semibold">↑ 14% em relação a Maio</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white bg-white/40 shadow-sm">
                  <span className="text-[11px] font-mono text-cocoa/50 uppercase block">Pedidos Pendentes</span>
                  <div className="text-3xl font-serif font-bold text-amber mt-2 mb-1">3</div>
                  <span className="text-[10px] text-red-700 font-semibold">⚠️ Aguardando almoxarifado</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white bg-white/40 shadow-sm">
                  <span className="text-[11px] font-mono text-cocoa/50 uppercase block">Avaliação Média</span>
                  <div className="text-3xl font-serif font-bold text-moss mt-2 mb-1 flex items-center gap-1.5">
                    4.8 <Star className="w-5 h-5 fill-amber text-amber" />
                  </div>
                  <span className="text-[10px] text-cocoa/50">Baseado em 54 avaliações</span>
                </div>
              </div>

              {/* Chart and Activity rows */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 4.3 — Gráfico de vendas */}
                <div className="glass-panel p-6 rounded-2xl border border-white bg-white/45 shadow-sm lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif font-bold text-cocoa text-lg">Histórico de Receita e Compensação</h3>
                      <p className="text-xs text-cocoa/60 font-light">Evolução do faturamento (Barras) e Carbono neutralizado (Linha)</p>
                    </div>
                    <span className="bg-moss/10 text-moss text-[10px] font-bold px-2 py-0.5 rounded uppercase">Mensal</span>
                  </div>

                  {/* Render simulated chart with custom CSS columns */}
                  <div className="h-64 flex items-end justify-between gap-2 pt-6 border-b border-cocoa/10 font-sans">
                    {monthlySales.map((item, idx) => {
                      const barPercentage = (item.sales / 5000) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                          
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full mb-2 bg-cocoa text-warmwhite text-[10px] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 font-mono text-center pointer-events-none w-24">
                            <strong>R$ {item.sales}</strong> <br />
                            -{item.co2} kg CO2
                          </div>

                          {/* Bar representing value */}
                          <div 
                            style={{ height: `${barPercentage}%` }} 
                            className="w-full bg-amber group-hover:bg-amber/80 rounded-t-md transition-all duration-500 relative"
                          >
                            {/* Inner Carbon Indicator node */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-moss border border-white"></div>
                          </div>
                          
                          <span className="text-xs text-cocoa/60 mt-2 font-semibold uppercase">{item.month}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center gap-6 text-[11px] font-medium text-cocoa/60 pt-2">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber rounded-sm"></span> Volume Mensal (R$)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-moss rounded-full"></span> Força de Sequestro de Carbano (kg CO₂eq)</span>
                  </div>
                </div>

                {/* Mini notification drawer */}
                <div className="glass-panel p-6 rounded-2xl border border-white bg-white/45 shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-cocoa text-lg">Notícias e Instruções</h3>
                  <div className="space-y-4 text-xs font-sans">
                    <div className="p-3 bg-warmwhite rounded-xl border-l-4 border-moss text-cocoa">
                      <strong className="font-bold text-moss">Alta temporada de Café orgânico</strong>
                      <p className="text-[11px] text-cocoa/70 mt-1 font-light">Sua Fazenda foi citada na adega principal de alta recomendação.</p>
                    </div>
                    <div className="p-3 bg-warmwhite rounded-xl border-l-4 border-bordeaux text-cocoa">
                      <strong className="font-bold text-bordeaux">Inspeção de Certificado Orgânico</strong>
                      <p className="text-[11px] text-cocoa/70 mt-1 font-light">Renove as fotos digitais da sua propriedade para manter o selo biodinâmico ativo.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Meus Produtos (Tabela cadastrados) */}
          {activeTab === "produtos" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif text-bordeaux font-bold">Portfólio de Produtos Organológicos</h2>
                  <p className="text-sm text-cocoa/70 font-light mt-0.5">Edit, ajuste estoque ou desative itens cadastrados em sua conta:</p>
                </div>
                <button
                  onClick={() => setActiveTab("novo")}
                  className="px-4 py-2 bg-amber hover:bg-amber/90 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-all"
                >
                  <Plus className="w-4 h-4" /> Novo Produto
                </button>
              </div>

              {/* 4.2 — Tabela de produtos cadastrados */}
              <div className="bg-warmwhite rounded-2xl overflow-hidden border border-cocoa/10 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-cocoa/5 text-cocoa/50 font-mono text-[10px] uppercase border-b border-cocoa/10">
                        <th className="p-4">Foto/Selo</th>
                        <th className="p-4">Nome do Produto</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4 text-right">Preço</th>
                        <th className="p-4 text-center">Estoque (Qtd)</th>
                        <th className="p-4 text-center">Impacto (CO₂)</th>
                        <th className="p-4 text-center">Manejo/Status</th>
                        <th className="p-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cocoa/5 font-sans">
                      {sellerProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-cocoa/5 transition-colors">
                          <td className="p-4">
                            <span className="text-2xl bg-cocoa/5 rounded p-1.5 inline-block">{p.imageText.split(' ')[0]}</span>
                          </td>
                          <td className="p-4 max-w-xs font-serif font-bold text-cocoa text-[13px]">
                            {p.name}
                            <span className="block text-[10px] font-sans font-light text-cocoa/50 mt-0.5">{p.producer}</span>
                          </td>
                          <td className="p-4 uppercase font-mono text-[10px] text-cocoa/60">{p.category}</td>
                          <td className="p-4 text-right font-bold text-bordeaux font-serif">R$ {p.price.toFixed(2)}</td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-semibold text-cocoa font-mono">{p.stock} un</span>
                              
                              {/* Stock adjust button */}
                              <button
                                onClick={() => {
                                  const amt = prompt("Insira nova quantidade de estoque:", String(p.stock));
                                  if (amt !== null) {
                                    const n = parseInt(amt);
                                    if (!isNaN(n) && n >= 0) {
                                      onUpdateStock(p.id, n);
                                      showToast("Estoque atualizado com sucesso!", "success");
                                    }
                                  }
                                }}
                                className="text-[10px] text-amber hover:underline hover:text-amber/80 font-bold"
                              >
                                Alterar
                              </button>
                            </div>
                          </td>
                          <td className="p-4 text-center font-bold text-moss font-mono">-{p.impact.co2Offset} kg CO₂</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase ${
                              p.stock > 0 ? "bg-moss/10 text-moss" : "bg-red-150 text-red-700"
                            }`}>
                              {p.stock > 0 ? "Disponível" : "Sem Estoque"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              
                              <button
                                onClick={() => {
                                  const price = prompt("Insira o novo preço (R$):", String(p.price));
                                  if (price !== null) {
                                    const pVal = parseFloat(price);
                                    if (!isNaN(pVal) && pVal > 0) {
                                      p.price = pVal;
                                      showToast("Preço redefinido com sucesso!", "success");
                                      onUpdateStock(p.id, p.stock); // to trigger refresh
                                    }
                                  }
                                }}
                                className="p-1.5 hover:bg-cocoa/5 rounded text-cocoa/75 hover:text-bordeaux transition-all"
                                title="Editar Preço"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  onDeactivateProduct(p.id);
                                  showToast("Ação de desativar simulada nos canais do marketplace.", "success");
                                }}
                                className="p-1.5 hover:bg-red-50 rounded text-red-650 hover:text-red-700 transition-all"
                                title="Desativar Produto"
                              >
                                <Power className="w-3.5 h-3.5" />
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Formulário de cadastro de novo produto */}
          {activeTab === "novo" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-bordeaux font-bold">Publicar Novo Rótulo Organológico</h2>
                <p className="text-sm text-cocoa/70 font-light mt-0.5">Assegure a máxima qualidade sensorial e preencha as estimativas reais de compensação ecológica.</p>
              </div>

              {/* Form Card */}
              <div className="glass-panel p-8 rounded-2xl bg-white/45 border border-white max-w-4xl shadow-md">
                <form onSubmit={handleCreateProduct} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Basic specs */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-bold text-cocoa text-base border-b border-cocoa/5 pb-2">Informações Comerciais</h3>
                      
                      <div>
                        <label className="block text-xs font-semibold text-cocoa/70 mb-1">Nome do Produto *</label>
                        <input
                          type="text"
                          required
                          value={pName}
                          onChange={(e) => setPName(e.target.value)}
                          placeholder="Ex: Cabernet Sauvignon Sombreado Puro"
                          className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa focus:outline-none focus:border-amber"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-cocoa/70 mb-1">Preço Unitário (R$) *</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={pPrice}
                            onChange={(e) => setPPrice(e.target.value)}
                            placeholder="R$ 150.00"
                            className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa focus:outline-none focus:border-amber"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-cocoa/70 mb-1">Estoque Inicial (un) *</label>
                          <input
                            type="number"
                            required
                            value={pStock}
                            onChange={(e) => setPStock(e.target.value)}
                            placeholder="Ex: 50"
                            className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa focus:outline-none focus:border-amber"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-cocoa/70 mb-1">Categoria Comercial *</label>
                        <select
                          value={pCategory}
                          onChange={(e: any) => setPCategory(e.target.value)}
                          className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa focus:outline-none focus:border-amber"
                        >
                          <option value="vinho">Adega / Vinho</option>
                          <option value="cacau">Cacau Florestal / Barra</option>
                          <option value="cafe">Grãos Sombreados / Café</option>
                          <option value="natureza">Nutrientes Nativos / Mel / Natureza</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-cocoa/70 mb-1">Descrição Sensorial *</label>
                        <textarea
                          required
                          value={pDesc}
                          onChange={(e) => setPDesc(e.target.value)}
                          placeholder="Fale das notas organolépticas, sabor frutado, aroma..."
                          className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2 text-xs text-cocoa focus:outline-none focus:border-amber h-24 resize-none"
                        />
                      </div>
                    </div>

                    {/* Socioenvironmental metrics */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-bold text-moss text-base border-b border-cocoa/5 pb-2">Planilha de Impacto Ecológico</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-cocoa/70 mb-1">Compensação CO₂ (kg/un) *</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            value={pCo2}
                            onChange={(e) => setPCo2(e.target.value)}
                            placeholder="Ex: 1.9"
                            className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-moss focus:outline-none focus:border-moss font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-cocoa/70 mb-1">Água Poupada (L/un) *</label>
                          <input
                            type="number"
                            required
                            value={pWater}
                            onChange={(e) => setPWater(e.target.value)}
                            placeholder="Ex: 45"
                            className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-moss focus:outline-none focus:border-moss font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-cocoa/70 mb-1">Área Florestal de Amparo (m²/un)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={pArea}
                          onChange={(e) => setPArea(e.target.value)}
                          placeholder="Ex: 2.5"
                          className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-moss"
                        />
                      </div>

                      {/* Certifications checkboxes */}
                      <div>
                        <label className="block text-xs font-semibold text-cocoa/70 mb-2">Selos Certificados para o Rótulo</label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {["Orgânico", "Biodinâmico", "Comércio Justo", "Vegano"].map((cert) => (
                            <label key={cert} className="flex items-center gap-2 cursor-pointer bg-cocoa/5 px-3 py-2 rounded-lg font-medium select-none">
                              <input
                                type="checkbox"
                                checked={pCerts.includes(cert)}
                                onChange={() => toggleFormCert(cert)}
                                className="rounded border-cocoa/20 text-bordeaux focus:ring-bordeaux/40 accent-bordeaux"
                              />
                              <span>{cert}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* File upload zone */}
                      <div>
                        <label className="block text-xs font-semibold text-cocoa/70 mb-1">Fotografia Oficial do Rótulo</label>
                        <div 
                          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                            isDragOver ? "border-amber bg-amber/5" : "border-cocoa/20 hover:border-amber/50"
                          }`}
                          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                          onDragLeave={() => setIsDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragOver(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              setFileName(e.dataTransfer.files[0].name);
                              showToast("Foto ecológica carregada com êxito!", "success");
                            }
                          }}
                          onClick={() => {
                            const name = prompt("Nome do arquivo fictício:");
                            if (name) {
                              setFileName(name);
                              showToast("Foto adicionada à sandbox!", "success");
                            }
                          }}
                        >
                          <Image className="w-6 h-6 text-cocoa/30 mx-auto mb-1.5" />
                          <p className="text-[11px] font-semibold text-cocoa/70">Arrastar & Soltar rótulo fotográfico</p>
                          <p className="text-[9px] text-cocoa/40 mt-0.5">Formatos recomendados: PNG, JPG ou SVG (limite demo)</p>
                          {fileName && (
                            <span className="inline-block mt-2 font-mono text-[10px] bg-moss/10 text-moss px-2 py-0.5 rounded font-bold">
                              ✓ {fileName}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Story of producer */}
                  <div>
                    <label className="block text-xs font-semibold text-cocoa/70 mb-1">História Ecológica do Cultivo (Para os compradores admirarem)</label>
                    <textarea
                      value={pHistory}
                      onChange={(e) => setPHistory(e.target.value)}
                      placeholder="Fale de sua família, preservação de fontes d'água de seu lote rústico e geração social de renda familiar..."
                      className="w-full bg-warmwhite border border-cocoa/15 rounded-xl px-4 py-2 text-xs text-cocoa focus:outline-none focus:border-amber h-20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-bordeaux hover:bg-bordeaux/95 text-white text-xs uppercase font-bold tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Publicar e Disponibilizar no Marketplace
                  </button>

                </form>
              </div>
            </div>
          )}

          {/* TAB 4: Pedidos Recebidos */}
          {activeTab === "pedidos" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-bordeaux font-bold">Ordens de Encomendas Recebidas</h2>
              <p className="text-sm text-cocoa/70 font-light">Assegure a colheita fresca e despache de imediato para a central de almoxarifado:</p>
              
              <div className="space-y-4">
                {[
                  { id: "#VV-2026-0841", date: "Hoje às 11:20", items: "1x Vinho Tinto Terroir Biodinâmico, 2x Barra de Cacau Selvagem", total: "R$ 253,90", client: "Daniel K." },
                  { id: "#VV-2026-0842", date: "Ontem às 15:45", items: "1x Café Bourbon Verde, 1x Mel de Abelhas Urçu", total: "R$ 113,90", client: "Helena S." },
                  { id: "#VV-2026-0845", date: "22 Jun 2026", items: "1x Chardonnay Orange, 2x Trufas Gourmet", total: "R$ 244,00", client: "Arthur P." },
                ].map((order, index) => (
                  <div key={index} className="glass-panel p-5 bg-white/40 rounded-2xl border border-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-cocoa">{order.id}</span>
                        <span className="text-cocoa/30">•</span>
                        <span className="text-cocoa/50">{order.date}</span>
                        <span className="text-cocoa/30">•</span>
                        <span className="text-cocoa/70 font-semibold font-mono">Comprador: {order.client}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-cocoa mt-2">{order.items}</h4>
                    </div>
                    <div className="text-left sm:text-right border-t sm:border-t-0 border-cocoa/5 pt-3 sm:pt-0 w-full sm:w-auto">
                      <span className="text-bordeaux font-bold font-serif text-base block">{order.total}</span>
                      <span className="inline-block text-[9px] bg-amber/10 text-amber font-bold px-2 py-0.5 rounded uppercase mt-1">
                        Pago via Pix Ecológico
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Impacto Gerado */}
          {activeTab === "impacto" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-moss font-bold">Relatório Consolidado de Ativos Ambientais</h2>
              
              <div className="glass-panel p-6 bg-white/45 rounded-2xl border border-white max-w-2xl space-y-4">
                <p className="text-xs text-cocoa/80 leading-relaxed font-light">
                  Como vendedor certificado VivaVinho, suas práticas agroecológicas (como o uso de biochar na lavoura ou a criação de sistemas agroflorestais) removem ativamente dióxido de carbono da atmosfera. Veja o total de CO₂ removido de sua propriedade:
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-moss/10 p-4 rounded-xl">
                    <span className="text-[10px] text-cocoa/50 uppercase block font-mono">CO₂ Removido</span>
                    <strong className="text-xl text-moss font-bold block my-1">647 kg</strong>
                    <span className="text-[9px] text-cocoa/60 font-semibold block">kg de CO₂ removido (Biochar/Agrofloresta)</span>
                  </div>
                  <div className="bg-amber/10 p-4 rounded-xl">
                    <span className="text-[10px] text-cocoa/50 uppercase block font-mono">Água Preservada</span>
                    <strong className="text-xl text-amber font-bold block my-1">11.400 L</strong>
                    <span className="text-[9px] text-cocoa/60 font-semibold block">Nascentes salvas</span>
                  </div>
                  <div className="bg-cocoa/5 p-4 rounded-xl">
                    <span className="text-[10px] text-cocoa/50 uppercase block font-mono">Reflorestamento</span>
                    <strong className="text-xl text-cocoa font-bold block my-1">45 m²</strong>
                    <span className="text-[9px] text-cocoa/60 font-semibold block">Área regenerada</span>
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

    </div>
  );
}
