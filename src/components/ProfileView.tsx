import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ProfileData } from "./ProfileForm";
import { 
  User, Mail, DollarSign, Users, Target, TrendingUp, 
  Clock, MapPin, GraduationCap, Briefcase, PiggyBank, 
  CreditCard, Shield, Lightbulb, HeartHandshake, Building2,
  Smartphone, LogOut, Edit, Download, Calendar, RefreshCw, Sparkles
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
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

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

  const generatePDF = () => {
    // Crear el contenido del PDF
    const content = `
SEFTI - PORTAFOLIO DE INVERSIÓN PERSONALIZADO
==============================================

INFORMACIÓN DEL CLIENTE
-----------------------
Nombre: ${userName}
Email: ${userEmail}
Fecha de generación: ${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

PERFIL FINANCIERO
-----------------
Edad: ${profileData.age} años
Ingresos mensuales: $${parseInt(profileData.income).toLocaleString('es-MX')} MXN
Gastos fijos: $${parseInt(profileData.fixedExpenses).toLocaleString('es-MX')} MXN
Capacidad de ahorro: $${(parseInt(profileData.income) - parseInt(profileData.fixedExpenses)).toLocaleString('es-MX')} MXN

PERFIL DE INVERSIÓN
-------------------
Tolerancia al riesgo: ${getDisplayValue("riskTolerance", profileData.riskTolerance)}
Horizonte de inversión: ${getDisplayValue("investmentHorizon", profileData.investmentHorizon)}
Conocimientos financieros: ${getDisplayValue("financialKnowledge", profileData.financialKnowledge)}
Meta principal: ${getDisplayValue("goal", profileData.goal)}

RECOMENDACIONES PERSONALIZADAS
-------------------------------
Basado en tu perfil ${profileData.riskTolerance}, te recomendamos:

${profileData.riskTolerance === "conservador" ? `
1. CETES (70%): Inversión segura gubernamental con rendimiento garantizado
2. Cuenta de ahorro de alto rendimiento (20%): Liquidez inmediata
3. Fondo de inversión de bajo riesgo (10%): Diversificación moderada

Rendimiento esperado: 6-8% anual
Riesgo: Bajo
` : profileData.riskTolerance === "moderado" ? `
1. Fondos de inversión mixtos (50%): Balance entre riesgo y rendimiento
2. CETES y bonos (30%): Seguridad y estabilidad
3. ETFs de mercado (20%): Crecimiento a largo plazo

Rendimiento esperado: 9-12% anual
Riesgo: Medio
` : `
1. ETFs y acciones (60%): Alto potencial de crecimiento
2. Fondos de inversión agresivos (25%): Diversificación activa
3. CETES (15%): Reserva de emergencia

Rendimiento esperado: 12-18% anual
Riesgo: Alto
`}

PLAN DE ACCIÓN
--------------
1. Establece un fondo de emergencia de 3-6 meses de gastos
2. Contribuye regularmente ${profileData.contributionFrequency}
3. Revisa tu portafolio trimestralmente
4. Ajusta según cambios en el mercado

IMPORTANTE
----------
Este portafolio es válido de lunes a viernes de la semana actual.
Los datos se actualizan cada semana según el mercado real.
Consulta con un asesor financiero certificado antes de invertir.

© ${new Date().getFullYear()} SEFTI - Educación Financiera
    `.trim();

    // Crear y descargar el archivo
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `SEFTI-Portafolio-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handlePaymentSubmit = () => {
    // Validar datos del formulario
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Simular procesamiento de pago
    alert("✅ Pago procesado exitosamente. Descargando tu portafolio personalizado...");
    
    // Generar y descargar el PDF
    generatePDF();
    
    // Cerrar diálogos
    setShowPaymentForm(false);
    setShowPremiumDialog(false);
    
    // Limpiar formulario
    setPaymentData({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: ""
    });
  };

  if (showPremiumDialog) {
    if (showPaymentForm) {
      // Formulario de pago
      return (
        <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 flex items-center justify-center px-6 overflow-y-auto">
          <Card className="p-6 bg-gray-900/50 border-gray-800 max-w-md w-full border-[#FF4D00]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FF4D00]/20 p-3 rounded-full">
                <CreditCard size={24} className="text-[#FF4D00]" />
              </div>
              <div>
                <h2 className="text-white text-xl">Información de Pago</h2>
                <p className="text-gray-400 text-sm">Pago seguro simulado</p>
              </div>
            </div>

            <div className="bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-lg p-3 mb-6 flex items-center justify-between">
              <span className="text-white">Total a pagar</span>
              <span className="text-[#FF4D00] text-2xl font-bold">$250 MXN</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-white text-sm mb-2 block">Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={paymentData.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                    setPaymentData({...paymentData, cardNumber: value});
                  }}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4D00] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Nombre en la tarjeta</label>
                <input
                  type="text"
                  placeholder="JUAN PÉREZ"
                  value={paymentData.cardName}
                  onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value.toUpperCase()})}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4D00] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Vencimiento</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    maxLength={5}
                    value={paymentData.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setPaymentData({...paymentData, expiryDate: value});
                    }}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4D00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/\D/g, '')})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4D00] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3 mb-6">
              <p className="text-blue-200 text-xs">
                <strong>Modo simulado:</strong> Esta es una transacción de prueba. No se realizará ningún cargo real.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowPaymentForm(false);
                  setPaymentData({cardNumber: "", cardName: "", expiryDate: "", cvv: ""});
                }}
                variant="outline"
                className="flex-1 border-gray-700 text-white hover:bg-gray-800"
              >
                Atrás
              </Button>
              <Button
                onClick={handlePaymentSubmit}
                className="flex-1 bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white"
              >
                Confirmar pago
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    // Vista inicial de información
    return (
      <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 flex items-center justify-center px-6 overflow-y-auto">
        <Card className="p-6 bg-gray-900/50 border-gray-800 max-w-md w-full border-[#FF4D00]/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF4D00]/20 p-3 rounded-full">
              <Sparkles size={24} className="text-[#FF4D00]" />
            </div>
            <h2 className="text-white text-xl">Portafolio Premium</h2>
          </div>
          
          <p className="text-gray-200 mb-4">
            Descarga tu portafolio de inversión o plan de retiro personalizado basado en tu perfil financiero.
          </p>

          <div className="bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">Precio especial</span>
              <span className="text-[#FF4D00] text-2xl font-bold">$250 MXN</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-gray-300">
                <Calendar size={16} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Vigencia:</strong> De lunes a viernes</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <RefreshCw size={16} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Actualización:</strong> El mercado se reinicia cada semana y los datos de proyección deben reentrenarse según el mercado real</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <Download size={16} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Incluye:</strong> Portafolio personalizado en PDF con recomendaciones y proyecciones</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 mb-6">
            <p className="text-yellow-200 text-xs">
              <strong>Nota importante:</strong> Debido a la volatilidad del mercado, las proyecciones son válidas únicamente de lunes a viernes. Cada fin de semana el sistema se actualiza con los datos más recientes del mercado financiero mexicano.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowPremiumDialog(false)}
              variant="outline"
              className="flex-1 border-gray-700 text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setShowPaymentForm(true)}
              className="flex-1 bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white"
            >
              Continuar al pago
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
              className=" border-red-500/30 text-red-400 hover:bg-red-500/10 py-6 rounded-xl"
            >
              <Edit size={16} className="mr-1" />
              Editar
            </Button>
          </div>
        </Card>

        {/* Premium Section */}
        <div className="mb-6">
          <Card className="p-6 bg-gradient-to-br from-[#FF4D00]/10 to-[#E64500]/10 border-[#FF4D00]/50 border-2 relative overflow-hidden">
            {/* Badge Premium */}
            <div className="absolute top-3 right-3">
              <div className="bg-[#FFB800] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={12} />
                PREMIUM
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#FF4D00]/20 p-4 rounded-2xl">
                <Download size={32} className="text-[#FF4D00]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold mb-2">
                  Portafolio Personalizado
                </h3>
                <p className="text-gray-300 text-sm">
                  Descarga tu plan de inversión o retiro personalizado según tu perfil financiero
                </p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-[#FFB800]" />
                <span className="text-gray-200">
                  <strong className="text-white">Vigencia:</strong> Lunes a viernes
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw size={16} className="text-[#FFB800]" />
                <span className="text-gray-200">
                  <strong className="text-white">Actualización:</strong> Datos reentrenados semanalmente
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={16} className="text-[#FFB800]" />
                <span className="text-gray-200">
                  <strong className="text-white">Incluye:</strong> Proyecciones basadas en el mercado real
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">Precio especial</div>
                <div className="text-[#FF4D00] text-3xl font-bold">$250 <span className="text-lg">MXN</span></div>
              </div>
              <Button
                onClick={() => setShowPremiumDialog(true)}
                className="bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white px-6 py-6 shadow-lg shadow-[#FF4D00]/30"
              >
                <Download className="mr-2" size={18} />
                Obtener ahora
              </Button>
            </div>
          </Card>
        </div>

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
