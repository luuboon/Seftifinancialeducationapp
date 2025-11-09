import { Card } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TrendingUp, Shield, Zap, ArrowUpRight } from "lucide-react";
import { ProfileData } from "./ProfileForm";

interface InvestmentPortfolioProps {
  profile: ProfileData | null;
}

export function InvestmentPortfolio({ profile }: InvestmentPortfolioProps) {
  // Determinar portafolio según perfil de riesgo y edad
  const getPortfolio = () => {
    if (!profile) return null;

    const age = parseInt(profile.age) || 30;
    const riskProfile = profile.riskTolerance || "moderado";

    // Portafolio Conservador
    if (riskProfile === "conservador" || age > 55) {
      return {
        name: "Portafolio Conservador",
        description: "Enfocado en preservar tu capital con riesgo mínimo",
        icon: Shield,
        color: "from-blue-600 to-blue-800",
        expectedReturn: "6-8%",
        volatility: "Baja",
        allocation: [
          { name: "CETES y Bonos Gubernamentales", value: 50, color: "#4CAF50" },
          { name: "Afore - Siefore Básica 0", value: 25, color: "#2196F3" },
          { name: "Fondos de Inversión Conservadores", value: 15, color: "#FF9800" },
          { name: "Efectivo/Cuenta de Ahorro", value: 10, color: "#9E9E9E" }
        ],
        instruments: [
          { name: "CETES 28 días", institution: "Gobierno de México", return: "10.5%", risk: "Muy Bajo" },
          { name: "Afore XXI Banorte SB0", institution: "Afore XXI Banorte", return: "6.5%", risk: "Muy Bajo" },
          { name: "Fondo Garantizado", institution: "Banorte", return: "7.8%", risk: "Bajo" },
          { name: "Cuenta Hey", institution: "Hey Banco", return: "8.5%", risk: "Muy Bajo" }
        ]
      };
    }
    // Portafolio Moderado
    else if (riskProfile === "moderado" || (age >= 30 && age <= 55)) {
      return {
        name: "Portafolio Balanceado",
        description: "Equilibrio óptimo entre crecimiento y estabilidad",
        icon: TrendingUp,
        color: "from-orange-600 to-red-700",
        expectedReturn: "10-14%",
        volatility: "Media",
        allocation: [
          { name: "Afore - Siefore Básica 2", value: 30, color: "#FF4D00" },
          { name: "Fondos de Inversión Mixtos", value: 25, color: "#FF9800" },
          { name: "CETES y Bonos", value: 25, color: "#4CAF50" },
          { name: "ETFs México (NAFTRAC)", value: 15, color: "#9C27B0" },
          { name: "Efectivo", value: 5, color: "#9E9E9E" }
        ],
        instruments: [
          { name: "Afore XXI Banorte SB2", institution: "Afore XXI Banorte", return: "12.5%", risk: "Medio" },
          { name: "NAFTRAC ETF", institution: "BBVA México", return: "14.8%", risk: "Medio" },
          { name: "CETES 91 días", institution: "Gobierno de México", return: "10.8%", risk: "Muy Bajo" },
          { name: "Fondo Hey Inversión", institution: "Hey Banco", return: "11.2%", risk: "Medio" }
        ]
      };
    }
    // Portafolio Agresivo
    else {
      return {
        name: "Portafolio de Crecimiento",
        description: "Maximiza tu potencial de rendimiento a largo plazo",
        icon: Zap,
        color: "from-purple-600 to-purple-900",
        expectedReturn: "15-22%",
        volatility: "Alta",
        allocation: [
          { name: "Afore - Siefore Básica 4", value: 35, color: "#9C27B0" },
          { name: "ETFs y Acciones México", value: 30, color: "#FF4D00" },
          { name: "Fondos de Inversión Agresivos", value: 20, color: "#FF9800" },
          { name: "CETES", value: 10, color: "#4CAF50" },
          { name: "Efectivo", value: 5, color: "#9E9E9E" }
        ],
        instruments: [
          { name: "Afore XXI Banorte SB4", institution: "Afore XXI Banorte", return: "18.5%", risk: "Alto" },
          { name: "NAFTRAC ETF", institution: "BBVA México", return: "16.8%", risk: "Alto" },
          { name: "Fondo Fibra Uno", institution: "Santander México", return: "19.2%", risk: "Alto" },
          { name: "Nu Fondo Dinámico", institution: "Nu México", return: "15.5%", risk: "Medio-Alto" }
        ]
      };
    }
  };

  const portfolio = getPortfolio();

  if (!portfolio) {
    return (
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <p className="text-gray-300 text-center">
          Completa tu perfil para ver recomendaciones personalizadas
        </p>
      </Card>
    );
  }

  const Icon = portfolio.icon;
  const COLORS = portfolio.allocation.map(item => item.color);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className={`p-6 bg-gradient-to-r ${portfolio.color} border-none`}>
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Icon className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-white mb-2">{portfolio.name}</h2>
            <p className="text-white/90 text-sm mb-4">{portfolio.description}</p>
            <div className="flex gap-4">
              <div>
                <p className="text-white/80 text-xs mb-1">Retorno esperado</p>
                <p className="text-white flex items-center gap-1">
                  <ArrowUpRight size={16} />
                  {portfolio.expectedReturn}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-xs mb-1">Volatilidad</p>
                <p className="text-white">{portfolio.volatility}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Allocation Chart */}
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h3 className="text-white mb-6">Distribución de Activos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={portfolio.allocation}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {portfolio.allocation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: '#E5E7EB' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Instrumentos Recomendados */}
      <div>
        <h3 className="text-white mb-4 px-2">Instrumentos Específicos Recomendados</h3>
        <div className="space-y-3">
          {portfolio.instruments.map((instrument, index) => (
            <Card key={index} className="p-4 bg-gray-900/50 border-gray-800 hover:border-[#FF4D00]/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{instrument.name}</h4>
                  <p className="text-gray-300 text-sm">{instrument.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#FF4D00] flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    {instrument.return}
                  </p>
                  <p className="text-gray-400 text-xs">anual</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  instrument.risk === "Muy Bajo" || instrument.risk === "Bajo" 
                    ? "bg-green-900/30 text-green-400" 
                    : instrument.risk === "Medio" || instrument.risk === "Medio-Alto"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-red-900/30 text-red-400"
                }`}>
                  {instrument.risk}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Risk Notice */}
      <Card className="p-4 bg-[#FF4D00]/10 border-[#FF4D00]/30">
        <p className="text-sm text-gray-200">
          ⚠️ <strong className="text-white">Importante:</strong> Los rendimientos mostrados son históricos y no garantizan resultados futuros. 
          Considera diversificar tus inversiones y consultar con un asesor financiero certificado.
        </p>
      </Card>
    </div>
  );
}
