import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, X, ChevronRight, TrendingUp, Shield, Award, PieChart, Calendar } from "lucide-react";
import { Carousel3D, CarouselItem } from "./Carousel3D";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { InvestmentPortfolio } from "./InvestmentPortfolio";
import { RetirementPlanner } from "./RetirementPlanner";
import { ProfileData } from "./ProfileForm";

interface RecommendationsProps {
  onNavigate: (screen: string) => void;
  userProfile?: ProfileData | null;
}

export function Recommendations({ onNavigate, userProfile }: RecommendationsProps) {
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [activeTab, setActiveTab] = useState("portfolio");

  const investmentOptions: CarouselItem[] = [
    {
      id: 1,
      title: "Cuenta de Ahorro Digital",
      company: "BBVA México",
      description: "Ahorra sin mínimos, retira cuando quieras. Gana rendimientos diarios desde el primer peso.",
      risk: "Muy Bajo",
      returnRate: "4.5% anual",
      minAmount: "$1 MXN",
      color: "from-blue-600 to-blue-800",
      logo: "💳"
    },
    {
      id: 2,
      title: "Fondo de Inversión Hey",
      company: "Hey Banco",
      description: "Inversión flexible con rendimientos competitivos. Sin comisiones de apertura ni manejo.",
      risk: "Bajo",
      returnRate: "8.5% anual",
      minAmount: "$100 MXN",
      color: "from-purple-600 to-purple-900",
      logo: "🏦"
    },
    {
      id: 3,
      title: "Microcrédito Progresivo",
      company: "Konfío",
      description: "Crédito para hacer crecer tu negocio. Aprobación rápida, sin aval, tasas desde 18% anual.",
      risk: "Medio",
      returnRate: "Tasa 18-25%",
      minAmount: "$5,000 MXN",
      color: "from-orange-600 to-red-700",
      logo: "💰"
    },
    {
      id: 4,
      title: "Afore XXI Banorte",
      company: "Afore XXI Banorte",
      description: "Ahorro para tu retiro con aportaciones voluntarias. Mejores rendimientos del mercado.",
      risk: "Medio",
      returnRate: "10.2% anual",
      minAmount: "$50 MXN",
      color: "from-green-600 to-emerald-800",
      logo: "🎯"
    },
    {
      id: 5,
      title: "Inversión Garantizada",
      company: "Banorte",
      description: "Pagaré con rendimiento garantizado. Protege tu capital mientras ganas intereses.",
      risk: "Muy Bajo",
      returnRate: "7.8% anual",
      minAmount: "$500 MXN",
      color: "from-red-600 to-red-900",
      logo: "🔒"
    },
    {
      id: 6,
      title: "Crédito de Nómina",
      company: "Santander México",
      description: "Préstamo personal con descuento vía nómina. Tasas preferenciales para trabajadores.",
      risk: "Bajo",
      returnRate: "Tasa 15-20%",
      minAmount: "$10,000 MXN",
      color: "from-red-700 to-gray-900",
      logo: "💳"
    },
    {
      id: 7,
      title: "Inversión a Plazo Fijo",
      company: "Nu México",
      description: "Guarda tu dinero con rendimiento fijo. Desde 28 días con retornos garantizados.",
      risk: "Muy Bajo",
      returnRate: "9.5% anual",
      minAmount: "$1,000 MXN",
      color: "from-purple-700 to-purple-950",
      logo: "🏦"
    },
    {
      id: 8,
      title: "Crédito Infonavit",
      company: "Infonavit",
      description: "Crédito hipotecario para adquirir tu casa. Usa tu subcuenta de vivienda como enganche.",
      risk: "Medio",
      returnRate: "Tasa 10%",
      minAmount: "Según subcuenta",
      color: "from-orange-700 to-orange-950",
      logo: "🏠"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20">
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-[#FF4D00]" size={24} />
            <h1 className="text-white">SEFTI.Invest</h1>
          </div>
          <p className="text-gray-400">
            Portafolios y planes de retiro personalizados
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-900/50">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#FF4D00]">
              <PieChart size={16} className="mr-2" />
              Portafolio
            </TabsTrigger>
            <TabsTrigger value="retirement" className="data-[state=active]:bg-[#FF4D00]">
              <Calendar size={16} className="mr-2" />
              Retiro
            </TabsTrigger>
            <TabsTrigger value="instruments" className="data-[state=active]:bg-[#FF4D00]">
              <TrendingUp size={16} className="mr-2" />
              Opciones
            </TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <InvestmentPortfolio profile={userProfile || null} />
          </TabsContent>

          {/* Retirement Tab */}
          <TabsContent value="retirement" className="space-y-6">
            <RetirementPlanner profile={userProfile || null} />
          </TabsContent>

          {/* Instruments Tab */}
          <TabsContent value="instruments" className="space-y-6">
            {/* 3D Carousel */}
            <Carousel3D items={investmentOptions} onSelectItem={setSelectedItem} />

            {/* Why These Options Card */}
            <Card className="p-6 bg-gradient-to-r from-[#FF4D00]/20 to-red-900/20 border-[#FF4D00]/30">
              <div className="flex gap-3">
                <div className="bg-[#FF4D00]/20 p-3 rounded-lg">
                  <Award className="text-[#FF4D00]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2">Instrumentos Verificados</h3>
                  <p className="text-gray-200 text-sm">
                    SEFTI te muestra solo productos financieros de empresas confiables, 
                    reguladas por la CNBV y CONSAR, con costos justos para trabajadores.
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-gray-900/50 border-gray-800 text-center">
                <TrendingUp className="text-[#FF4D00] mx-auto mb-2" size={24} />
                <p className="text-2xl text-white mb-1">8</p>
                <p className="text-xs text-gray-400">Opciones</p>
              </Card>
              <Card className="p-4 bg-gray-900/50 border-gray-800 text-center">
                <Shield className="text-green-500 mx-auto mb-2" size={24} />
                <p className="text-2xl text-white mb-1">100%</p>
                <p className="text-xs text-gray-400">Reguladas</p>
              </Card>
              <Card className="p-4 bg-gray-900/50 border-gray-800 text-center">
                <Award className="text-yellow-500 mx-auto mb-2" size={24} />
                <p className="text-2xl text-white mb-1">$1+</p>
                <p className="text-xs text-gray-400">Desde</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-[#FF4D00]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-between">
              <span>{selectedItem?.title}</span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </Button>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedItem?.company}
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-gray-200">{selectedItem.description}</p>
              </div>

              <div className="space-y-3">
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Nivel de riesgo</p>
                  <p className="text-white">{selectedItem.risk}</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Rentabilidad esperada</p>
                  <p className="text-[#FF4D00]">{selectedItem.returnRate}</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Inversión mínima</p>
                  <p className="text-white">{selectedItem.minAmount}</p>
                </div>
              </div>

              <div className="bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-lg p-4">
                <p className="text-sm text-gray-200">
                  💡 <strong className="text-white">Consejo:</strong> Esta opción se ajusta a tu perfil porque {
                    selectedItem.risk === "Muy Bajo" || selectedItem.risk === "Bajo"
                      ? "tiene bajo riesgo y te permite mantener tu dinero seguro mientras gana rendimientos."
                      : "ofrece rendimientos más altos y puede ayudarte a alcanzar tus metas más rápido."
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setSelectedItem(null)}
                >
                  Cerrar
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedItem(null);
                    onNavigate("simulator");
                  }}
                  className="bg-[#FF4D00] hover:bg-[#E64500] text-white"
                >
                  Simular meta
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
