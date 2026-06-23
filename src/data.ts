/**
 * VivaVinho core types and mock data
 */

export interface ImpactData {
  co2Offset: number; // in kg per unit
  waterSaved: number; // in liters per unit
  areaRegenerated: number; // in m2 per unit
}

export interface Product {
  id: string;
  name: string;
  producer: string;
  category: "vinho" | "cacau" | "cafe" | "natureza";
  price: number;
  stock: number;
  description: string;
  impact: ImpactData;
  certifications: ("Orgânico" | "Biodinâmico" | "Comércio Justo" | "Vegano")[];
  producerHistory: string;
  colorBackground: string; // for visually placeholder images
  imageText: string;
}

export interface User {
  email: string;
  nome: string;
  role: "comprador" | "vendedor" | "almoxarifado" | "admin";
  avatar: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  colorBackground: string;
}

export interface Order {
  id: string;
  buyerName: string;
  items: OrderItem[];
  address: string;
  timeLimit: string;
  urgency: "alta" | "media" | "baixa";
  status: "Nova" | "Em Separação" | "Pronto" | "Enviado";
  trackingCode?: string;
  carrier?: string;
  ecoPacking?: boolean;
  notes?: string;
  date: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Vinho Tinto Terroir Biodinâmico Cabernet",
    producer: "Vinícola Serene Forest",
    category: "vinho",
    price: 189.90,
    stock: 45,
    description: "Vinho de fermentação natural, cultivado seguindo o ciclo lunar e biodinâmico. Aromas profundos de frutas silvestres e notas terrosas.",
    impact: { co2Offset: 2.1, waterSaved: 48, areaRegenerated: 1.2 },
    certifications: ["Orgânico", "Biodinâmico", "Vegano"],
    producerHistory: "A família Rossi cultiva uvas sem pesticidas sintéticos há três gerações na Serra Gaúcha, reintroduzindo polinizadores locais em seu ecossistema florestal centenário.",
    colorBackground: "bg-bordeaux",
    imageText: "🍷 Cabernet"
  },
  {
    id: "prod-2",
    name: "Barra de Cacau Selvagem 85% com Hortelã",
    producer: "Chocolates Floresta Alta",
    category: "cacau",
    price: 32.00,
    stock: 120,
    description: "Cacau colhido de forma selvagem em sistemas de agrofloresta no sul da Bahia. Intensidade inigualável e pureza de origem.",
    impact: { co2Offset: 1.5, waterSaved: 35, areaRegenerated: 2.5 },
    certifications: ["Orgânico", "Comércio Justo", "Vegano"],
    producerHistory: "Uma cooperativa de 40 famílias em Ilhéus que preserva a Mata Atlântica através do cultivo do cacau cabruca, sob a sombra das árvores nativas.",
    colorBackground: "bg-cocoa",
    imageText: "🍫 Cacau 85%"
  },
  {
    id: "prod-3",
    name: "Café Bourbon Verde Agroecológico Torrado",
    producer: "Fazenda Sol Nascente",
    category: "cafe",
    price: 64.90,
    stock: 80,
    description: "Café gourmet especial 100% arábica. Notas sensoriais de caramelo, acidez cítrica e finalização limpa e duradoura.",
    impact: { co2Offset: 1.8, waterSaved: 60, areaRegenerated: 1.8 },
    certifications: ["Orgânico", "Comércio Justo"],
    producerHistory: "Localizada no cerrado mineiro, a fazenda utiliza energia solar para todo o beneficiamento do café e destina 30% da sua área para corredores ecológicos.",
    colorBackground: "bg-amber",
    imageText: "☕ Bourbon"
  },
  {
    id: "prod-4",
    name: "Mel de Abelhas Nativas de Agrofloresta Urçu",
    producer: "Santuário das Jataís",
    category: "natureza",
    price: 49.00,
    stock: 35,
    description: "Mel silvestre medicinal de abelhas sem ferrão. Sabor delicadamente ácido com toques florais silvestres e propriedades bioativas excepcionais.",
    impact: { co2Offset: 0.9, waterSaved: 20, areaRegenerated: 4.0 },
    certifications: ["Orgânico", "Biodinâmico"],
    producerHistory: "Iniciativa de reflorestamento que melhora a polinização de mais de 200 espécies botânicas nativas enquanto produz mel puro e curativo de meliponíneos.",
    colorBackground: "bg-moss",
    imageText: "🍯 Mel Puro"
  },
  {
    id: "prod-5",
    name: "Vinho Branco Natural Chardonnay Âmbar",
    producer: "Vinhos do Vento",
    category: "vinho",
    price: 154.00,
    stock: 22,
    description: "Vinho laranja natural sem filtragem e com fermentação espontânea. Complexidade mineral fantástica e notas de damasco seco.",
    impact: { co2Offset: 1.9, waterSaved: 52, areaRegenerated: 1.1 },
    certifications: ["Orgânico", "Vegano"],
    producerHistory: "Produzido em altitude na serra catarinense com intervenção mínima, focado no manejo sustentável do solo e regeneração de nascentes d'água.",
    colorBackground: "bg-amber",
    imageText: "🍾 Chardonnay Orange"
  },
  {
    id: "prod-6",
    name: "Trufas Gourmet de Cacau Cru & Flor de Sal",
    producer: "Chocolates Floresta Alta",
    category: "cacau",
    price: 45.00,
    stock: 60,
    description: "Trufas feitas artesanalmente com manteiga de cacau extraída a frio e flor de sal colhida de salinas ecologicamente protegidas.",
    impact: { co2Offset: 1.2, waterSaved: 30, areaRegenerated: 1.5 },
    certifications: ["Comércio Justo", "Vegano"],
    producerHistory: "Desenvolvimento integrado que garante 100% de rastreabilidade e remuneração justa (o dobro do piso do mercado regular) para as mulheres agricultoras da região.",
    colorBackground: "bg-cocoa",
    imageText: "🍬 Trufas Cruas"
  },
  {
    id: "prod-7",
    name: "Café Especial Orgânico Canastra Exótico",
    producer: "Serras da Canastra Orgânicos",
    category: "cafe",
    price: 72.00,
    stock: 40,
    description: "Café cultivado em microclima de altitude. Apresenta notas frutadas de pêssego e jasmim, de fragrância doce e limpa.",
    impact: { co2Offset: 1.7, waterSaved: 55, areaRegenerated: 1.6 },
    certifications: ["Orgânico", "Biodinâmico", "Comércio Justo"],
    producerHistory: "Produzido em harmonia com o Parque Nacional da Serra da Canastra, fomentando a transição de pequenos agricultores para práticas agroecológicas avançadas.",
    colorBackground: "bg-moss",
    imageText: "☕ Orgânico Canastra"
  },
  {
    id: "prod-8",
    name: "Granola Gourmet de Coquinho, Castanhas e Cacau",
    producer: "Sementes da Terra S.A.",
    category: "natureza",
    price: 28.50,
    stock: 150,
    description: "Mix crocante assado com melado de cana ecológico, coco queimado selvagem, amêndoas e gotas de nibs de cacau agroflorestal.",
    impact: { co2Offset: 1.1, waterSaved: 40, areaRegenerated: 2.2 },
    certifications: ["Orgânico", "Vegano"],
    producerHistory: "Compromisso social com assentamentos de reforma agrária sustentável, integrando castanhas de manejo coletivo e comércio justo.",
    colorBackground: "bg-bordeaux",
    imageText: "🌾 Granola Nativa"
  }
];

