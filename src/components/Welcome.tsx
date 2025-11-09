import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { GraduationCap, PieChart, Calendar, TrendingUp, DollarSign, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProfileData } from "./ProfileForm";
import { Card } from "./ui/card";

interface WelcomeProps {
  onNavigate: (screen: string) => void;
  userName?: string;
  profileData?: ProfileData;
}

export function Welcome({ onNavigate, userName, profileData }: WelcomeProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  const getRiskProfileText = (risk?: string) => {
    if (risk === "conservador") return "conservador";
    if (risk === "moderado") return "moderado";
    return "arriesgado";
  };

  const getGoalText = (goal?: string) => {
    const goals: { [key: string]: string } = {
      "ahorrar": "ahorrar para emergencias",
      "invertir": "hacer crecer tu dinero",
      "retiro": "asegurar tu retiro",
      "vivienda": "comprar vivienda",
      "negocio": "iniciar un negocio",
      "educacion": "pagar educación",
      "salir-deudas": "salir de deudas"
    };
    return goals[goal || ""] || "alcanzar tus metas";
  };

  const calculateSavingsCapacity = () => {
    if (!profileData) return 0;
    return parseInt(profileData.income) - parseInt(profileData.fixedExpenses);
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        {userName ? (
          <div>
            <h1 className="text-white mb-2">{getGreeting()}, {userName}</h1>
            <p className="text-gray-200">
              {profileData ? (
                <>
                  Tu perfil {getRiskProfileText(profileData.riskTolerance)} está listo para {getGoalText(profileData.goal)}
                </>
              ) : (
                "Bienvenido a tu asistente financiero personal"
              )}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size="large" />
            </div>
            <h1 className="text-white mb-2">SEFTI</h1>
            <p className="text-gray-400">Sistema de Educación Financiera para Trabajadores e Inversiones</p>
          </div>
        )}
      </div>

      {/* Quick Stats (solo si hay perfil) */}
      {profileData && (
        <div className="px-6 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-[#FF4D00]/20 to-transparent border-[#FF4D00]/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={16} className="text-[#FF4D00]" />
                <span className="text-gray-300 text-sm">Capacidad de ahorro</span>
              </div>
              <p className="text-white text-xl">${calculateSavingsCapacity().toLocaleString('es-MX')}</p>
              <p className="text-gray-400 text-xs mt-1">MXN/mes</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-[#FFB800]/20 to-transparent border-[#FFB800]/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#FFB800]" />
                <span className="text-gray-300 text-sm">Perfil</span>
              </div>
              <p className="text-white text-xl capitalize">{getRiskProfileText(profileData.riskTolerance)}</p>
              <p className="text-gray-400 text-xs mt-1">Riesgo de inversión</p>
            </Card>
          </div>
        </div>
      )}

      {/* Hero Image */}
      {!userName && (
        <div className="px-6 mb-8">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1591030288156-ededef494ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMG1leGljYW4lMjBmYW1pbHl8ZW58MXx8fHwxNzYyNjI5NzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Familia feliz"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      )}

      {/* Welcome Message */}
      <div className="px-6 mb-8">
        {userName ? (
          <>
            <h2 className="text-white mb-3">¿Qué quieres hacer hoy?</h2>
            <p className="text-gray-300">
              Explora tus opciones personalizadas de inversión, planifica tu futuro o aprende más sobre finanzas.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-white mb-3">¡Construye tu futuro financiero!</h2>
            <p className="text-gray-400">
              Descubre portafolios de inversión personalizados, planifica tu retiro según tu edad y perfil de riesgo, 
              y aprende a hacer crecer tu patrimonio con asesoría inteligente.
            </p>
          </>
        )}
      </div>

      {/* Main Actions */}
      <div className="px-6 space-y-4">
        <Button 
          onClick={() => onNavigate("recommendations")}
          className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl flex items-center justify-between shadow-lg shadow-[#FF4D00]/20"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <PieChart size={24} />
            </div>
            <span>{userName ? "Mi portafolio de inversión" : "Ver portafolio de inversión"}</span>
          </div>
        </Button>

        <Button 
          onClick={() => onNavigate("recommendations")}
          className="w-full bg-gradient-to-r from-[#FFB800] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FF6B00] text-white py-6 rounded-xl flex items-center justify-between shadow-lg shadow-[#FFB800]/20"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Calendar size={24} />
            </div>
            <span>{userName ? "Mi plan de retiro" : "Planificar mi retiro"}</span>
          </div>
        </Button>

        <Button 
          onClick={() => onNavigate("learn")}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 rounded-xl flex items-center justify-between border border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
              <GraduationCap size={24} className="text-[#FF4D00]" />
            </div>
            <span>Aprende sobre finanzas</span>
          </div>
        </Button>
      </div>

      {/* Goal reminder (solo si hay perfil) */}
      {profileData && (
        <div className="px-6 mt-8">
          <Card className="bg-gradient-to-r from-[#FF4D00]/10 to-red-900/20 border border-[#FF4D00]/30 p-6">
            <div className="flex items-start gap-3">
              <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                <Target size={20} className="text-[#FF4D00]" />
              </div>
              <div>
                <h3 className="text-white mb-1">Tu meta principal</h3>
                <p className="text-gray-200 capitalize">{getGoalText(profileData.goal)}</p>
                <p className="text-gray-400 text-sm mt-2">
                  Hemos personalizado tus recomendaciones para ayudarte a alcanzarla.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Get Started CTA (solo si no hay usuario) */}
      {!userName && (
        <div className="px-6 mt-8">
          <div className="bg-gradient-to-r from-[#FF4D00]/10 to-red-900/20 border border-[#FF4D00]/30 rounded-xl p-6 text-center">
            <p className="text-gray-300 mb-4">¿Primera vez usando SEFTI?</p>
            <Button 
              onClick={() => onNavigate("profile")}
              variant="outline" 
              className="border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00] hover:text-white"
            >
              Crea tu perfil financiero
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
