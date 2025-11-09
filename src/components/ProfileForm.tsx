import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, DollarSign, Users, Target, Sparkles, MapPin, GraduationCap, Briefcase, PiggyBank, CreditCard, Shield, TrendingUp, Clock, Lightbulb, HeartHandshake, Building2, Smartphone, ChevronRight, ChevronLeft } from "lucide-react";
import { Card } from "./ui/card";

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void;
  initialData?: ProfileData;
}

export interface ProfileData {
  // Información demográfica
  age: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  educationLevel: string;
  region: string;
  occupation: string;
  income: string;
  fixedExpenses: string;
  
  // Información financiera
  hasCurrentSavings: string;
  savingsType: string;
  hasDebts: string;
  debtPercentage: string;
  hasSocialSecurity: string;
  goal: string;
  
  // Perfil de inversión
  riskTolerance: string;
  investmentHorizon: string;
  financialKnowledge: string;
  contributionFrequency: string;
  preferredInstruments: string;
  
  // Información contextual
  familySupport: string;
  institutionalTrust: string;
  hasDigitalAccess: string;
}

export function ProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const [currentStep, setCurrentStep] = useState("personal");
  const [formData, setFormData] = useState<ProfileData>(initialData || {
    age: "",
    gender: "",
    maritalStatus: "",
    dependents: "",
    educationLevel: "",
    region: "",
    occupation: "",
    income: "",
    fixedExpenses: "",
    hasCurrentSavings: "",
    savingsType: "",
    hasDebts: "",
    debtPercentage: "",
    hasSocialSecurity: "",
    goal: "",
    riskTolerance: "",
    investmentHorizon: "",
    financialKnowledge: "",
    contributionFrequency: "",
    preferredInstruments: "",
    familySupport: "",
    institutionalTrust: "",
    hasDigitalAccess: "si"
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateStep = (step: string): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === "personal") {
      const age = parseInt(formData.age);
      if (age < 18) {
        newErrors.age = "Debes tener al menos 18 años";
      } else if (age > 100) {
        newErrors.age = "Por favor ingresa una edad válida";
      }
      
      if (!formData.gender) newErrors.gender = "Campo requerido";
      if (!formData.maritalStatus) newErrors.maritalStatus = "Campo requerido";
      if (!formData.dependents) newErrors.dependents = "Campo requerido";
      if (!formData.educationLevel) newErrors.educationLevel = "Campo requerido";
      if (!formData.region) newErrors.region = "Campo requerido";
      if (!formData.occupation) newErrors.occupation = "Campo requerido";
    }
    
    if (step === "financial") {
      const income = parseInt(formData.income);
      if (income < 100) {
        newErrors.income = "Por favor ingresa un ingreso válido";
      }
      
      const fixedExpenses = parseInt(formData.fixedExpenses);
      if (fixedExpenses < 0) {
        newErrors.fixedExpenses = "Los gastos no pueden ser negativos";
      }
      
      if (!formData.hasCurrentSavings) newErrors.hasCurrentSavings = "Campo requerido";
      if (formData.hasCurrentSavings === "si" && !formData.savingsType) {
        newErrors.savingsType = "Por favor indica dónde tienes tus ahorros";
      }
      if (!formData.hasDebts) newErrors.hasDebts = "Campo requerido";
      if (formData.hasDebts === "si" && !formData.debtPercentage) {
        newErrors.debtPercentage = "Por favor indica el porcentaje de tus ingresos que destinas a deudas";
      }
      if (!formData.hasSocialSecurity) newErrors.hasSocialSecurity = "Campo requerido";
      if (!formData.goal) newErrors.goal = "Campo requerido";
    }
    
    if (step === "investment") {
      if (!formData.riskTolerance) newErrors.riskTolerance = "Campo requerido";
      if (!formData.investmentHorizon) newErrors.investmentHorizon = "Campo requerido";
      if (!formData.financialKnowledge) newErrors.financialKnowledge = "Campo requerido";
      if (!formData.contributionFrequency) newErrors.contributionFrequency = "Campo requerido";
      if (!formData.preferredInstruments) newErrors.preferredInstruments = "Campo requerido";
    }
    
    if (step === "context") {
      if (!formData.familySupport) newErrors.familySupport = "Campo requerido";
      if (!formData.institutionalTrust) newErrors.institutionalTrust = "Campo requerido";
      if (!formData.hasDigitalAccess) newErrors.hasDigitalAccess = "Campo requerido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (nextStep: string) => {
    if (validateStep(currentStep)) {
      setCurrentStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep("context")) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 overflow-y-auto">
      <div className="px-6 pt-8">
        <div className="mb-6">
          <h1 className="text-white mb-2">Tu Perfil Financiero</h1>
          <p className="text-gray-200">Ayúdanos a conocerte mejor para darte recomendaciones personalizadas</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className={`flex items-center gap-2 ${currentStep === "personal" ? "text-[#FF4D00]" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "personal" ? "bg-[#FF4D00] text-white" : "bg-gray-800 text-gray-400"}`}>1</div>
              <span className="text-xs hidden sm:inline">Personal</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${["financial", "investment", "context"].includes(currentStep) ? "bg-[#FF4D00]" : "bg-gray-800"}`} />
            <div className={`flex items-center gap-2 ${currentStep === "financial" ? "text-[#FF4D00]" : currentStep === "personal" ? "text-gray-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "financial" ? "bg-[#FF4D00] text-white" : ["investment", "context"].includes(currentStep) ? "bg-[#FFB800] text-white" : "bg-gray-800 text-gray-400"}`}>2</div>
              <span className="text-xs hidden sm:inline">Finanzas</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${["investment", "context"].includes(currentStep) ? "bg-[#FF4D00]" : "bg-gray-800"}`} />
            <div className={`flex items-center gap-2 ${currentStep === "investment" ? "text-[#FF4D00]" : ["personal", "financial"].includes(currentStep) ? "text-gray-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "investment" ? "bg-[#FF4D00] text-white" : currentStep === "context" ? "bg-[#FFB800] text-white" : "bg-gray-800 text-gray-400"}`}>3</div>
              <span className="text-xs hidden sm:inline">Inversión</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep === "context" ? "bg-[#FF4D00]" : "bg-gray-800"}`} />
            <div className={`flex items-center gap-2 ${currentStep === "context" ? "text-[#FF4D00]" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "context" ? "bg-[#FF4D00] text-white" : "bg-gray-800 text-gray-400"}`}>4</div>
              <span className="text-xs hidden sm:inline">Contexto</span>
            </div>
          </div>
        </div>

        <Tabs value={currentStep} className="w-full">

          {/* PASO 1: INFORMACIÓN PERSONAL */}
          <TabsContent value="personal" className="space-y-4">
            <form className="space-y-4">
              {/* Edad */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label htmlFor="age" className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <User size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Cuál es tu edad actual?
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ej: 35"
                  value={formData.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  min="18"
                  max="100"
                  className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
                />
                {errors.age && <p className="text-red-400 text-sm mt-2">{errors.age}</p>}
              </Card>

              {/* Género */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <User size={18} className="text-[#FFB800]" />
                  </div>
                  ¿Cuál es tu género?
                </Label>
                <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="masculino" className="text-white hover:bg-gray-800">Masculino</SelectItem>
                    <SelectItem value="femenino" className="text-white hover:bg-gray-800">Femenino</SelectItem>
                    <SelectItem value="otro" className="text-white hover:bg-gray-800">Otro</SelectItem>
                    <SelectItem value="prefiero-no-decir" className="text-white hover:bg-gray-800">Prefiero no decir</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-400 text-sm mt-2">{errors.gender}</p>}
              </Card>

              {/* Estado civil */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <HeartHandshake size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Cuál es tu estado civil actual?
                </Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => updateField("maritalStatus", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="soltero" className="text-white hover:bg-gray-800">Soltero(a)</SelectItem>
                    <SelectItem value="casado" className="text-white hover:bg-gray-800">Casado(a)</SelectItem>
                    <SelectItem value="union-libre" className="text-white hover:bg-gray-800">Unión libre</SelectItem>
                    <SelectItem value="divorciado" className="text-white hover:bg-gray-800">Divorciado(a)</SelectItem>
                    <SelectItem value="viudo" className="text-white hover:bg-gray-800">Viudo(a)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && <p className="text-red-400 text-sm mt-2">{errors.maritalStatus}</p>}
              </Card>

              {/* Dependientes */}
              <Card className="p-5 border-l-4 border-l-gray-500 bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <Users size={18} className="text-gray-200" />
                  </div>
                  ¿Cuántas personas dependen económicamente de ti?
                </Label>
                <Select value={formData.dependents} onValueChange={(value) => updateField("dependents", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="0" className="text-white hover:bg-gray-800">Ninguna</SelectItem>
                    <SelectItem value="1" className="text-white hover:bg-gray-800">1 persona</SelectItem>
                    <SelectItem value="2" className="text-white hover:bg-gray-800">2 personas</SelectItem>
                    <SelectItem value="3" className="text-white hover:bg-gray-800">3 personas</SelectItem>
                    <SelectItem value="4" className="text-white hover:bg-gray-800">4 personas</SelectItem>
                    <SelectItem value="5+" className="text-white hover:bg-gray-800">5 o más personas</SelectItem>
                  </SelectContent>
                </Select>
                {errors.dependents && <p className="text-red-400 text-sm mt-2">{errors.dependents}</p>}
              </Card>

              {/* Nivel educativo */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <GraduationCap size={18} className="text-[#FFB800]" />
                  </div>
                  ¿Cuál es tu nivel máximo de estudios?
                </Label>
                <Select value={formData.educationLevel} onValueChange={(value) => updateField("educationLevel", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="primaria" className="text-white hover:bg-gray-800">Primaria</SelectItem>
                    <SelectItem value="secundaria" className="text-white hover:bg-gray-800">Secundaria</SelectItem>
                    <SelectItem value="preparatoria" className="text-white hover:bg-gray-800">Preparatoria</SelectItem>
                    <SelectItem value="carrera-tecnica" className="text-white hover:bg-gray-800">Carrera técnica</SelectItem>
                    <SelectItem value="universidad" className="text-white hover:bg-gray-800">Universidad</SelectItem>
                    <SelectItem value="posgrado" className="text-white hover:bg-gray-800">Posgrado</SelectItem>
                  </SelectContent>
                </Select>
                {errors.educationLevel && <p className="text-red-400 text-sm mt-2">{errors.educationLevel}</p>}
              </Card>

              {/* Región */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <MapPin size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿En qué estado resides?
                </Label>
                <Select value={formData.region} onValueChange={(value) => updateField("region", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona tu estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 max-h-60">
                    <SelectItem value="cdmx" className="text-white hover:bg-gray-800">Ciudad de México</SelectItem>
                    <SelectItem value="mexico" className="text-white hover:bg-gray-800">Estado de México</SelectItem>
                    <SelectItem value="jalisco" className="text-white hover:bg-gray-800">Jalisco</SelectItem>
                    <SelectItem value="nuevo-leon" className="text-white hover:bg-gray-800">Nuevo León</SelectItem>
                    <SelectItem value="puebla" className="text-white hover:bg-gray-800">Puebla</SelectItem>
                    <SelectItem value="guanajuato" className="text-white hover:bg-gray-800">Guanajuato</SelectItem>
                    <SelectItem value="veracruz" className="text-white hover:bg-gray-800">Veracruz</SelectItem>
                    <SelectItem value="otro" className="text-white hover:bg-gray-800">Otro estado</SelectItem>
                  </SelectContent>
                </Select>
                {errors.region && <p className="text-red-400 text-sm mt-2">{errors.region}</p>}
              </Card>

              {/* Ocupación */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <Briefcase size={18} className="text-[#FFB800]" />
                  </div>
                  ¿A qué te dedicas actualmente?
                </Label>
                <Select value={formData.occupation} onValueChange={(value) => updateField("occupation", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="empleado-formal" className="text-white hover:bg-gray-800">Empleado formal</SelectItem>
                    <SelectItem value="empleado-informal" className="text-white hover:bg-gray-800">Empleado informal</SelectItem>
                    <SelectItem value="comerciante" className="text-white hover:bg-gray-800">Comerciante</SelectItem>
                    <SelectItem value="emprendedor" className="text-white hover:bg-gray-800">Emprendedor/Negocio propio</SelectItem>
                    <SelectItem value="freelance" className="text-white hover:bg-gray-800">Freelance/Independiente</SelectItem>
                    <SelectItem value="estudiante" className="text-white hover:bg-gray-800">Estudiante</SelectItem>
                    <SelectItem value="desempleado" className="text-white hover:bg-gray-800">Desempleado</SelectItem>
                    <SelectItem value="otro" className="text-white hover:bg-gray-800">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.occupation && <p className="text-red-400 text-sm mt-2">{errors.occupation}</p>}
              </Card>

              <Button 
                type="button"
                onClick={() => handleNext("financial")}
                className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl shadow-lg shadow-[#FF4D00]/30"
              >
                Continuar
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </form>
          </TabsContent>

          {/* PASO 2: SITUACIÓN FINANCIERA */}
          <TabsContent value="financial" className="space-y-4">
            <form className="space-y-4">
              {/* Ingresos mensuales */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label htmlFor="income" className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <DollarSign size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Cuál es tu ingreso promedio mensual? (MXN)
                </Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="Ej: 8000"
                  value={formData.income}
                  onChange={(e) => updateField("income", e.target.value)}
                  min="100"
                  className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
                />
                {errors.income && <p className="text-red-400 text-sm mt-2">{errors.income}</p>}
              </Card>

              {/* Gastos fijos */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label htmlFor="fixedExpenses" className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <DollarSign size={18} className="text-[#FFB800]" />
                  </div>
                  ¿Cuánto destinas aproximadamente a gastos fijos? (MXN)
                </Label>
                <Input
                  id="fixedExpenses"
                  type="number"
                  placeholder="Ej: 5000"
                  value={formData.fixedExpenses}
                  onChange={(e) => updateField("fixedExpenses", e.target.value)}
                  min="0"
                  className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
                />
                <p className="text-gray-400 text-sm mt-2">Renta, comida, servicios, transporte, etc.</p>
                {errors.fixedExpenses && <p className="text-red-400 text-sm mt-2">{errors.fixedExpenses}</p>}
              </Card>

              {/* Ahorro actual */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <PiggyBank size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Tienes algún tipo de ahorro o inversión actualmente?
                </Label>
                <RadioGroup value={formData.hasCurrentSavings} onValueChange={(value) => updateField("hasCurrentSavings", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="si" id="savings-yes" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="savings-yes" className="text-white cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="no" id="savings-no" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="savings-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                {errors.hasCurrentSavings && <p className="text-red-400 text-sm mt-2">{errors.hasCurrentSavings}</p>}
              </Card>

              {/* Tipo de ahorro (condicional) */}
              {formData.hasCurrentSavings === "si" && (
                <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                  <Label className="flex items-center gap-2 text-white mb-3">
                    <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                      <PiggyBank size={18} className="text-[#FFB800]" />
                    </div>
                    ¿Dónde mantienes tus ahorros?
                  </Label>
                  <Select value={formData.savingsType} onValueChange={(value) => updateField("savingsType", value)}>
                    <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="efectivo" className="text-white hover:bg-gray-800">Efectivo en casa</SelectItem>
                      <SelectItem value="cuenta-banco" className="text-white hover:bg-gray-800">Cuenta bancaria</SelectItem>
                      <SelectItem value="cooperativa" className="text-white hover:bg-gray-800">Cooperativa</SelectItem>
                      <SelectItem value="afore" className="text-white hover:bg-gray-800">AFORE</SelectItem>
                      <SelectItem value="cetes" className="text-white hover:bg-gray-800">CETES</SelectItem>
                      <SelectItem value="inversion" className="text-white hover:bg-gray-800">Inversiones (fondos, acciones)</SelectItem>
                      <SelectItem value="otro" className="text-white hover:bg-gray-800">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.savingsType && <p className="text-red-400 text-sm mt-2">{errors.savingsType}</p>}
                </Card>
              )}

              {/* Deudas */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <CreditCard size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Tienes deudas activas?
                </Label>
                <RadioGroup value={formData.hasDebts} onValueChange={(value) => updateField("hasDebts", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="si" id="debts-yes" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="debts-yes" className="text-white cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="no" id="debts-no" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="debts-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                {errors.hasDebts && <p className="text-red-400 text-sm mt-2">{errors.hasDebts}</p>}
              </Card>

              {/* Porcentaje de deudas (condicional) */}
              {formData.hasDebts === "si" && (
                <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                  <Label className="flex items-center gap-2 text-white mb-3">
                    <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                      <CreditCard size={18} className="text-[#FFB800]" />
                    </div>
                    ¿Qué porcentaje de tus ingresos destinas a pagarlas?
                  </Label>
                  <Select value={formData.debtPercentage} onValueChange={(value) => updateField("debtPercentage", value)}>
                    <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="menos-10" className="text-white hover:bg-gray-800">Menos del 10%</SelectItem>
                      <SelectItem value="10-25" className="text-white hover:bg-gray-800">Entre 10% y 25%</SelectItem>
                      <SelectItem value="25-50" className="text-white hover:bg-gray-800">Entre 25% y 50%</SelectItem>
                      <SelectItem value="mas-50" className="text-white hover:bg-gray-800">Más del 50%</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.debtPercentage && <p className="text-red-400 text-sm mt-2">{errors.debtPercentage}</p>}
                </Card>
              )}

              {/* Seguridad social */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <Shield size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Cuentas con acceso a IMSS, ISSSTE u otro sistema de retiro?
                </Label>
                <RadioGroup value={formData.hasSocialSecurity} onValueChange={(value) => updateField("hasSocialSecurity", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="imss" id="security-imss" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="security-imss" className="text-white cursor-pointer">Sí, IMSS</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="issste" id="security-issste" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="security-issste" className="text-white cursor-pointer">Sí, ISSSTE</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="otro" id="security-other" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="security-other" className="text-white cursor-pointer">Sí, otro</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="no" id="security-no" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="security-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                {errors.hasSocialSecurity && <p className="text-red-400 text-sm mt-2">{errors.hasSocialSecurity}</p>}
              </Card>

              {/* Meta principal */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <Target size={18} className="text-[#FFB800]" />
                  </div>
                  ¿Cuál es tu objetivo financiero principal?
                </Label>
                <Select value={formData.goal} onValueChange={(value) => updateField("goal", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona tu meta" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="ahorrar" className="text-white hover:bg-gray-800">Ahorrar para emergencias</SelectItem>
                    <SelectItem value="invertir" className="text-white hover:bg-gray-800">Invertir y hacer crecer mi dinero</SelectItem>
                    <SelectItem value="retiro" className="text-white hover:bg-gray-800">Asegurar mi retiro</SelectItem>
                    <SelectItem value="vivienda" className="text-white hover:bg-gray-800">Comprar vivienda</SelectItem>
                    <SelectItem value="negocio" className="text-white hover:bg-gray-800">Iniciar un negocio</SelectItem>
                    <SelectItem value="educacion" className="text-white hover:bg-gray-800">Pagar educación</SelectItem>
                    <SelectItem value="salir-deudas" className="text-white hover:bg-gray-800">Salir de deudas</SelectItem>
                  </SelectContent>
                </Select>
                {errors.goal && <p className="text-red-400 text-sm mt-2">{errors.goal}</p>}
              </Card>

              <div className="flex gap-3">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep("personal")}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800 py-6 rounded-xl"
                >
                  <ChevronLeft className="mr-2" size={20} />
                  Anterior
                </Button>
                <Button 
                  type="button"
                  onClick={() => handleNext("investment")}
                  className="flex-1 bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl shadow-lg shadow-[#FF4D00]/30"
                >
                  Continuar
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* PASO 3: PERFIL DE INVERSIÓN */}
          <TabsContent value="investment" className="space-y-4">
            <form className="space-y-4">
              {/* Tolerancia al riesgo */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <TrendingUp size={18} className="text-[#FF4D00]" />
                  </div>
                  Si una inversión baja 10% en un mes, ¿qué harías?
                </Label>
                <RadioGroup value={formData.riskTolerance} onValueChange={(value) => updateField("riskTolerance", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="conservador" id="risk-conservative" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="risk-conservative" className="text-white cursor-pointer flex-1">
                      <span className="block">Vendo todo inmediatamente</span>
                      <span className="text-gray-400 text-sm">Perfil conservador</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="moderado" id="risk-moderate" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="risk-moderate" className="text-white cursor-pointer flex-1">
                      <span className="block">Mantengo mi inversión</span>
                      <span className="text-gray-400 text-sm">Perfil moderado</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="agresivo" id="risk-aggressive" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="risk-aggressive" className="text-white cursor-pointer flex-1">
                      <span className="block">Aprovecho para comprar más</span>
                      <span className="text-gray-400 text-sm">Perfil arriesgado</span>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.riskTolerance && <p className="text-red-400 text-sm mt-2">{errors.riskTolerance}</p>}
              </Card>

              {/* Horizonte de inversión */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <Clock size={18} className="text-[#FFB800]" />
                  </div>
                  ¿En cuánto tiempo planeas usar el dinero invertido?
                </Label>
                <Select value={formData.investmentHorizon} onValueChange={(value) => updateField("investmentHorizon", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="corto" className="text-white hover:bg-gray-800">Menos de 1 año</SelectItem>
                    <SelectItem value="medio-corto" className="text-white hover:bg-gray-800">1 a 3 años</SelectItem>
                    <SelectItem value="medio" className="text-white hover:bg-gray-800">3 a 5 años</SelectItem>
                    <SelectItem value="medio-largo" className="text-white hover:bg-gray-800">5 a 10 años</SelectItem>
                    <SelectItem value="largo" className="text-white hover:bg-gray-800">Más de 10 años</SelectItem>
                  </SelectContent>
                </Select>
                {errors.investmentHorizon && <p className="text-red-400 text-sm mt-2">{errors.investmentHorizon}</p>}
              </Card>

              {/* Conocimientos financieros */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <Lightbulb size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Qué tanto sabes sobre inversiones?
                </Label>
                <RadioGroup value={formData.financialKnowledge} onValueChange={(value) => updateField("financialKnowledge", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="nada" id="knowledge-none" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="knowledge-none" className="text-white cursor-pointer">Nada, soy principiante</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="basico" id="knowledge-basic" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="knowledge-basic" className="text-white cursor-pointer">Básico</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="intermedio" id="knowledge-intermediate" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="knowledge-intermediate" className="text-white cursor-pointer">Intermedio</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="avanzado" id="knowledge-advanced" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="knowledge-advanced" className="text-white cursor-pointer">Avanzado</Label>
                  </div>
                </RadioGroup>
                {errors.financialKnowledge && <p className="text-red-400 text-sm mt-2">{errors.financialKnowledge}</p>}
              </Card>

              {/* Frecuencia de aportación */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <Clock size={18} className="text-[#FFB800]" />
                  </div>
                  ¿Con qué frecuencia podrías invertir o aportar dinero?
                </Label>
                <Select value={formData.contributionFrequency} onValueChange={(value) => updateField("contributionFrequency", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="semanal" className="text-white hover:bg-gray-800">Semanal</SelectItem>
                    <SelectItem value="quincenal" className="text-white hover:bg-gray-800">Quincenal</SelectItem>
                    <SelectItem value="mensual" className="text-white hover:bg-gray-800">Mensual</SelectItem>
                    <SelectItem value="trimestral" className="text-white hover:bg-gray-800">Trimestral</SelectItem>
                    <SelectItem value="anual" className="text-white hover:bg-gray-800">Anual</SelectItem>
                    <SelectItem value="eventual" className="text-white hover:bg-gray-800">Eventual (cuando pueda)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.contributionFrequency && <p className="text-red-400 text-sm mt-2">{errors.contributionFrequency}</p>}
              </Card>

              {/* Preferencias de instrumentos */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <TrendingUp size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿En qué tipo de instrumentos te sentirías más cómodo?
                </Label>
                <Select value={formData.preferredInstruments} onValueChange={(value) => updateField("preferredInstruments", value)}>
                  <SelectTrigger className="border-gray-700 bg-black/30 text-white">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="ahorro" className="text-white hover:bg-gray-800">Cuentas de ahorro</SelectItem>
                    <SelectItem value="bonos" className="text-white hover:bg-gray-800">Bonos gubernamentales (CETES)</SelectItem>
                    <SelectItem value="fondos" className="text-white hover:bg-gray-800">Fondos de inversión</SelectItem>
                    <SelectItem value="afore" className="text-white hover:bg-gray-800">AFORE</SelectItem>
                    <SelectItem value="acciones" className="text-white hover:bg-gray-800">Acciones</SelectItem>
                    <SelectItem value="mixto" className="text-white hover:bg-gray-800">Combinación de varios</SelectItem>
                    <SelectItem value="no-se" className="text-white hover:bg-gray-800">No sé, necesito orientación</SelectItem>
                  </SelectContent>
                </Select>
                {errors.preferredInstruments && <p className="text-red-400 text-sm mt-2">{errors.preferredInstruments}</p>}
              </Card>

              <div className="flex gap-3">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep("financial")}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800 py-6 rounded-xl"
                >
                  <ChevronLeft className="mr-2" size={20} />
                  Anterior
                </Button>
                <Button 
                  type="button"
                  onClick={() => handleNext("context")}
                  className="flex-1 bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl shadow-lg shadow-[#FF4D00]/30"
                >
                  Continuar
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* PASO 4: CONTEXTO */}
          <TabsContent value="context" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Apoyo familiar */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <HeartHandshake size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Tu familia te apoya en tus decisiones financieras?
                </Label>
                <RadioGroup value={formData.familySupport} onValueChange={(value) => updateField("familySupport", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="si" id="support-yes" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="support-yes" className="text-white cursor-pointer">Sí, me apoyan</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="parcial" id="support-partial" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="support-partial" className="text-white cursor-pointer">A veces</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="no" id="support-no" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="support-no" className="text-white cursor-pointer">No me apoyan</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="independiente" id="support-independent" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="support-independent" className="text-white cursor-pointer">Soy independiente</Label>
                  </div>
                </RadioGroup>
                {errors.familySupport && <p className="text-red-400 text-sm mt-2">{errors.familySupport}</p>}
              </Card>

              {/* Confianza en instituciones */}
              <Card className="p-5 border-l-4 border-l-[#FFB800] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FFB800]/20 p-2 rounded-lg">
                    <Building2 size={18} className="text-[#FFB800]" />
                  </div>
                  ¿Confías en bancos o prefieres guardar dinero por tu cuenta?
                </Label>
                <RadioGroup value={formData.institutionalTrust} onValueChange={(value) => updateField("institutionalTrust", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="alta" id="trust-high" className="border-[#FFB800] text-[#FFB800]" />
                    <Label htmlFor="trust-high" className="text-white cursor-pointer">Confío en bancos</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="media" id="trust-medium" className="border-[#FFB800] text-[#FFB800]" />
                    <Label htmlFor="trust-medium" className="text-white cursor-pointer">Confío con reservas</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="baja" id="trust-low" className="border-[#FFB800] text-[#FFB800]" />
                    <Label htmlFor="trust-low" className="text-white cursor-pointer">Prefiero guardar por mi cuenta</Label>
                  </div>
                </RadioGroup>
                {errors.institutionalTrust && <p className="text-red-400 text-sm mt-2">{errors.institutionalTrust}</p>}
              </Card>

              {/* Acceso digital */}
              <Card className="p-5 border-l-4 border-l-[#FF4D00] bg-gray-900/50 border-gray-800">
                <Label className="flex items-center gap-2 text-white mb-3">
                  <div className="bg-[#FF4D00]/20 p-2 rounded-lg">
                    <Smartphone size={18} className="text-[#FF4D00]" />
                  </div>
                  ¿Tienes smartphone con conexión a internet?
                </Label>
                <RadioGroup value={formData.hasDigitalAccess} onValueChange={(value) => updateField("hasDigitalAccess", value)}>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="si" id="digital-yes" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="digital-yes" className="text-white cursor-pointer">Sí, tengo acceso regular</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="limitado" id="digital-limited" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="digital-limited" className="text-white cursor-pointer">Sí, pero limitado</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
                    <RadioGroupItem value="no" id="digital-no" className="border-[#FF4D00] text-[#FF4D00]" />
                    <Label htmlFor="digital-no" className="text-white cursor-pointer">No tengo acceso regular</Label>
                  </div>
                </RadioGroup>
                {errors.hasDigitalAccess && <p className="text-red-400 text-sm mt-2">{errors.hasDigitalAccess}</p>}
              </Card>

              <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl p-4 mt-6">
                <p className="text-gray-200 text-sm text-center">
                  🎯 Estás a un paso de recibir tu asesoría personalizada
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep("investment")}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800 py-6 rounded-xl"
                >
                  <ChevronLeft className="mr-2" size={20} />
                  Anterior
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl shadow-lg shadow-[#FF4D00]/30"
                >
                  <Sparkles className="mr-2" size={20} />
                  {initialData ? "Guardar cambios" : "Generar asesoría"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Tu información es confidencial y se usa solo para mejorar tus recomendaciones.
        </p>
      </div>
    </div>
  );
}
