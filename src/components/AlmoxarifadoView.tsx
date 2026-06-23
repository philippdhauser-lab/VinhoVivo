import React, { useState } from "react";
import { Order, OrderItem } from "../data";
import { 
  Package, ChevronRight, Truck, Check, AlertTriangle, 
  Clock, PackageCheck, HelpCircle, ShieldCheck, LogOut, 
  MapPin, CheckCircle2, ShoppingBag 
} from "lucide-react";

interface AlmoxarifadoViewProps {
  orders: Order[];
  onUpdateOrderStatus: (id: string, nextStatus: Order["status"], extra?: Partial<Order>) => void;
  currentUser: { email: string; nome: string; role: string; avatar: string };
  onLogout: () => void;
  onNavigateTo: (view: string) => void;
  showToast: (msg: string, type: "success" | "error") => void;
}

export default function AlmoxarifadoView({
  orders,
  onUpdateOrderStatus,
  currentUser,
  onLogout,
  onNavigateTo,
  showToast,
}: AlmoxarifadoViewProps) {
  const [activeTab, setActiveTab] = useState<"todos" | "separacao" | "prontos" | "enviados">("todos");
  
  // Modal tracking controller
  const [shippingOrder, setShippingOrder] = useState<Order | null>(null);
  const [trackingCode, setTrackingCode] = useState("");
  const [carrier, setCarrier] = useState("EcoLog Terminais Sustentáveis");
  const [useEcoPacking, setUseEcoPacking] = useState(true);
  const [shipNotes, setShipNotes] = useState("");

  // Categorize order counts
  const newCount = orders.filter(o => o.status === "Nova").length;
  const processingCount = orders.filter(o => o.status === "Em Separação").length;
  const readyCount = orders.filter(o => o.status === "Pronto").length;
  const sentCount = orders.filter(o => o.status === "Enviado").length;

  // Filter queue depending on tab selection
  const filteredOrders = orders.filter((o) => {
    if (activeTab === "separacao") return o.status === "Em Separação";
    if (activeTab === "prontos") return o.status === "Pronto";
    if (activeTab === "enviados") return o.status === "Enviado";
    return true; // "todos" Tab shows everything
  });

  // Proceed the order along the state sequencer
  const handleAdvanceStatus = (order: Order) => {
    if (order.status === "Nova") {
      onUpdateOrderStatus(order.id, "Em Separação");
      showToast(`Pedido ${order.id} movido para 'Em Separação'. Pegue os produtos!`, "success");
    } else if (order.status === "Em Separação") {
      onUpdateOrderStatus(order.id, "Pronto");
      showToast(`Pedido ${order.id} embalado e finalizado! Pronto para envio.`, "success");
    } else if (order.status === "Pronto") {
      // Trigger details modal for tracking code registry
      setShippingOrder(order);
      setTrackingCode(`BR-ECO-${Math.floor(Math.random() * 90000) + 10000}`);
      setUseEcoPacking(true);
      setShipNotes("");
    }
  };

  // Submit the Shipment Registration Modal
  const handleConfirmShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingOrder) return;

    if (!trackingCode.trim()) {
      showToast("O código de rastreamento é requerido para despacho.", "error");
      return;
    }

    onUpdateOrderStatus(shippingOrder.id, "Enviado", {
      trackingCode,
      carrier,
      ecoPacking: useEcoPacking,
      notes: shipNotes || "Sem observações adicionais"
    });

    showToast(`Despacho registrado para o pedido ${shippingOrder.id}! Comprador notificado em sandbox.`, "success");
    setShippingOrder(null);
  };

  return (
    <div className="min-h-screen bg-ivory text-cocoa font-sans flex flex-col">
      
      {/* Header navbar */}
      <header className="bg-warmwhite border-b border-cocoa/10 px-4 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-20 shadow-sm font-sans">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateTo("landing")}>
            <span className="text-3xl">🍷</span>
            <span className="font-serif text-2xl font-bold text-bordeaux tracking-wide">VivaVinho</span>
          </div>
          <span className="bg-moss/10 border border-moss/25 text-moss text-[10px] font-bold py-1 px-2.5 rounded-full uppercase">
            Almoxarifado & Despache 📦
          </span>
        </div>

        {/* Global Toolbar actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => onNavigateTo("admin")}
            className="text-xs bg-bordeaux/10 text-bordeaux hover:bg-bordeaux hover:text-white border border-bordeaux/20 font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Painel Admin
          </button>

          <div className="flex items-center gap-2 border-l border-cocoa/10 pl-3">
            <div className="w-8 h-8 rounded-full bg-moss text-white font-bold text-xs flex items-center justify-center">
              {currentUser.avatar}
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-semibold">{currentUser.nome}</div>
              <div className="text-[9px] text-cocoa/60 font-mono">Gestor Logístico</div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid structure */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-warmwhite/75 border-r border-cocoa/10 p-6 flex flex-col justify-between gap-8 md:min-h-[calc(100vh-73px)]">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cocoa/40">Fila de Triagem</div>
            <nav className="space-y-1.5 text-xs font-medium font-sans">
              <button
                onClick={() => setActiveTab("todos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${activeTab === "todos" ? "bg-moss text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <span className="flex items-center gap-2"><Package className="w-4 h-4" /> Todos os Pedidos</span>
                <span className="bg-cocoa/10 text-cocoa text-[9px] px-1.5 py-0.5 rounded-full font-bold">{orders.length}</span>
              </button>
              <button
                onClick={() => setActiveTab("separacao")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${activeTab === "separacao" ? "bg-moss text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber" /> Em Separação</span>
                <span className="bg-cocoa/10 text-cocoa text-[9px] px-1.5 py-0.5 rounded-full font-bold">{processingCount}</span>
              </button>
              <button
                onClick={() => setActiveTab("prontos")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${activeTab === "prontos" ? "bg-moss text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-moss" /> Prontos p/ Envio</span>
                <span className="bg-cocoa/10 text-cocoa text-[9px] px-1.5 py-0.5 rounded-full font-bold">{readyCount}</span>
              </button>
              <button
                onClick={() => setActiveTab("enviados")}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${activeTab === "enviados" ? "bg-moss text-white shadow-md font-semibold" : "text-cocoa/70 hover:bg-cocoa/5"}`}
              >
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-bordeaux" /> Enviados</span>
                <span className="bg-cocoa/10 text-cocoa text-[9px] px-1.5 py-0.5 rounded-full font-bold">{sentCount}</span>
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

        {/* Content staging area */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header titles */}
          <div>
            <h2 className="text-3xl font-serif text-cocoa font-bold">Instruções de Expedição do Dia</h2>
            <p className="text-sm text-cocoa/70 font-light mt-1">Nesta sandbox, novos pedidos fechados por compradores entram de imediato no topo da fila!</p>
          </div>

          {/* 5.1 — Resumo estatísticos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
              <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Ordens Novas</span>
              <strong className="text-2xl font-serif text-bordeaux font-bold block my-1">{newCount} un</strong>
              <span className="text-[9px] text-cocoa/50">Aguardando início</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
              <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Em Separação</span>
              <strong className="text-2xl font-serif text-amber font-bold block my-1">{processingCount} un</strong>
              <span className="text-[9px] text-cocoa/50">Nas bancas de triagem</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center">
              <span className="text-[10px] text-cocoa/50 font-mono tracking-wider block uppercase">Prontos p/ Envio</span>
              <strong className="text-2xl font-serif text-moss font-bold block my-1">{readyCount} un</strong>
              <span className="text-[9px] text-cocoa/50">Embalados ecológicos</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white bg-white/45 shadow-sm text-center border-amber/35 bg-warmwhite/80">
              <span className="text-[10px] text-amber/90 font-mono tracking-wider block uppercase font-bold">Atrasados Críticos</span>
              <strong className="text-2xl font-serif text-amber font-bold block my-1">1 remessa</strong>
              <span className="text-[9px] text-red-700 font-extrabold flex items-center justify-center gap-0.5">⚠️ Prioridade Total</span>
            </div>

          </div>

          {/* 5.2 — Lista de ordens de separação */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-cocoa/5 rounded-2xl">
              <span className="text-2xl block">📦</span>
              <h4 className="font-serif font-bold text-cocoa mt-2">Sem encomendas categorizadas nesta guia</h4>
              <p className="text-xs text-cocoa/60 mt-1 font-light">Assegure-se de que os compradores já tenham efetuado compras ou mude a aba de navegação lateral.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOrders.map((order) => {
                
                // Color levels for levels of urgency
                const urgencyStyles = {
                  alta: "border-red-300 bg-red-50 text-red-700",
                  media: "border-amber/30 bg-amber/5 text-amber",
                  baixa: "border-emerald-300 bg-emerald-50/50 text-moss"
                }[order.urgency];

                // Status colors
                const statusStyles = {
                  "Nova": "bg-bordeaux/10 text-bordeaux border border-bordeaux/20",
                  "Em Separação": "bg-amber/10 text-amber border border-amber/20",
                  "Pronto": "bg-moss/10 text-moss border border-moss/20",
                  "Enviado": "bg-cocoa/15 text-cocoa border border-cocoa/25 font-bold"
                }[order.status];

                return (
                  <div 
                    key={order.id}
                    className="glass-panel p-6 rounded-2xl border border-white bg-white/45 flex flex-col justify-between shadow-sm relative"
                  >
                    
                    {/* Header bar */}
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <div>
                          <span className="text-[10px] bg-cocoa/5 font-mono text-cocoa/60 px-2 py-0.5 rounded font-bold">
                            {order.id}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ml-2 ${urgencyStyles}`}>
                            Urgência: {order.urgency}
                          </span>
                        </div>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${statusStyles}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Client profile */}
                      <span className="text-[11px] text-cocoa/60 font-semibold block mb-3 font-mono">Consumidor: {order.buyerName}</span>

                      {/* Items list */}
                      <div className="space-y-2 border-y border-cocoa/5 py-3 mb-4 max-h-40 overflow-y-auto custom-scrollbar">
                        {order.items.map((it, i_idx) => (
                          <div key={i_idx} className="flex gap-2.5 items-center justify-between text-xs font-sans">
                            <div className="flex gap-2 items-center min-w-0 pr-2">
                              <span className="text-lg shrink-0">📦</span>
                              <span className="font-serif font-bold text-cocoa truncate">{it.name}</span>
                            </div>
                            <span className="bg-cocoa/5 text-cocoa font-bold px-2 py-0.5 rounded shrink-0">
                              Qtd: {it.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Location details */}
                      <div className="flex items-start gap-1.5 text-xs text-cocoa/70 mb-4 bg-cocoa/5 p-3 rounded-xl">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 text-red-500 shrink-0" />
                        <span className="font-light pr-1">{order.address}</span>
                      </div>
                    </div>

                    {/* Quick dispatcher actions footer */}
                    <div className="border-t border-cocoa/5 pt-4 flex justify-between items-center bg-transparent mt-2">
                      <span className="text-[10px] font-mono text-cocoa/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Prazo: {order.timeLimit}
                      </span>

                      {order.status !== "Enviado" ? (
                        <button
                          id={`btn-order-advance-${order.id}`}
                          onClick={() => handleAdvanceStatus(order)}
                          className="px-4 py-2 bg-bordeaux hover:bg-bordeaux/90 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          {order.status === "Nova" && "Iniciar Separação →"}
                          {order.status === "Em Separação" && "Marcar Pronto ✓"}
                          {order.status === "Pronto" && "Registrar Envio 🚀"}
                        </button>
                      ) : (
                        <div className="text-[10px] font-medium text-moss flex items-center gap-1 font-mono">
                          <Truck className="w-3.5 h-3.5 text-moss" /> Rastreio: {order.trackingCode}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

      {/* 5.3 — Modal de registro de envio */}
      {shippingOrder && (
        <div className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-warmwhite rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative animate-scale-up text-xs text-cocoa font-sans">
            
            <div className="flex justify-between items-center border-b border-cocoa/10 pb-4 mb-4">
              <h3 className="font-serif font-bold text-xl text-bordeaux flex items-center gap-1.5">
                <Truck className="w-5 h-5 text-bordeaux" /> Expedição Sustentável Pedido
              </h3>
              <button onClick={() => setShippingOrder(null)} className="text-cocoa/50 hover:text-cocoa font-bold">✕ Fechar</button>
            </div>

            <p className="text-xs text-cocoa/75 mb-4 font-light leading-relaxed">
              O pedido <strong className="font-mono">{shippingOrder.id}</strong> para <strong className="font-semibold">{shippingOrder.buyerName}</strong> está devidamente triado e selado. Atribua o código e transportadora licenciada:
            </p>

            <form onSubmit={handleConfirmShipment} className="space-y-4 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa/75 mb-1">Código de Rastreamento *</label>
                  <input
                    type="text"
                    required
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="BR-ECO-XXXXX"
                    className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs text-cocoa font-mono focus:outline-none focus:border-amber"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cocoa/75 mb-1">Transportadora Carbono Compensado</label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber text-cocoa"
                  >
                    <option value="EcoLog Terminais Sustentáveis">EcoLog Terminais</option>
                    <option value="EcoExpress Correios Verdes">EcoExpress Correios</option>
                    <option value="Fluvial Cargo Orgânico">Fluvial Cargo Nacional</option>
                  </select>
                </div>
              </div>

              {/* Eco packing checkbox */}
              <div className="p-3.5 bg-moss/10 rounded-xl border border-moss/15 text-moss">
                <label className="flex items-center gap-2 cursor-pointer font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={useEcoPacking}
                    onChange={(e) => setUseEcoPacking(e.target.checked)}
                    className="rounded text-moss border-moss/30 focus:ring-moss/45 accent-moss w-4 h-4"
                  />
                  <span>Utilizar Embalagem Orgânica / Livre de Plástico ✓</span>
                </label>
                <p className="text-[10px] text-cocoa/75 mt-1 font-light leading-relaxed ml-6">
                  Garante o envio utilizando celulose reciclada prensada, feno e cera protetora natural de abelha jataí para isolamento térmico das garrafas de vinho chardonnay.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa/75 mb-1">Obervações de Despacho</label>
                <textarea
                  value={shipNotes}
                  onChange={(e) => setShipNotes(e.target.value)}
                  placeholder="Instruções para transportadora, cuidado especial com vidro..."
                  className="w-full bg-white/50 border border-cocoa/15 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber h-20 resize-none text-cocoa"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShippingOrder(null)}
                  className="flex-1 py-3 bg-transparent border border-cocoa/20 hover:bg-cocoa/5 rounded-xl text-xs font-semibold text-cocoa transition-all"
                >
                  Cancelar
                </button>
                <button
                  id="btn-confirm-shipping"
                  type="submit"
                  className="flex-1 py-1 px-4 bg-bordeaux hover:bg-bordeaux/90 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4" /> Despachar Remessa
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
