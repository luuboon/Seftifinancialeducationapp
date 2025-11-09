import { ProfileData } from "../components/ProfileForm";

interface DemoUser {
  email: string;
  password: string;
  name: string;
  profile: ProfileData;
  createdAt: string;
}

export const demoUsers: DemoUser[] = [
  {
    email: "maria@demo.com",
    password: "demo123",
    name: "María González",
    profile: {
      age: "28",
      gender: "femenino",
      maritalStatus: "soltera",
      dependents: "0",
      educationLevel: "universidad",
      region: "cdmx",
      occupation: "empleado-formal",
      income: "12000",
      fixedExpenses: "7000",
      hasCurrentSavings: "si",
      savingsType: "cuenta-banco",
      hasDebts: "no",
      debtPercentage: "",
      hasSocialSecurity: "imss",
      goal: "invertir",
      riskTolerance: "agresivo",
      investmentHorizon: "largo",
      financialKnowledge: "basico",
      contributionFrequency: "mensual",
      preferredInstruments: "fondos",
      familySupport: "si",
      institutionalTrust: "alta",
      hasDigitalAccess: "si"
    },
    createdAt: "2025-01-01T00:00:00.000Z"
  },
  {
    email: "juan@demo.com",
    password: "demo123",
    name: "Juan Pérez",
    profile: {
      age: "45",
      gender: "masculino",
      maritalStatus: "casado",
      dependents: "3",
      educationLevel: "preparatoria",
      region: "jalisco",
      occupation: "comerciante",
      income: "8000",
      fixedExpenses: "6000",
      hasCurrentSavings: "si",
      savingsType: "efectivo",
      hasDebts: "si",
      debtPercentage: "10-25",
      hasSocialSecurity: "no",
      goal: "retiro",
      riskTolerance: "moderado",
      investmentHorizon: "medio-largo",
      financialKnowledge: "nada",
      contributionFrequency: "mensual",
      preferredInstruments: "no-se",
      familySupport: "si",
      institutionalTrust: "media",
      hasDigitalAccess: "limitado"
    },
    createdAt: "2025-01-02T00:00:00.000Z"
  },
  {
    email: "rosa@demo.com",
    password: "demo123",
    name: "Rosa Martínez",
    profile: {
      age: "55",
      gender: "femenino",
      maritalStatus: "viuda",
      dependents: "1",
      educationLevel: "secundaria",
      region: "mexico",
      occupation: "empleado-informal",
      income: "6000",
      fixedExpenses: "4500",
      hasCurrentSavings: "no",
      savingsType: "",
      hasDebts: "si",
      debtPercentage: "25-50",
      hasSocialSecurity: "no",
      goal: "salir-deudas",
      riskTolerance: "conservador",
      investmentHorizon: "corto",
      financialKnowledge: "nada",
      contributionFrequency: "eventual",
      preferredInstruments: "ahorro",
      familySupport: "parcial",
      institutionalTrust: "baja",
      hasDigitalAccess: "limitado"
    },
    createdAt: "2025-01-03T00:00:00.000Z"
  },
  {
    email: "carlos@demo.com",
    password: "demo123",
    name: "Carlos Rodríguez",
    profile: {
      age: "32",
      gender: "masculino",
      maritalStatus: "union-libre",
      dependents: "2",
      educationLevel: "carrera-tecnica",
      region: "nuevo-leon",
      occupation: "emprendedor",
      income: "15000",
      fixedExpenses: "9000",
      hasCurrentSavings: "si",
      savingsType: "inversion",
      hasDebts: "si",
      debtPercentage: "menos-10",
      hasSocialSecurity: "no",
      goal: "negocio",
      riskTolerance: "agresivo",
      investmentHorizon: "medio",
      financialKnowledge: "intermedio",
      contributionFrequency: "mensual",
      preferredInstruments: "mixto",
      familySupport: "independiente",
      institutionalTrust: "alta",
      hasDigitalAccess: "si"
    },
    createdAt: "2025-01-04T00:00:00.000Z"
  }
];

export function initializeDemoData() {
  // Solo inicializar si no hay datos en localStorage
  const existingUsers = localStorage.getItem("sefti_users");
  if (!existingUsers) {
    localStorage.setItem("sefti_users", JSON.stringify(demoUsers));
    console.log("✅ Datos de demostración inicializados");
  }
}
