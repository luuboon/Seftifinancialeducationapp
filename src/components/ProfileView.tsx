import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ProfileData } from "./ProfileForm";
import { 
  User, Mail, DollarSign, Users, Target, TrendingUp, 
  Clock, MapPin, GraduationCap, Briefcase, PiggyBank, 
  CreditCard, Shield, Lightbulb, HeartHandshake, Building2,
  Smartphone, LogOut, Edit
} from "lucide-react";

interface ProfileViewProps {
  userEmail: string;
  userName: string;
  profileData: ProfileData;
  onLogout: () => void;
  onEdit: () => void;
}

export function ProfileView({ userEmail, userName, profileData, onLogout, onEdit }: ProfileViewProps) {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const getDisplayValue = (key: string, value: string): string => {
    const labels: { [key: string]: { [value: string]: string } } = {
      gender: {
        "masculino": "Masculino",
        "femenino": "Femenino",
        "otro": "Otro",
        "prefiero-no-decir": "Prefiero no decir"
      },
      maritalStatus: {
        "soltero": "Soltero(a)",
        "casado": "Casado(a)",
        "union-libre": "Unión libre",
        "divorciado": "Divorciado(a)",
        "viudo": "Viudo(a)"
      },
      educationLevel: {
        "primaria": "Primaria",
        "secundaria": "Secundaria",
        "preparatoria": "Preparatoria",
        "carrera-tecnica": "Carrera técnica",
        "universidad": "Universidad",
        "posgrado": "Posgrado"
      },
      occupation: {
        "empleado-formal": "Empleado formal",
        "empleado-informal": "Empleado informal",
        "comerciante": "Comerciante",
        "emprendedor": "Emprendedor/Negocio propio",
        "freelance": "Freelance/Independiente",
        "estudiante": "Estudiante",
        "desempleado": "Desempleado",
        "otro": "Otro"
      },
      hasCurrentSavings: {
        "si": "Sí",
        "no": "No"
      },
      savingsType: {
        "efectivo": "Efectivo en casa",
        "cuenta-banco": "Cuenta bancaria",
        "cooperativa": "Cooperativa",
        "afore": "AFORE",
        "cetes": "CETES",
        "inversion": "Inversiones (fondos, acciones)",
        "otro": "Otro"
      },
      hasDebts: {
        "si": "Sí",
        "no": "No"
      },
      debtPercentage: {
        "menos-10": "Menos del 10%",
        "10-25": "Entre 10% y 25%",
        "25-50": "Entre 25% y 50%",
        "mas-50": "Más del 50%"
      },
      hasSocialSecurity: {
        "imss": "IMSS",
        "issste": "ISSSTE",
        "otro": "Otro",
        "no": "No"
      },
      goal: {
        "ahorrar": "Ahorrar para emergencias",
        "invertir": "Invertir y hacer crecer mi dinero",
        "retiro": "Asegurar mi retiro",
        "vivienda": "Comprar vivienda",
        "negocio": "Iniciar un negocio",
        "educacion": "Pagar educación",
        "salir-deudas": "Salir de deudas"
      },
      riskTolerance: {
        "conservador": "Conservador",
        "moderado": "Moderado",
        "agresivo": "Arriesgado"
      },
      investmentHorizon: {
        "corto": "Menos de 1 año",
        "medio-corto": "1 a 3 años",
        "medio": "3 a 5 años",
        "medio-largo": "5 a 10 años",
        "largo": "Más de 10 años"
      },
      financialKnowledge: {
        "nada": "Principiante",
        "basico": "Básico",
        "intermedio": "Intermedio",
        "avanzado": "Avanzado"
      },
      contributionFrequency: {
        "semanal": "Semanal",
        "quincenal": "Quincenal",
        "mensual": "Mensual",
        "trimestral": "Trimestral",
        "anual": "Anual",
        "eventual": "Eventual"
      },
      preferredInstruments: {
        "ahorro": "Cuentas de ahorro",
        "bonos": "Bonos gubernamentales (CETES)",
        "fondos": "Fondos de inversión",
        "afore": "AFORE",
        "acciones": "Acciones",
        "mixto": "Combinación de varios",
        "no-se": "Necesito orientación"
      },
      familySupport: {
        "si": "Sí, me apoyan",
        "parcial": "A veces",
        "no": "No me apoyan",
        "independiente": "Soy independiente"
      },
      institutionalTrust: {
        "alta": "Confío en bancos",
        "media": "Confío con reservas",
        "baja": "Prefiero guardar por mi cuenta"
      },
      hasDigitalAccess: {
        "si": "Sí, acceso regular",
        "limitado": "Sí, pero limitado",
        "no": "No tengo acceso regular"
      }
    };

    return labels[key]?.[value] || value;
  };

  const getRiskColor = (risk: string) => {
    if (risk === "conservador") return "text-blue-400";
    if (risk === "moderado") return "text-[#FFB800]";
    return "text-[#FF4D00]";
  };

  if (showConfirmLogout) {
    return (
      <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 flex items-center justify-center px-6">
        <Card className="p-6 bg-gray-900/50 border-gray-800 max-w-md w-full">
          <h2 className="text-white text-xl mb-4">¿Cerrar sesión?</h2>
          <p className="text-gray-200 mb-6">
            ¿Estás seguro que deseas cerrar sesión? Podrás volver a iniciar en cualquier momento.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowConfirmLogout(false)}
              variant="outline"
              className="flex-1 border-gray-700 text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={onLogout}
              className="flex-1 bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white"
            >
              Sí, cerrar sesión
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 overflow-y-auto">
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white mb-2">Mi Perfil</h1>
          <p className="text-gray-200">Información personal y financiera</p>
        </div>

        {/* User Info Card */}
        <Card className="p-5 mb-4 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF4D00]/20 p-3 rounded-full">
                <User size={24} className="text-[#FF4D00]" />
              </div>
              <div>
                <h2 className="text-white">{userName}</h2>
                <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                  <Mail size={14} />
                  {userEmail}
                </div>
              </div>
            </div>
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Edit size={16} className="mr-1" />
              Editar
            </Button>
          </div>
        </Card>

        {/* Información Personal */}
        <div className="mb-6">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <User size={20} className="text-[#FF4D00]" />
            Información Personal
          </h3>
          <div className="grid gap-3">
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Edad</span>
                <span className="text-white">{profileData.age} años</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Género</span>
                <span className="text-white">{getDisplayValue("gender", profileData.gender)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Estado civil</span>
                <span className="text-white">{getDisplayValue("maritalStatus", profileData.maritalStatus)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Dependientes</span>
                <span className="text-white">{profileData.dependents === "0" ? "Ninguno" : profileData.dependents}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Nivel educativo</span>
                <span className="text-white">{getDisplayValue("educationLevel", profileData.educationLevel)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Región</span>
                <span className="text-white capitalize">{profileData.region.replace("-", " ")}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Ocupación</span>
                <span className="text-white">{getDisplayValue("occupation", profileData.occupation)}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Situación Financiera */}
        <div className="mb-6">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <DollarSign size={20} className="text-[#FFB800]" />
            Situación Financiera
          </h3>
          <div className="grid gap-3">
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Ingresos mensuales</span>
                <span className="text-white">${parseInt(profileData.income).toLocaleString('es-MX')} MXN</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gastos fijos</span>
                <span className="text-white">${parseInt(profileData.fixedExpenses).toLocaleString('es-MX')} MXN</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Capacidad de ahorro</span>
                <span className="text-[#FFB800]">
                  ${(parseInt(profileData.income) - parseInt(profileData.fixedExpenses)).toLocaleString('es-MX')} MXN
                </span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">¿Tiene ahorros?</span>
                <span className="text-white">{getDisplayValue("hasCurrentSavings", profileData.hasCurrentSavings)}</span>
              </div>
            </Card>
            {profileData.hasCurrentSavings === "si" && (
              <Card className="p-4 bg-gray-900/30 border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tipo de ahorro</span>
                  <span className="text-white">{getDisplayValue("savingsType", profileData.savingsType)}</span>
                </div>
              </Card>
            )}
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">¿Tiene deudas?</span>
                <span className="text-white">{getDisplayValue("hasDebts", profileData.hasDebts)}</span>
              </div>
            </Card>
            {profileData.hasDebts === "si" && (
              <Card className="p-4 bg-gray-900/30 border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Porcentaje de deudas</span>
                  <span className="text-white">{getDisplayValue("debtPercentage", profileData.debtPercentage)}</span>
                </div>
              </Card>
            )}
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Seguridad social</span>
                <span className="text-white">{getDisplayValue("hasSocialSecurity", profileData.hasSocialSecurity)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Meta principal</span>
                <span className="text-white">{getDisplayValue("goal", profileData.goal)}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Perfil de Inversión */}
        <div className="mb-6">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#FF4D00]" />
            Perfil de Inversión
          </h3>
          <div className="grid gap-3">
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tolerancia al riesgo</span>
                <span className={`${getRiskColor(profileData.riskTolerance)}`}>
                  {getDisplayValue("riskTolerance", profileData.riskTolerance)}
                </span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Horizonte de inversión</span>
                <span className="text-white">{getDisplayValue("investmentHorizon", profileData.investmentHorizon)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Conocimientos financieros</span>
                <span className="text-white">{getDisplayValue("financialKnowledge", profileData.financialKnowledge)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Frecuencia de aportación</span>
                <span className="text-white">{getDisplayValue("contributionFrequency", profileData.contributionFrequency)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                <span className="text-gray-400">Instrumentos preferidos</span>
                <span className="text-white text-right">{getDisplayValue("preferredInstruments", profileData.preferredInstruments)}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Contexto */}
        <div className="mb-6">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <HeartHandshake size={20} className="text-[#FFB800]" />
            Contexto Personal
          </h3>
          <div className="grid gap-3">
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Apoyo familiar</span>
                <span className="text-white">{getDisplayValue("familySupport", profileData.familySupport)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Confianza institucional</span>
                <span className="text-white">{getDisplayValue("institutionalTrust", profileData.institutionalTrust)}</span>
              </div>
            </Card>
            <Card className="p-4 bg-gray-900/30 border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Acceso digital</span>
                <span className="text-white">{getDisplayValue("hasDigitalAccess", profileData.hasDigitalAccess)}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={() => setShowConfirmLogout(true)}
          variant="outline"
          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 py-6 rounded-xl"
        >
          <LogOut className="mr-2" size={20} />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
