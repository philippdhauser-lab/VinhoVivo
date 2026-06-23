import React, { useState, useEffect } from "react";
import { Product, Order, INITIAL_PRODUCTS, INITIAL_ORDERS } from "./data";
import LandingView from "./components/LandingView";
import LoginView from "./components/LoginView";
import CompradorView from "./components/CompradorView";
import VendedorView from "./components/VendedorView";
import AlmoxarifadoView from "./components/AlmoxarifadoView";
import AdminView from "./components/AdminView";

export interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

export default function App() {
  // Navigation: 'landing' | 'login' | 'comprador' | 'vendedor' | 'almoxarifado' | 'admin'
  const [currentView, setCurrentView] = useState<"landing" | "login" | "comprador" | "vendedor" | "almoxarifado" | "admin">("landing");
  
  // Real-time globally reactive databases
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  
  // Current session
  const [currentUser, setCurrentUser] = useState<{ email: string; nome: string; role: string; avatar: string } | null>(null);
  
  // Buyer e-commerce cart
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  
  // Client active impact stats (incremented live on checkouts!)
  const [personalImpact, setPersonalImpact] = useState({
    co2Offset: 12.4,
    waterSaved: 340,
    areaRegenerated: 0.8,
    producersSupported: 7,
  });

  // Global snackbar toast alerts
  const [toast, setToast] = useState<Toast | null>(null);

  // Auto close alerts
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  };

  // Auth hooks
  const handleLoginSuccess = (email: string, role: string, nome: string) => {
    const avatar = nome.split(" ").map(n => n[0]).join("").toUpperCase();
    setCurrentUser({ email, nome, role, avatar });
    
    // Automatically route to correct view according to user type
    if (role === "comprador") {
      setCurrentView("comprador");
    } else if (role === "vendedor") {
      setCurrentView("vendedor");
    } else if (role === "almoxarifado") {
      setCurrentView("almoxarifado");
    } else if (role === "admin") {
      setCurrentView("admin");
    } else {
      setCurrentView("landing");
    }
  };

  const handleLogout = () => {
    triggerToast("Sessão finalizada. Volte sempre!", "info");
    setCurrentUser(null);
    setCart([]);
    setCurrentView("landing");
  };

  // Cart operations
  const handleAddToCart = (p: Product) => {
    // Check stock depth
    if (p.stock <= 0) {
      triggerToast("Lamentamos, este produto está temporariamente sem estoque.", "error");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === p.id);
      if (existing) {
        if (existing.quantity >= p.stock) {
          triggerToast(`Apenas ${p.stock} unidades disponíveis no estoque!`, "error");
          return prev;
        }
        triggerToast(`Outra unidade de '${p.name.split(' ')[0]}' adicionada!`, "success");
        return prev.map((item) =>
          item.product.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      triggerToast(`'${p.name.split(' ')[0]}' adicionado ao seu carrinho!`, "success");
      return [...prev, { product: p, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (prodId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== prodId));
    triggerToast("Item retirado do carrinho.", "info");
  };

  const handleUpdateCartQuantity = (prodId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === prodId ? { ...item, quantity } : item
      )
    );
  };

  // Checkout completes order generation and increments environmental score
  const handleCheckout = () => {
    if (cart.length === 0) return;

    // 1. Map environmental savings
    let totalCo2 = 0;
    let totalWater = 0;
    let totalArea = 0;
    
    // 2. Format order items
    const orderItems = cart.map((c) => {
      totalCo2 += c.product.impact.co2Offset * c.quantity;
      totalWater += c.product.impact.waterSaved * c.quantity;
      totalArea += c.product.impact.areaRegenerated * c.quantity;
      
      // Deduct stock in global state
      setProducts((current) =>
        current.map((p) =>
          p.id === c.product.id ? { ...p, stock: Math.max(0, p.stock - c.quantity) } : p
        )
      );

      return {
        productId: c.product.id,
        name: c.product.name,
        quantity: c.quantity,
        price: c.product.price,
        colorBackground: c.product.colorBackground
      };
    });

    // 3. Set personal indicators increase
    setPersonalImpact((prev) => ({
      co2Offset: prev.co2Offset + totalCo2,
      waterSaved: prev.waterSaved + totalWater,
      areaRegenerated: prev.areaRegenerated + totalArea,
      producersSupported: prev.producersSupported + 1, // support other family
    }));

    // 4. Create newly real-time order for delivery teams
    const newOrder: Order = {
      id: `VV-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      buyerName: currentUser?.nome || "Ana Lima",
      items: orderItems,
      address: "Rua das Palmeiras, 102 - Apt 41, São Paulo, SP",
      timeLimit: "Hoje até 18h00 - URGENTE",
      urgency: Math.random() > 0.5 ? "alta" : "media",
      status: "Nova",
      date: new Date().toLocaleDateString("pt-BR")
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    triggerToast("Transação realizada com sucesso! Seus KPIs de impacto ecológico foram atualizados!", "success");
  };

  // Logistics update status sequencers for warehousers
  const handleUpdateOrderStatus = (orderId: string, nextStatus: Order["status"], extra?: Partial<Order>) => {
    setOrders((current) =>
      current.map((o) =>
        o.id === orderId ? { ...o, status: nextStatus, ...extra } : o
      )
    );
  };

  // Product edits for sellers
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setProducts((current) =>
      current.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  };

  const handleDeactivateProduct = (id: string) => {
    // Simulate setting stock to 0 to make deactivated look
    handleUpdateStock(id, 0);
  };

  return (
    <div className="bg-ivory selection:bg-bordeaux/20 min-h-screen text-cocoa">
      
      {/* 1. Global Interactive Toast Notifications banner */}
      {toast && (
        <div className="fixed bottom-6 left-6 max-w-sm z-50 animate-bounce cursor-pointer" onClick={() => setToast(null)}>
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-3 border ${
            toast.type === "success" 
              ? "bg-moss/95 text-warmwhite border-moss" 
              : toast.type === "error" 
              ? "bg-bordeaux/95 text-warmwhite border-bordeaux" 
              : "bg-cocoa/90 text-warmwhite border-cocoa"
          }`}>
            <span className="text-xl">{toast.type === "success" ? "🌱" : toast.type === "error" ? "⚠️" : "ℹ️"}</span>
            <p className="text-xs font-semibold">{toast.message}</p>
          </div>
        </div>
      )}

      {/* 2. Route views matching state */}
      {currentView === "landing" && (
        <LandingView
          products={products}
          onExplore={() => {
            if (currentUser) {
              handleLoginSuccess(currentUser.email, currentUser.role, currentUser.nome);
            } else {
              setCurrentView("login");
            }
          }}
          onLoginClick={() => setCurrentView("login")}
        />
      )}

      {currentView === "login" && (
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onGoBack={() => setCurrentView("landing")}
          showToast={triggerToast}
        />
      )}

      {currentView === "comprador" && currentUser && (
        <CompradorView
          products={products}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onCheckout={handleCheckout}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigateTo={(view: any) => setCurrentView(view)}
          personalImpact={personalImpact}
        />
      )}

      {currentView === "vendedor" && currentUser && (
        <VendedorView
          products={products}
          onAddProduct={handleAddProduct}
          onDeactivateProduct={handleDeactivateProduct}
          onUpdateStock={handleUpdateStock}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigateTo={(view: any) => setCurrentView(view)}
          showToast={triggerToast}
        />
      )}

      {currentView === "almoxarifado" && currentUser && (
        <AlmoxarifadoView
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigateTo={(view: any) => setCurrentView(view)}
          showToast={triggerToast}
        />
      )}

      {currentView === "admin" && currentUser && (
        <AdminView
          products={products}
          orders={orders}
          onAddProduct={handleAddProduct}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigateTo={(view: any) => setCurrentView(view)}
          showToast={triggerToast}
        />
      )}

    </div>
  );
}
