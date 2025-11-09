import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Target, TrendingUp, Calendar, AlertCircle } from "lucide-react";

export function GoalSimulator() {
  const [goal, setGoal] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [simulation, setSimulation] = useState<{
    months: number;
    totalSaved: number;
    interest: number;
  } | null>(null);

  const calculateGoal = () => {
    const goalAmount = parseFloat(goal);
    const monthly = parseFloat(monthlyAmount);
    
    if (goalAmount && monthly) {
      // Simulación simple con interés del 5% anual
      const monthlyInterest = 0.05 / 12;
      let months = 0;
      let accumulated = 0;
      
      while (accumulated < goalAmount && months < 360) {
        accumulated += monthly;
        accumulated *= (1 + monthlyInterest);
        months++;
      }
      
      setSimulation({
        months,
        totalSaved: goalAmount,
        interest: accumulated - (monthly * months)
      });
    }
  };

  const progressPercentage = simulation 
    ? Math.min((parseFloat(monthlyAmount) * 1) / parseFloat(goal) * 100, 100)
    : 0;

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 overflow-y-auto">
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-[#FF4D00]" size={24} />
            <h1 className="text-white">Simulador de Metas</h1>
          </div>
          <p className="text-gray-400">
            Calcula cuánto tiempo tardarás en alcanzar tu objetivo financiero
          </p>
        </div>

        {/* Input Form */}
        <Card className="p-6 mb-6 border-2 border-[#FF4D00]/30 bg-gray-900/50">
          <div className="space-y-5">
            <div>
              <Label htmlFor="goal" className="flex items-center gap-2 text-white mb-2">
                <Target size={18} className="text-[#FF4D00]" />
                Meta económica (MXN)
              </Label>
              <Input
                id="goal"
                type="number"
                placeholder="Ej: 50000"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="border-gray-700 bg-black/30 text-white"
              />
            </div>

            <div>
              <Label htmlFor="monthly" className="flex items-center gap-2 text-white mb-2">
                <TrendingUp size={18} className="text-[#FFB800]" />
                Aportación mensual (MXN)
              </Label>
              <Input
                id="monthly"
                type="number"
                placeholder="Ej: 1000"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                className="border-gray-700 bg-black/30 text-white"
              />
            </div>

            <Button 
              onClick={calculateGoal}
              className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white shadow-lg shadow-[#FF4D00]/30"
              disabled={!goal || !monthlyAmount}
            >
              Calcular proyección
            </Button>
          </div>
        </Card>

        {/* Results */}
        {simulation && (
          <div className="space-y-6">
            {/* ETA Card */}
            <Card className="p-6 bg-gradient-to-br from-[#FF4D00] to-[#E64500] text-white shadow-xl shadow-[#FF4D00]/30">
              <div className="text-center">
                <Calendar className="mx-auto mb-3" size={32} />
                <p className="mb-2 opacity-90">Alcanzarás tu meta en</p>
                <h2 className="mb-1">{simulation.months} meses</h2>
                <p className="opacity-90">
                  ({Math.floor(simulation.months / 12)} años y {simulation.months % 12} meses)
                </p>
              </div>
            </Card>

            {/* Progress Visualization */}
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-white mb-4">Progreso estimado</h3>
              <div className="relative">
                {/* Circular Progress */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="transform -rotate-90 w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#374151"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#FF4D00"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 88}`}
                        strokeDashoffset={`${2 * Math.PI * 88 * (1 - progressPercentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-3xl text-[#FF4D00]">{progressPercentage.toFixed(1)}%</p>
                      <p className="text-sm text-gray-400">Primer mes</p>
                    </div>
                  </div>
                </div>

                {/* Linear Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progreso mensual</span>
                    <span className="text-[#FF4D00]">${monthlyAmount}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
              </div>
            </Card>

            {/* Details */}
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-white mb-4">Detalles de tu ahorro</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Meta total</span>
                  <span className="text-white">${parseFloat(goal).toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Aportación mensual</span>
                  <span className="text-white">${parseFloat(monthlyAmount).toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Total aportado</span>
                  <span className="text-white">${(parseFloat(monthlyAmount) * simulation.months).toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Intereses generados</span>
                  <span className="text-[#FF4D00]">+${simulation.interest.toLocaleString('es-MX', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </Card>

            {/* Tip */}
            <Card className="p-4 bg-[#FF4D00]/10 border-[#FF4D00]/30">
              <div className="flex gap-3">
                <AlertCircle className="text-[#FF4D00] flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Consejo:</strong> Si aumentas tu aportación a ${Math.ceil(parseFloat(monthlyAmount) * 1.2)}/mes, 
                    alcanzarás tu meta en {Math.floor(simulation.months * 0.83)} meses.
                  </p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Modificar plan
              </Button>
              <Button className="bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white">
                Guardar proyección
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
