import React, { useState } from "react";
import { Product, Order, USERS_DB } from "../data";
import { 
  Users, ShoppingBag, ShieldCheck, Activity, Award, 
  Search, Flag, Check, X, Ban, Sparkles, Filter, 
  Database, FileSpreadsheet, Lock, UserX, CheckCircle, 
  Map, Info, BarChart3, LogOut, Heart, Edit, BookOpen
} from "lucide-react";
import { RulesReferenceView } from "./RulesReferenceView";

interface AdminViewProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (p: Product) => void;
  currentUser: { email: string; nome: string; role: string; avatar: string };
  onLogout: () => void;
  onNavigateTo: (view: string) => void;
  showToast: (msg: string, type: "success" | "error") => void;
}

export default function AdminView({
  products,
  orders,
  onAddProduct,
  currentUser,
  onLogout,
  onNavigateTo,
  showToast,
}: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<"visao" | "usuarios" | "produtos" | "pedidos" | "impacto">("visao");
  
  // Real-time search filter for User directory table
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedUserType, setSelectedUserType] = useState<"Todos" | "comprador" | "vendedor" | "almoxarifado">("Todos");

  // Local state directory representing 8 interactive mock users
  const [usersList, setUsersList] = useState([
    { name: "Ana Lima", email: "comprador@viva.com", role: "comprador", status: "Ativo", date: "23/06/2026" },
    { name: "Carlos Souza", email: "vendedor@viva.com", role: "vendedor", status: "Ativo", date: "21/06/2026" },
    { name: "Mariana Costa", email: "estoque@viva.com", role: "almoxarifado", status: "Ativo", date: "21/06/2026" },
    { name: "Rafael Admin", email: "admin@viva.com", role: "admin", status: "Ativo", date: "10/05/2026" },
    { name: "Helena Silveira", email: "helena@eco.org", role: "comprador", status: "Ativo", date: "20/06/2026" },
    { name: "Joaquim Bezerra", email: "agro_joaquim@vales.com", role: "vendedor", status: "Ativo", date: "18/06/2026" },
    { name: "Felipe Mendes", email: "felipe.mendes@gmail.com", role: "comprador", status: "Suspenso", date: "15/06/2026" },
    { name: "Juliana Rocha", email: "juliana@logist.com", role: "almoxarifado", status: "Ativo", date: "12/06/2026" },
  ]);

  // State space for user information editing
  const [editingUser, setEditingUser] = useState<{
    originalEmail: string;
    name: string;
    email: string;
    role: string;
    status: string;
  } | null>(null);

  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    if (!editingUser.name.trim()) {
      showToast("O nome do usuário não pode estar em branco.", "error");
      return;
    }
    if (!editingUser.email.trim()) {
      showToast("O e-mail do usuário não pode estar em branco.", "error");
      return;
    }

    setUsersList((prev) =>
      prev.map((u) => {
        if (u.email === editingUser.originalEmail) {
          return {
            ...u,
            name: editingUser.name,
            email: editingUser.email,
            role: editingUser.role,
            status: editingUser.status,
          };
        }
        return u;
      })
    );

    showToast(`Informações de ${editingUser.name} atualizadas de forma segura!`, "success");
    setEditingUser(null);
  };

  // Product moderation logs queue (mock additions)
  const [moderationQueue, setModerationQueue] = useState<Product[]>([
    {
      id: "mod-1",
      name: "Café Orgânico Melado da Chapada Diamantina",
      producer: "Fazenda Cafezal das Pedras",
      category: "cafe",
      price: 69.90,
      stock: 40,
      description: "Café especial aromático colhido manualmente no norte da Bahia, seco ao sol sobre terreiros suspensos com compensações agrícolas.",
      impact: { co2Offset: 1.8, waterSaved: 48, areaRegenerated: 2.1 },
      certifications: ["Orgânico", "Comércio Justo"],
      producerHistory: "União familiar que promove reflorestamentos ativos no leito de cabeceiras hídricas.",
      colorBackground: "bg-amber",
      imageText: "☕ Diamantina"
    },
    {
      id: "mod-2",
      name: "Vinho Tinto Biodinâmico Ancestral Cabernet",
      producer: "Adega do Vento Norte",
      category: "vinho",
      price: 210.00,
      stock: 25,
      description: "Edição rústica, uvas fermentadas em talhas de argila crua sob o ciclo lunar. Notas de cereja preta.",
      impact: { co2Offset: 2.3, waterSaved: 60, areaRegenerated: 1.5 },
      certifications: ["Orgânico", "Biodinâmico", "Vegano"],
      producerHistory: "Vinícultura autossuficiente focado no resguardo silvestre local de aves migratórias.",
      colorBackground: "bg-bordeaux",
      imageText: "🍷 Ancestral"
    }
  ]);

  // Handle user directory toggles Suspend / Activate
  const handleToggleUserStatus = (email: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.email === email) {
          const nextStatus = u.status === "Ativo" ? "Suspenso" : "Ativo";
          showToast(`Usuário ${u.name} agora está ${nextStatus.toUpperCase()}`, "success");
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // Perform moderation approvals
  const handleApproveProductInMod = (product: Product) => {
    onAddProduct(product);
    setModerationQueue((prev) => prev.filter((p) => p.id !== product.id));
    showToast(`Produto '${product.name}' aprovado e publicado no Marketplace!`, "success");
  };

  const handleReproveProductInMod = (productId: string) => {
    setModerationQueue((prev) => prev.filter((p) => p.id !== productId));
    showToast("Produto reprovado por insuficiência de selos ambientais.", "error");
  };

  // Filter users directory
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesType = selectedUserType === "Todos" || u.role === selectedUserType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-ivory text-cocoa font-sans flex flex-col">
      
      {/* Admin header */}
      <header className="bg-cocoa text-warmwhite border-b border-white/10 px-4 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-20 shadow-sm font-sans">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateTo("landing")}>
            <span className="text-3xl">🍷</span>
            <span className="font-serif text-2xl font-bold tracking-wide text-white">VivaVinho</span>
          </div>
          <span className="bg-red-950 border border-red-900 text-amber text-[10px] font-bold py-1 px-2.5 rounded-full uppercase">
            Painel Geral Admin ⚙️
          </span>
        </div>

        {/* Action Header bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => onNavigateTo("comprador")}
            className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer"
          >
            Navegar para Loja (Comprador)
          </button>
          
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <div className="w-8 h-8 rounded-full bg-bordeaux text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-semibold text-white">{currentUser.nome}</div>
              <div className="text-[9px] text-white/50 tracking-wider font-mono">ROLE: PLATFORM ADMINISTRATOR</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main body: Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar Admin (Deep Red tone) */}
        <aside className="w-full md:w-64 bg-cocoa text-warmwhite/80 p-6 flex flex-col justify-between gap-8 md:min-h-[calc(100vh-73px)] border-r border-white/10">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-white/30">Admin Command Center</div>
            <nav className="space-y-1.5 text-xs font-medium font-sans">
              
              <button
                onClick={() => setActiveTab("visao")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${activeTab === "visao" ? "bg-bordeaux text-white shadow-md font-semibold" : "hover:bg-white/5 text-white/70"}`}
              >
                <Activity className="w-4 h-4 text-amber" /> Visão Global KPIs
              </button>
              
              <button
                onClick={() => setActiveTab("usuarios")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${activeTab === "usuarios" ? "bg-bordeaux text-white shadow-md font-semibold" : "hover:bg-white/5 text-white/70"}`}
              >
                <Users className="w-4 h-4 text-white" /> Cadastros Diretores ({usersList.length})
              </button>

              <button
                onClick={() => setActiveTab("produtos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${activeTab === "produtos" ? "bg-bordeaux text-white shadow-md font-semibold" : "hover:bg-white/5 text-white/70"}`}
              >
                <span className="flex items-center gap-2.5"><Flag className="w-4 h-4 text-amber" /> Moderação Itens</span>
                {moderationQueue.length > 0 && (
                  <span className="bg-bordeaux border border-white/25 text-white text-[9px] px-2 py-0.5 rounded-full font-extrabold animate-pulse">
                    {moderationQueue.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("pedidos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${activeTab === "pedidos" ? "bg-bordeaux text-white shadow-md font-semibold" : "hover:bg-white/5 text-white/70"}`}
              >
                <ShoppingBag className="w-4 h-4 text-white" /> Pedidos Gerais ({orders.length})
              </button>

              <button
                onClick={() => setActiveTab("impacto")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${activeTab === "impacto" ? "bg-bordeaux text-white shadow-md font-semibold" : "hover:bg-white/5 text-white/70"}`}
              >
                <Award className="w-4 h-4 text-emerald-400" /> Histograma CO₂ Global
              </button>

              <button
                id="btn-nav-regras-admin"
                onClick={() => setActiveTab("regras")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${activeTab === "regras" ? "bg-bordeaux text-white shadow-md font-semibold" : "hover:bg-white/5 text-white/70"}`}
              >
                <BookOpen className="w-4 h-4 text-amber" /> Referência de Regras
              </button>

            </nav>
          </div>

          <div className="border-t border-white/10 pt-4">
            <button
              onClick={onLogout}
              className="w-full text-left py-2 px-3 text-red-400 hover:bg-white/5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" /> Encerar Admin
            </button>
          </div>
        </aside>

        {/* Admin Content Canvas */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8 text-cocoa">
          
          {/* TAB 1: Visão Geral */}
          {activeTab === "visao" && (
            <div className="space-y-8">
              
              <div>
                <h2 className="text-3xl font-serif text-bordeaux font-bold">Conselho de Administração VivaVinho</h2>
                <p className="text-sm text-cocoa/70 font-light mt-1">Supervisão consolidada de finanças, ecossistema social e pegadas de CO₂ removido ativamente (por biochar na lavoura ou agroforesta):</p>
              </div>

              {/* 6.1 — KPIs globais (8 cards em grid 4x2) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-xs">
                
                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Total Usuários</span>
                  <strong className="text-2xl font-serif text-cocoa font-bold block my-1">1.247</strong>
                  <span className="text-[9px] text-moss font-semibold">↑ 10% semana</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Artisans Ativos</span>
                  <strong className="text-2xl font-serif text-amber font-bold block my-1">89 prop.</strong>
                  <span className="text-[9px] text-moss font-semibold">8 cooperativas</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Lotes Cadastrados</span>
                  <strong className="text-2xl font-serif text-cocoa font-bold block my-1">634 SKU</strong>
                  <span className="text-[9px] text-moss font-semibold">98% ativos</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Pedidos Mensais</span>
                  <strong className="text-2xl font-serif text-bordeaux font-bold block my-1">412 ord.</strong>
                  <span className="text-[9px] text-moss font-semibold">Sem devoluções</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase font-extrabold text-bordeaux">GMV (Volume Injetado)</span>
                  <strong className="text-2xl font-serif text-bordeaux font-bold block my-1">R$ 127.840</strong>
                  <span className="text-[9px] text-moss font-semibold">Meta de Junho batida!</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Total de CO₂ Removido</span>
                  <strong className="text-2xl font-serif text-moss font-bold block my-1">2.847 kg</strong>
                  <span className="text-[9px] text-emerald-650 font-bold block">Via Biochar & Agrofloresta</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Produtores Apoiados</span>
                  <strong className="text-2xl font-serif text-cocoa font-bold block my-1">73 famílias</strong>
                  <span className="text-[9px] text-cocoa/50">8 etnias comunitárias</span>
                </div>

                <div className="p-4 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm text-center">
                  <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">NPS Geral Consumidor</span>
                  <strong className="text-2xl font-serif text-moss font-bold block my-1">68 / 100</strong>
                  <span className="text-[9px] text-moss font-semibold">Zona de Excelência ⭐</span>
                </div>

              </div>

              {/* Chart lines and notifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 6.4 — Gráfico de impacto global ao longo do tempo */}
                <div className="p-6 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm md:col-span-2 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-cocoa/5">
                    <h3 className="font-serif font-bold text-lg text-cocoa">Dióxido de Carbono (CO₂) Removido Acumulado</h3>
                    <span className="text-xs bg-moss/10 text-moss font-semibold px-2 py-0.5 rounded font-mono">KG CO₂ Removido</span>
                  </div>

                  {/* Render beautiful simulated SVG carbon emission trend line */}
                  <div className="h-56 relative pt-4 flex items-end">
                    <svg className="w-full h-full text-moss overflow-visible" viewBox="0 0 400 150">
                      
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(62,32,16,0.06)" />
                      <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(62,32,16,0.06)" />
                      <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(62,32,16,0.06)" />
                      
                      {/* Trend path */}
                      <path 
                        d="M 10 130 Q 80 110 150 90 T 290 50 T 390 20" 
                        fill="none" 
                        stroke="#3B5E3A" 
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      
                      {/* Points of interest */}
                      <circle cx="10" cy="130" r="5" fill="#C47A2B" />
                      <circle cx="150" cy="90" r="5" fill="#6B1A1A" />
                      <circle cx="290" cy="50" r="5" fill="#3B5E3A" />
                      <circle cx="390" cy="20" r="6" fill="#6B1A1A" />

                      <text x="10" y="145" fontSize="9" fill="#3E2010" opacity="0.6">Jan</text>
                      <text x="150" y="110" fontSize="9" fill="#3E2010" opacity="0.6">Mar</text>
                      <text x="290" y="70" fontSize="9" fill="#3E2010" opacity="0.6">Mai</text>
                      <text x="360" y="38" fontSize="9" fontWeight="bold" fill="#3B5E3A">2.8k kg</text>
                    </svg>
                  </div>
                  <p className="text-[10px] text-cocoa/50 italic text-center">Gráfico em escala real consolidado por auditorias parceiras.</p>
                </div>

                {/* Audit side logs */}
                <div className="p-6 bg-warmwhite border border-cocoa/10 rounded-2xl shadow-sm space-y-4">
                  <div className="flex gap-1.5 items-center pb-2 border-b border-cocoa/5">
                    <Database className="w-4 h-4 text-bordeaux" />
                    <h3 className="font-serif font-bold text-cocoa text-base">Atividade Log Sandbox</h3>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex gap-2 items-start">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <p className="font-light"><strong className="font-semibold text-cocoa">Vendedor 'Carlos'</strong> atualizou estoque de trufo selvagem.</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <p className="font-light"><strong className="font-semibold text-cocoa">Comprador 'Ana'</strong> realizou pix ecológico de R$ 32,00.</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="w-2 h-2 rounded-full bg-amber mt-1.5 shrink-0"></span>
                      <p className="font-light"><strong className="font-semibold text-cocoa">Sistema</strong> detectou pendência de auditoria em lote sementes.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Pasta Usuários (Tabela com Busca) */}
          {activeTab === "usuarios" && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-bordeaux font-bold">Diretório de Usuários Cadastrados</h2>
                  <p className="text-sm text-cocoa/70 font-light">Supervisione as contas, ative ou suspenda credenciais de forma instantânea:</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-cocoa/50">Visualizar tipo:</span>
                  <select
                    value={selectedUserType}
                    onChange={(e: any) => setSelectedUserType(e.target.value)}
                    className="text-xs bg-warmwhite border border-cocoa/10 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber text-cocoa"
                  >
                    <option value="Todos">Todos os Papéis</option>
                    <option value="comprador">Compradores</option>
                    <option value="vendedor">Vendedores</option>
                    <option value="almoxarifado">Almoxarifado</option>
                  </select>
                </div>
              </div>

              {/* Text query bar */}
              <div className="relative max-w-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cocoa/40">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou e-mail..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full bg-warmwhite border border-cocoa/10 focus:border-amber rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none text-cocoa"
                />
              </div>

              {/* 6.2 — Tabela de usuários */}
              <div className="bg-warmwhite rounded-2xl overflow-hidden border border-cocoa/10 shadow-sm text-xs font-sans">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-cocoa/5 text-cocoa/50 font-mono text-[10px] uppercase border-b border-cocoa/10">
                        <th className="p-4">Iniciais</th>
                        <th className="p-4">Nome Completo</th>
                        <th className="p-4">E-mail Cadastrado</th>
                        <th className="p-4">Papel Logístico</th>
                        <th className="p-4 text-center">Status Ativo</th>
                        <th className="p-4 text-center">Cadastro</th>
                        <th className="p-4 text-center">Ferramentas / Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cocoa/5 font-sans">
                      {filteredUsers.map((u, index) => (
                        <tr key={index} className="hover:bg-cocoa/5 transition-colors">
                          <td className="p-4">
                            <div className="w-8 h-8 rounded-full bg-cocoa/10 text-cocoa font-bold text-xs flex items-center justify-center">
                              {u.name.split(" ").map(n => n[0]).join("")}
                            </div>
                          </td>
                          <td className="p-4 font-bold text-cocoa">{u.name}</td>
                          <td className="p-4 font-mono text-[11px] text-cocoa/70">{u.email}</td>
                          <td className="p-4">
                            <span className={`inline px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              u.role === "comprador" ? "bg-bordeaux/10 text-bordeaux" :
                              u.role === "vendedor" ? "bg-amber/10 text-amber" :
                              u.role === "almoxarifado" ? "bg-moss/10 text-moss" : "bg-cocoa/20 text-cocoa"
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              u.status === "Ativo" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-4 text-center font-mono text-cocoa/60">{u.date}</td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              
                              <button
                                onClick={() => {
                                  alert(`PERFIL DETALHADO DO USUÁRIO\n\nNome: ${u.name}\nEmail: ${u.email}\nPapel: ${u.role}\nStatus: ${u.status}\nFiliado desde: ${u.date}`);
                                }}
                                className="px-2 py-1 bg-cocoa/5 hover:bg-cocoa/10 text-cocoa rounded text-[10px] font-bold"
                              >
                                Visualizar
                              </button>

                              <button
                                id={`btn-edit-user-${index}`}
                                onClick={() => {
                                  setEditingUser({
                                    originalEmail: u.email,
                                    name: u.name,
                                    email: u.email,
                                    role: u.role,
                                    status: u.status
                                  });
                                }}
                                className="px-2 py-1 bg-amber/15 hover:bg-amber/25 text-amber rounded text-[10px] font-bold flex items-center gap-1"
                              >
                                <Edit className="w-3 h-3" /> Editar
                              </button>

                              <button
                                onClick={() => handleToggleUserStatus(u.email)}
                                className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-0.5 ${
                                  u.status === "Ativo" 
                                    ? "bg-red-50 hover:bg-red-100 text-red-700" 
                                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {u.status === "Ativo" ? <Ban className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                                {u.status === "Ativo" ? "Suspender" : "Ativar"}
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

          {/* TAB 3: Moderar Produtos em Fila */}
          {activeTab === "produtos" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-bordeaux font-bold">Moderação de Cadastro de Rótulos ({moderationQueue.length})</h2>
                <p className="text-sm text-cocoa/70 font-light">Examine e certifique que os novos rótulos submetidos pelos artesãos parceiros sigam as cartilhas ecológicas:</p>
              </div>

              {moderationQueue.length === 0 ? (
                <div className="text-center py-12 bg-cocoa/5 rounded-2xl max-w-xl">
                  <span className="text-3xl block">📋</span>
                  <h4 className="font-serif font-bold text-cocoa mt-2">Nenhum produto pendente na fila de triagem</h4>
                  <p className="text-xs text-cocoa/60 mt-1 font-light">Todas as requisições ativas de artesãos já foram devidamente processadas ou publicadas.</p>
                </div>
              ) : (
                <div className="space-y-6 max-w-3xl">
                  {moderationQueue.map((p) => (
                    <div 
                      key={p.id}
                      className="p-6 bg-warmwhite rounded-2xl border border-cocoa/10 shadow-sm flex flex-col md:flex-row gap-5 items-start justify-between"
                    >
                      <div className="w-14 h-16 bg-cocoa/5 rounded flex items-center justify-center text-4xl shrink-0 self-center">
                        {p.imageText.split(' ')[0]}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <span className="bg-amber/15 text-amber text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-cocoa/40 font-mono ml-3 font-semibold">Artesão: {p.producer}</span>
                        </div>

                        <h3 className="font-serif font-bold text-cocoa text-base leading-tight">{p.name}</h3>
                        <p className="text-xs text-cocoa/75 leading-relaxed font-light">{p.description}</p>
                        
                        <div className="grid grid-cols-3 gap-2 py-2 border-y border-cocoa/5 text-[10px] font-mono">
                          <div>
                            <span className="text-cocoa/50 block">Preço de tabela:</span>
                            <strong className="text-bordeaux font-extrabold text-sm font-serif">R$ {p.price.toFixed(2)}</strong>
                          </div>
                          <div>
                            <span className="text-cocoa/50 block">Estoque Inicial:</span>
                            <strong className="text-cocoa text-sm">{p.stock} un</strong>
                          </div>
                          <div>
                            <span className="text-cocoa/50 block">Pegada CO₂:</span>
                            <strong className="text-moss text-sm">-{p.impact.co2Offset} kg CO₂eq</strong>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.certifications.map((c) => (
                            <span key={c} className="text-[9px] bg-moss/10 text-moss border border-moss/15 px-2 py-0.5 rounded font-bold">
                              ✓ {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Approvals controls */}
                      <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-cocoa/5">
                        <button
                          onClick={() => handleApproveProductInMod(p)}
                          className="flex-1 py-2 px-3.5 bg-bordeaux hover:bg-bordeaux/90 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Aprovar Rótulo
                        </button>
                        <button
                          onClick={() => handleReproveProductInMod(p.id)}
                          className="flex-1 py-2 px-3.5 bg-transparent border border-cocoa/20 hover:bg-cocoa/5 text-cocoa text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all"
                        >
                          <X className="w-3.5 h-3.5" /> Reprovar
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Pedidos Gerais */}
          {activeTab === "pedidos" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-bordeaux font-bold">Pedidos Gerais na Plataforma</h2>
              
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="p-4 bg-warmwhite rounded-xl border border-cocoa/10 flex justify-between items-center text-xs">
                    <div>
                      <strong className="font-mono text-cocoa">{o.id}</strong>
                      <span className="text-cocoa/40 mx-2">•</span>
                      <span className="font-semibold">{o.buyerName}</span>
                      <span className="text-cocoa/40 mx-2">•</span>
                      <span className="text-cocoa/60">{o.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-bordeaux">{o.items.length} un</span>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                        o.status === "Enviado" ? "bg-moss/15 text-moss" : "bg-amber/15 text-amber"
                      }`}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Referência de Regras */}
          {activeTab === "regras" && (
            <RulesReferenceView />
          )}

        </main>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-warmwhite rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative animate-scale-up text-xs text-cocoa font-sans">
            <div className="flex justify-between items-center border-b border-cocoa/10 pb-4 mb-4">
              <h3 className="font-serif font-bold text-xl text-bordeaux flex items-center gap-1.5">
                <Edit className="w-5 h-5 text-bordeaux" /> Editar Usuário
              </h3>
              <button 
                onClick={() => setEditingUser(null)} 
                className="text-cocoa/50 hover:text-cocoa font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUserEdit} className="space-y-4 font-sans text-left">
              <div>
                <label className="block text-xs font-bold text-cocoa/75 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa focus:outline-none focus:border-amber transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa/75 mb-1">E-mail Cadastrado</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa focus:outline-none focus:border-amber transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa/75 mb-1">Papel Logístico</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber text-cocoa transition-all"
                  >
                    <option value="comprador">Comprador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="almoxarifado">Almoxarifado</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa/75 mb-1">Status Ativo</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber text-cocoa transition-all"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Suspenso">Suspenso</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3 bg-transparent border border-cocoa/20 hover:bg-cocoa/5 rounded-xl text-xs font-semibold text-cocoa transition-all cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  id="btn-confirm-save-user"
                  type="submit"
                  className="flex-1 py-3 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
