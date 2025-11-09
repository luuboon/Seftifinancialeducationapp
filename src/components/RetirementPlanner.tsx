import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts";
import { Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { ProfileData } from "./ProfileForm";
import { useState } from "react";

interface RetirementPlannerProps {
  profile: ProfileData | null;
}

export function RetirementPlanner({ profile }: RetirementPlannerProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const calculateRetirementPlan = () => {
    if (!profile) return null;

    const currentAge = parseInt(profile.age) || 30;
    const monthlyIncome = parseInt(profile.income) || 8000;
    const dependents = profile.dependents || "0";
    const goal = profile.goal || "";
    const riskProfile = profile.riskTolerance || "moderado";

    // Calcular edad de retiro sugerida
    const retirementAge = goal.includes("corto") ? currentAge + 7 
                        : goal.includes("medio") ? currentAge + 15 
                        : 65;
    
    const yearsUntilRetirement = retirementAge - currentAge;

    // Calcular aportación mensual sugerida (según dependientes)
    const dependentFactor = dependents === "0" ? 0.15 
                          : dependents === "1-2" ? 0.12 
                          : dependents === "3-4" ? 0.10 
                          : 0.08;
    
    const suggestedMonthlyContribution = Math.round(monthlyIncome * dependentFactor);

    // Calcular retornos según perfil de riesgo
    const annualReturn = riskProfile === "conservador" ? 0.07 
                       : riskProfile === "moderado" ? 0.11 
                       : 0.16;

    // Cálculo del fondo de retiro (con interés compuesto)
    const monthlyReturn = annualReturn / 12;
    const totalMonths = yearsUntilRetirement * 12;
    
    const futureValue = suggestedMonthlyContribution * 
      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);

    // Ingreso mensual estimado en el retiro (usando la regla del 4%)
    const monthlyRetirementIncome = Math.round((futureValue * 0.04) / 12);

    // Proyección año por año
    const yearlyProjection = [];
    for (let year = 1; year <= Math.min(yearsUntilRetirement, 30); year++) {
      const months = year * 12;
      const accumulated = suggestedMonthlyContribution * 
        ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
      
      yearlyProjection.push({
        year: currentAge + year,
        edad: `${currentAge + year} años`,
        acumulado: Math.round(accumulated),
        aportaciones: suggestedMonthlyContribution * months,
        rendimientos: Math.round(accumulated - (suggestedMonthlyContribution * months))
      });
    }

    // Planes alternativos
    const alternativePlans = [
      {
        id: "optimista",
        name: "Plan Optimista",
        monthlyContribution: Math.round(suggestedMonthlyContribution * 1.5),
        finalAmount: Math.round(futureValue * 1.5),
        monthlyIncome: Math.round(monthlyRetirementIncome * 1.5),
        description: "Aumentando tu aportación un 50%"
      },
      {
        id: "base",
        name: "Plan Recomendado",
        monthlyContribution: suggestedMonthlyContribution,
        finalAmount: Math.round(futureValue),
        monthlyIncome: monthlyRetirementIncome,
        description: "Basado en tu perfil actual"
      },
      {
        id: "minimo",
        name: "Plan Mínimo",
        monthlyContribution: Math.round(suggestedMonthlyContribution * 0.6),
        finalAmount: Math.round(futureValue * 0.6),
        monthlyIncome: Math.round(monthlyRetirementIncome * 0.6),
        description: "Aportación reducida al 60%"
      }
    ];

    return {
      currentAge,
      retirementAge,
      yearsUntilRetirement,
      suggestedMonthlyContribution,
      futureValue: Math.round(futureValue),
      monthlyRetirementIncome,
      annualReturn: (annualReturn * 100).toFixed(1),
      yearlyProjection,
      alternativePlans,
      riskProfile
    };
  };

  const plan = calculateRetirementPlan();

  if (!plan) {
    return (
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <p className="text-gray-400 text-center">
          Completa tu perfil para calcular tu plan de retiro personalizado
        </p>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Resumen Principal */}
      <Card className="p-6 bg-gradient-to-br from-[#FF4D00] to-[#E64500] border-none">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Calendar className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-white">Tu Plan de Retiro Personalizado</h2>
            <p className="text-white/80 text-sm">Basado en tu perfil {plan.riskProfile}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Edad de retiro</p>
            <p className="text-white text-2xl">{plan.retirementAge}</p>
            <p className="text-white/60 text-xs">en {plan.yearsUntilRetirement} años</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Fondo proyectado</p>
            <p className="text-white text-2xl">{formatCurrency(plan.futureValue)}</p>
            <p className="text-white/60 text-xs">al retiro</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Aportación mensual</p>
            <p className="text-white text-2xl">{formatCurrency(plan.suggestedMonthlyContribution)}</p>
            <p className="text-white/60 text-xs">sugerida</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Ingreso en retiro</p>
            <p className="text-white text-2xl">{formatCurrency(plan.monthlyRetirementIncome)}</p>
            <p className="text-white/60 text-xs">por mes</p>
          </div>
        </div>
      </Card>

      {/* Planes Alternativos */}
      <div>
        <h3 className="text-white mb-4 px-2">Compara Diferentes Escenarios</h3>
        <div className="grid gap-3">
          {plan.alternativePlans.map((altPlan) => (
            <Card 
              key={altPlan.id}
              className={`p-5 cursor-pointer transition-all ${
                selectedPlan === altPlan.id 
                  ? "bg-[#FF4D00]/20 border-[#FF4D00]" 
                  : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
              }`}
              onClick={() => setSelectedPlan(selectedPlan === altPlan.id ? null : altPlan.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{altPlan.name}</h4>
                  <p className="text-gray-400 text-sm">{altPlan.description}</p>
                </div>
                {altPlan.id === "base" && (
                  <span className="bg-[#FF4D00] text-white text-xs px-2 py-1 rounded">
                    Recomendado
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Mensual</p>
                  <p className="text-white text-sm">{formatCurrency(altPlan.monthlyContribution)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Total al retiro</p>
                  <p className="text-[#FF4D00] text-sm">{formatCurrency(altPlan.finalAmount)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Ingreso retiro</p>
                  <p className="text-white text-sm">{formatCurrency(altPlan.monthlyIncome)}/mes</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Proyección Gráfica */}
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h3 className="text-white mb-4">Proyección de Crecimiento</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={plan.yearlyProjection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="edad" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Line 
              type="monotone" 
              dataKey="acumulado" 
              stroke="#FF4D00" 
              strokeWidth={3}
              name="Total Acumulado"
              dot={{ fill: '#FF4D00', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="rendimientos" 
              stroke="#FFB800" 
              strokeWidth={2}
              name="Rendimientos"
              dot={{ fill: '#FFB800', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Desglose Detallado */}
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h3 className="text-white mb-4">Proyección Año por Año</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={plan.yearlyProjection.filter((_, i) => i % 3 === 0)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Bar dataKey="aportaciones" fill="#6366f1" name="Tus Aportaciones" />
            <Bar dataKey="rendimientos" fill="#FF4D00" name="Rendimientos Generados" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recomendaciones */}
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle className="text-green-500 mt-1" size={20} />
          <div>
            <h4 className="text-white mb-2">Recomendaciones para tu Plan</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-[#FF4D00] mt-0.5 flex-shrink-0" size={16} />
                <span>Abre una cuenta de Afore si aún no tienes una. La Afore XXI Banorte ofrece {plan.annualReturn}% de rendimiento promedio.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-[#FF4D00] mt-0.5 flex-shrink-0" size={16} />
                <span>Considera hacer aportaciones voluntarias mensuales de {formatCurrency(plan.suggestedMonthlyContribution)} para alcanzar tu meta.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-[#FF4D00] mt-0.5 flex-shrink-0" size={16} />
                <span>Revisa tu Afore cada 6 meses y considera cambiar si otra ofrece mejores rendimientos.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-[#FF4D00] mt-0.5 flex-shrink-0" size={16} />
                <span>Diversifica con instrumentos como CETES o Hey Banco para tener liquidez de emergencia.</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Advertencia */}
      <Card className="p-4 bg-yellow-900/20 border-yellow-700/50">
        <div className="flex gap-3">
          <AlertCircle className="text-yellow-400 flex-shrink-0" size={20} />
          <p className="text-sm text-gray-200">
            <strong className="text-white">Nota importante:</strong> Esta proyección es ilustrativa y asume rendimientos constantes. 
            Los resultados reales pueden variar según las condiciones del mercado. Te recomendamos consultar con un asesor certificado.
          </p>
        </div>
      </Card>
    </div>
  );
}
