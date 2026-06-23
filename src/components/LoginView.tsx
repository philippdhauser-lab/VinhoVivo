import React, { useState } from "react";
import { Toast } from "../App";
import { USERS_DB } from "../data";
import { ShieldCheck, UserCheck, Key, RefreshCw, Mail, Eye, EyeOff } from "lucide-react";

interface LoginViewProps {
  onLoginSuccess: (email: string, role: string, nome: string) => void;
  onGoBack: () => void;
  showToast: (msg: string, type: "success" | "error") => void;
}

export default function LoginView({ onLoginSuccess, onGoBack, showToast }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Email validation
    if (!email) {
      setEmailError("O endereço de e-mail é obrigatório.");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError("Insira um endereço de e-mail válido.");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Insira uma senha para autenticar.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("A senha precisa ter no mínimo 6 caracteres.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    // Simulated lookup
    const foundUser = USERS_DB[email.trim().toLowerCase()];
    if (foundUser && foundUser.senha === password) {
      showToast(`Bem-vindo(a) de volta, ${foundUser.nome}!`, "success");
      onLoginSuccess(email, foundUser.role, foundUser.nome);
    } else {
      showToast("Credenciais incorretas. Use a sessaõ de atalhos abaixo da tela.", "error");
      setPasswordError("Senha ou e-mail incorreto");
    }
  };

  // Fast demo shortcuts
  const handleShortcutLogin = (demoEmail: string) => {
    const user = USERS_DB[demoEmail];
    if (user) {
      setEmail(demoEmail);
      setPassword("123456");
      setEmailError("");
      setPasswordError("");
      showToast(`Acesso rápido: ${user.nome} (${user.role.toUpperCase()})`, "success");
      onLoginSuccess(demoEmail, user.role, user.nome);
    }
  };

  return (
    <div className="min-h-screen radial-bg flex flex-col justify-center items-center px-4 py-12 selection:bg-bordeaux/30">
      
      {/* Decorative top header / return button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onGoBack}
          className="text-warmwhite/60 hover:text-white flex items-center gap-2 text-sm transition-all"
        >
          ← Voltar para a Landing
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        
        {/* Logo and name */}
        <div className="text-center">
          <span className="text-4xl">🍷</span>
          <h1 className="text-3xl font-serif font-bold text-white tracking-wide mt-2">VivaVinho</h1>
          <p className="text-xs text-warmwhite/70 italic mt-1 font-light">Marketplace de Hedonismo Sustentável</p>
        </div>

        {/* Centralized Glass Card */}
        <div className="glass-panel-dark text-warmwhite rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber/10 blur-xl"></div>
          
          <h2 className="text-xl font-serif font-semibold text-center mb-6">Acesso à Plataforma</h2>
          
          <form onSubmit={handleManualLogin} className="space-y-4">
            
            {/* Email input field */}
            <div>
              <label className="block text-xs font-medium text-warmwhite/80 mb-1">Endereço de E-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) setEmailError("");
                  }}
                  placeholder="seu-email@viva.com"
                  className={`w-full bg-white/5 border ${emailError ? "border-red-500" : "border-white/10"} focus:border-amber/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none transition-all`}
                />
              </div>
              {emailError && (
                <p className="text-red-400 text-[10px] mt-1 font-medium">{emailError}</p>
              )}
            </div>

            {/* Password input field */}
            <div>
              <label className="block text-xs font-medium text-warmwhite/80 mb-1">Senha de Acesso</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value) setPasswordError("");
                  }}
                  placeholder="******"
                  className={`w-full bg-white/5 border ${passwordError ? "border-red-500" : "border-white/10"} focus:border-amber/60 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-white/30 focus:outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-400 text-[10px] mt-1 font-medium">{passwordError}</p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-[10px] text-amber hover:underline hover:text-amber/80 font-light">Esqueceu a senha?</a>
            </div>

            {/* Standard "Sair" input */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-bordeaux hover:bg-bordeaux/90 rounded-xl text-white font-medium text-sm transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Entrar com Segurança
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <span className="text-xs text-warmwhite/60 font-light">
              Ainda não tem conta? <a href="#" className="font-semibold text-amber hover:underline">Cadastre-se</a>
            </span>
          </div>

        </div>

        {/* Dynamic Shortcut Panel for Demo Showcase */}
        <div className="glass-panel text-cocoa rounded-3xl p-6 border border-white/30 bg-white/70 shadow-xl space-y-4">
          <div className="flex items-center gap-1.5 border-b border-cocoa/10 pb-2">
            <ShieldCheck className="w-4 h-4 text-bordeaux" />
            <h3 className="font-serif font-bold text-sm text-cocoa uppercase tracking-wider">Acesso Rápido para Demonstração</h3>
          </div>
          
          <p className="text-[11px] text-cocoa/70">
            Clique no perfil desejado abaixo para preencher automaticamente as credenciais em sandbox e simular cada painel:
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            
            <button
              type="button"
              onClick={() => handleShortcutLogin("comprador@viva.com")}
              className="p-2.5 rounded-lg border border-cocoa/5 bg-warmwhite hover:bg-bordeaux/10 text-left transition-all active:scale-95"
            >
              <div className="font-semibold text-cocoa flex items-center gap-1">🛒 Comprador</div>
              <div className="text-[10px] text-cocoa/60">comprador@viva.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleShortcutLogin("vendedor@viva.com")}
              className="p-2.5 rounded-lg border border-cocoa/5 bg-warmwhite hover:bg-amber/10 text-left transition-all active:scale-95"
            >
              <div className="font-semibold text-cocoa flex items-center gap-1">🏪 Vendedor</div>
              <div className="text-[10px] text-cocoa/60">vendedor@viva.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleShortcutLogin("estoque@viva.com")}
              className="p-2.5 rounded-lg border border-cocoa/5 bg-warmwhite hover:bg-moss/10 text-left transition-all active:scale-95"
            >
              <div className="font-semibold text-cocoa flex items-center gap-1">📦 Suprimentos</div>
              <div className="text-[10px] text-cocoa/60">estoque@viva.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleShortcutLogin("admin@viva.com")}
              className="p-2.5 rounded-lg border border-cocoa/5 bg-warmwhite hover:bg-bordeaux/10 text-left transition-all active:scale-95"
            >
              <div className="font-semibold text-cocoa flex items-center gap-1">⚙️ Admin</div>
              <div className="text-[10px] text-cocoa/60">admin@viva.com</div>
            </button>

          </div>

          <div className="text-center bg-cocoa/5 rounded-lg p-2 text-[10px] text-cocoa/60 font-mono flex items-center justify-center gap-1.5">
            <RefreshCw className="w-3 h-3 animate-spin text-cocoa/40" /> Senha padrão: <span className="font-bold text-bordeaux">123456</span>
          </div>
        </div>

      </div>
    </div>
  );
}
