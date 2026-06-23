import React from "react";
import { BookOpen, Scale, Globe, Droplet, Sparkles, Share2, ShieldCheck, Heart } from "lucide-react";

export function RulesReferenceView() {
  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Header Panel */}
      <div className="glass-panel p-6 sm:p-8 bg-white/40 border border-white rounded-3xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="w-40 h-40 text-bordeaux" />
        </div>
        <div className="flex items-center gap-2 text-bordeaux">
          <span className="text-2xl">📖</span>
          <span className="text-xs font-mono uppercase tracking-widest font-bold">Diretrizes & Metrologia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-cocoa font-bold">
          Manual de Referência e Regras Ambientais
        </h2>
        <p className="text-xs sm:text-sm text-cocoa/80 leading-relaxed font-light max-w-2xl">
          Conheça os fundamentos metodológicos, premissas de cálculo e a filosofia de bem comum que sustentam as métricas de impacto e remoção de CO₂ exibidas plataforma VivaVinho.
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* regra 1 */}
        <div className="glass p-6 rounded-2xl bg-white/35 hover:bg-white/50 border border-white/45 transition-all space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-bordeaux/10 text-bordeaux flex items-center justify-center font-bold font-mono">
              01
            </div>
            <span className="text-3xs font-mono uppercase bg-bordeaux/10 text-bordeaux px-2 py-0.5 rounded font-bold">Ciclo de Vida</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-cocoa text-lg flex items-center gap-2">
              <Globe className="w-4 h-4 text-bordeaux/80" /> Benefício Líquido ao Clima
            </h3>
            <p className="text-xs text-cocoa/75 leading-relaxed font-light">
              Apenas são aceitos produtos cujo ciclo de produção completo (abrangendo desde a colheita, processamento, transporte de insumos, distribuição ao consumidor final e a disposição final da embalagem) apresente um comprovado <strong>benefício líquido positivo no clima</strong>. Cada elo da cadeia é auditado para garantir balanço favorável.
            </p>
          </div>
        </div>

        {/* regra 2 */}
        <div className="glass p-6 rounded-2xl bg-white/35 hover:bg-white/50 border border-white/45 transition-all space-y-4 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-950/10 text-bordeaux flex items-center justify-center font-bold font-mono">
              02
            </div>
            <span className="text-3xs font-mono uppercase bg-moss/10 text-moss px-2 py-0.5 rounded font-bold">Bem Comum Compartilhado</span>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-cocoa text-lg flex items-center gap-2">
              <Scale className="w-4 h-4 text-moss" /> Não-Divisibilidade e Dupla Contagem
            </h3>
            <p className="text-xs text-cocoa/75 leading-relaxed font-light">
              O benefício no clima é considerado uma propriedade intrínseca do produto e, por consequência, um <strong>bem ambiental não divisível</strong>. A VivaVinho utiliza critérios rigorosos de cálculo para assegurar a autenticidade dos dados, no entanto, <strong>não se aplicam critérios de adicionalidade mercadológica ou de dupla contagem artificial</strong>.
            </p>
            <div className="bg-moss/5 border border-moss/10 p-3 rounded-xl text-cocoa/80 text-[11px] leading-relaxed font-light">
              💡 <strong>Nossa Filosofia:</strong> O benefício socioambiental é gerado e usufruído por todos os participantes da cadeia (desde quem planta, passando por quem transporta, até quem consome). Portanto, ele <strong>não pertence de forma exclusiva</strong> a um único agente nem é fatiado comercialmente.
            </div>
          </div>
        </div>

        {/* regra 3 */}
        <div className="glass p-6 rounded-2xl bg-white/35 hover:bg-white/50 border border-white/45 transition-all space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-bordeaux/10 text-bordeaux flex items-center justify-center font-bold font-mono">
              03
            </div>
            <span className="text-3xs font-mono uppercase bg-amber/15 text-amber px-2 py-0.5 rounded font-bold">Biomas Terrestres</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-cocoa text-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber" /> Conservação de Áreas Naturais
            </h3>
            <p className="text-xs text-cocoa/75 leading-relaxed font-light">
              A salvaguarda de biomas vulneráveis é registrada sob a dimensão de conservação física do solo, calculada de maneira direta em <strong>metros quadrados ($m^2$) protegidos e toneladas de CO₂ estocadas</strong> na vegetação permanente. Adota-se essa premissa transparente pois não há consenso metodológico preciso que una a preservação passiva direta à remoção mecanizada ou emissões evitadas fictícias.
            </p>
          </div>
        </div>

        {/* regra 4 */}
        <div className="glass p-6 rounded-2xl bg-white/35 hover:bg-white/50 border border-white/45 transition-all space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-bordeaux/10 text-bordeaux flex items-center justify-center font-bold font-mono">
              04
            </div>
            <span className="text-3xs font-mono uppercase bg-blue-900/10 text-blue-800 px-2 py-0.5 rounded font-bold">Recurso Hídrico</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-cocoa text-lg flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-650" /> Cálculo de Preservação de Água
            </h3>
            <p className="text-xs text-cocoa/75 leading-relaxed font-light">
              A quantidade de água preservada ou poluição poupada estimada das bacias é sempre medida pelo <strong>balanço hídrico comparativo</strong>. O cálculo contrasta a cadeia agroecológica da VivaVinho contra os processos tradicionais e intensivos do mercado concorrente, permitindo que cada gole represente uma pegada ecológica real e poupada.
            </p>
          </div>
        </div>

        {/* regra 5 */}
        <div className="glass p-6 rounded-2xl bg-white/35 hover:bg-white/50 border border-white/45 transition-all space-y-4 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-bordeaux/10 text-bordeaux flex items-center justify-center font-bold font-mono">
              05
            </div>
            <span className="text-3xs font-mono uppercase bg-pink-100 text-pink-800 px-2 py-0.5 rounded font-bold">Outros Parâmetros</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-cocoa text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> Benefícios Imensuráveis e Sociais
            </h3>
            <p className="text-xs text-cocoa/75 leading-relaxed font-light">
              Sabemos que existem dimensões da reabilitação da natureza e bem-estar comunitário que fogem da frieza de algoritmos quantitativos convencionais. Elementos como emancipação de pequenos produtores parceiros, reinserção de fauna nativa e proteção do microclima da lavoura são abordados de forma detalhada e transparente por meio de <strong>relatórios descritivos qualitativos</strong> na ficha técnica individual de cada produto.
            </p>
          </div>
        </div>

      </div>

      {/* Philosophy Callout Footer */}
      <div className="p-6 bg-bordeaux/5 border border-bordeaux/10 rounded-2xl text-center space-y-2">
        <span className="text-xl">🤝</span>
        <h4 className="font-serif font-bold text-cocoa text-sm">Integridade VivaVinho</h4>
        <p className="text-xs text-cocoa/65 max-w-lg mx-auto font-light">
          Acreditamos que a transparência ambiental não precisa ser burocrática, e sim sincera. Ao unir tecnologia circular e respeito ao território, promovemos a verdadeira sustentabilidade sistêmica.
        </p>
      </div>
    </div>
  );
}