export const USERS_DB: Record<string, { senha: string; role: User["role"]; nome: string; avatar: string }> = {
  "comprador@viva.com": { senha: "123456", role: "comprador", nome: "Ana Lima", avatar: "AL" },
  "vendedor@viva.com":  { senha: "123456", role: "vendedor",  nome: "Carlos Souza", avatar: "CS" },
  "estoque@viva.com":   { senha: "123456", role: "almoxarifado", nome: "Mariana Costa", avatar: "MC" },
  "admin@viva.com":     { senha: "123456", role: "admin",     nome: "Rafael Admin", avatar: "RA" }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: "VV-2026-0841",
    buyerName: "Daniel K.",
    items: [
      { productId: "prod-1", name: "Vinho Tinto Terroir Biodinâmico Cabernet", quantity: 2, price: 189.90, colorBackground: "bg-bordeaux" },
      { productId: "prod-2", name: "Barra de Cacau Selvagem 85% com Hortelã", quantity: 3, price: 32.00, colorBackground: "bg-cocoa" }
    ],
    address: "Rua das Palmeiras, 102 - Apt 41, São Paulo, SP",
    timeLimit: "Hoje até 17h00",
    urgency: "alta",
    status: "Nova",
    date: "23/06/2026",
  },
  {
    id: "VV-2026-0842",
    buyerName: "Helena S.",
    items: [
      { productId: "prod-3", name: "Café Bourbon Verde Agroecológico Torrado", quantity: 1, price: 64.90, colorBackground: "bg-amber" },
      { productId: "prod-4", name: "Mel de Abelhas Nativas de Agrofloresta Urçu", quantity: 2, price: 49.00, colorBackground: "bg-moss" }
    ],
    address: "Av. Atlântica, 450 - Copacabana, Rio de Janeiro, RJ",
    timeLimit: "Amanhã 12h00",
    urgency: "media",
    status: "Em Separação",
    date: "23/06/2026",
  },
  {
    id: "VV-2026-0843",
    buyerName: "Roberta M.",
    items: [
      { productId: "prod-5", name: "Vinho Branco Natural Chardonnay Âmbar", quantity: 1, price: 154.00, colorBackground: "bg-amber" },
      { productId: "prod-7", name: "Café Especial Orgânico Canastra Exótico", quantity: 1, price: 72.00, colorBackground: "bg-moss" }
    ],
    address: "Alameda das Hortênsias, 88, Gramado, RS",
    timeLimit: "2 dias úteis",
    urgency: "baixa",
    status: "Pronto",
    date: "22/06/2026",
  },
  {
    id: "VV-2026-0844",
    buyerName: "Lucas T.",
    items: [
      { productId: "prod-6", name: "Trufas Gourmet de Cacau Cru & Flor de Sal", quantity: 4, price: 45.00, colorBackground: "bg-cocoa" }
    ],
    address: "Rua Uruguai, 550, Porto Alegre, RS",
    timeLimit: "Enviado ontem",
    urgency: "baixa",
    status: "Enviado",
    trackingCode: "BR-ECO-998811",
    carrier: "EcoLog Terminais Sustentáveis",
    ecoPacking: true,
    notes: "Entregar em mãos na portaria principal.",
    date: "22/06/2026"
  },
  {
    id: "VV-2026-0845",
    buyerName: "Carolina S.",
    items: [
      { productId: "prod-1", name: "Vinho Tinto Terroir Biodinâmico Cabernet", quantity: 1, price: 189.90, colorBackground: "bg-bordeaux" },
      { productId: "prod-8", name: "Granola Gourmet de Coquinho, Castanhas e Cacau", quantity: 2, price: 28.50, colorBackground: "bg-bordeaux" }
    ],
    address: "Rua Gabriel de Lara, 310, Curitiba, PR",
    timeLimit: "Hoje até 18h00 - URGENTE",
    urgency: "alta",
    status: "Nova",
    date: "23/06/2026"
  },
  {
    id: "VV-2026-0846",
    buyerName: "Arthur P.",
    items: [
      { productId: "prod-3", name: "Café Bourbon Verde Agroecológico Torrado", quantity: 3, price: 64.90, colorBackground: "bg-amber" }
    ],
    address: "Rua Paraíba, 1420 - Savassi, Belo Horizonte, MG",
    timeLimit: "Próximo dia",
    urgency: "media",
    status: "Nova",
    date: "23/06/2026"
  }
];
