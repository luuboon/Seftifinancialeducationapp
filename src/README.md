# 🏦 SEFTI - Sistema de Educación Financiera para Trabajadores e Inversiones

![SEFTI](https://img.shields.io/badge/SEFTI-Finanzas_Personales-FF4D00?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwind-css)

## 📖 Descripción

SEFTI es una aplicación móvil diseñada específicamente para **trabajadores informales mexicanos** con bajo acceso a la banca y conocimientos financieros básicos. La aplicación ofrece portafolios de inversión personalizados y planes de retiro basados en el perfil demográfico, situación financiera y tolerancia al riesgo del usuario.

### 🎯 Objetivo

Democratizar el acceso a asesoría financiera de calidad mediante:
- ✅ Perfilamiento completo y personalizado
- ✅ Recomendaciones de inversión adaptadas al contexto mexicano
- ✅ Instrumentos financieros reales y verificados
- ✅ Interfaz inclusiva y fácil de usar
- ✅ IA para asesoría personalizada

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- Login/Registro con validación
- Sesión persistente en localStorage
- 4 usuarios demo precargados

### 📋 Perfilamiento en 4 Pasos

1. **Información Personal**
   - Edad, género, estado civil
   - Dependientes económicos
   - Nivel educativo, región, ocupación

2. **Situación Financiera**
   - Ingresos y gastos mensuales
   - Ahorros actuales y tipo
   - Deudas y porcentaje
   - Seguridad social
   - Meta principal

3. **Perfil de Inversión**
   - Tolerancia al riesgo (conservador/moderado/agresivo)
   - Horizonte de inversión
   - Conocimientos financieros
   - Frecuencia de aportación
   - Instrumentos preferidos

4. **Contexto Personal**
   - Apoyo familiar
   - Confianza institucional
   - Acceso digital

### 💼 Portafolios Personalizados

**Conservador** (Adultos mayores o bajo riesgo)
- 50% CETES y Bonos Gubernamentales
- 25% Afore - Siefore Básica 0
- 15% Fondos Conservadores
- 10% Efectivo/Cuenta de Ahorro
- **Rendimiento esperado: 6-8% anual**

**Moderado** (30-55 años o riesgo medio)
- 30% Afore - Siefore Básica 2
- 25% Fondos Mixtos
- 25% CETES y Bonos
- 15% ETFs México (NAFTRAC)
- 5% Efectivo
- **Rendimiento esperado: 10-14% anual**

**Agresivo** (Jóvenes o alto riesgo)
- 35% Afore - Siefore Básica 4
- 30% ETFs y Acciones México
- 20% Fondos Agresivos
- 10% CETES
- 5% Efectivo
- **Rendimiento esperado: 15-22% anual**

### 📊 Planificador de Retiro

- Calcula edad de retiro sugerida
- Proyección de fondo basada en aportaciones
- Planes alternativos (conservador, recomendado, agresivo)
- Gráficos de proyección a largo plazo
- Considera dependientes y meta del usuario

### 🏦 Instrumentos Financieros Reales

**Inversión:**
- CETES Directo
- Afore XXI Banorte
- Hey Banco
- Nu México
- BBVA México
- Banorte
- NAFTRAC ETF

**Crédito:**
- Konfío (Microcréditos)
- Santander México (Crédito nómina)
- Infonavit (Crédito hipotecario)

### 🎓 Módulo Educativo

- Guías interactivas sobre finanzas
- Conceptos básicos explicados claramente
- Estrategias de inversión
- Casos de estudio

### 🤖 Chat con IA

- Asesoría financiera personalizada
- Respuestas contextuales
- Preguntas frecuentes
- Guía paso a paso

### 🎨 Carrusel 3D Estilo PSP

- Visualización única de opciones financieras
- Navegación intuitiva
- Información detallada de cada instrumento
- Comparación de riesgos y rendimientos

## 🎨 Diseño

### Paleta de Colores
- **Primario:** `#FF4D00` (Naranja/Rojo)
- **Secundario:** `#FFB800` (Dorado)
- **Fondo:** `#000000` (Negro)
- **Gradientes:** Negro → Gris → Rojo oscuro

### Tipografía
- Sistema de tipografía predefinida en `globals.css`
- Diseño responsivo y accesible
- Optimizado para móviles

## 🛠️ Tecnologías

- **React 18.3** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS 4.0** - Estilos
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos
- **Shadcn/UI** - Componentes UI
- **localStorage** - Persistencia de datos

## 📱 Cómo Probar

### Opción 1: Figma Make (Recomendado para Hackathon)
1. Abre la URL de preview de Figma Make en tu smartphone
2. Agrega a pantalla de inicio para experiencia nativa
3. ¡Listo para usar!

### Opción 2: Desarrollo Local
```bash
# Clonar repositorio
git clone [tu-repo]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
http://localhost:5173
```

## 👥 Cuentas Demo

### María González - Joven Profesional
```
Email: maria@demo.com
Contraseña: demo123
Perfil: Agresivo | 28 años | $12,000 MXN/mes
Meta: Invertir y hacer crecer dinero
```

### Juan Pérez - Comerciante Informal
```
Email: juan@demo.com
Contraseña: demo123
Perfil: Moderado | 45 años | $8,000 MXN/mes
Meta: Asegurar retiro
```

### Rosa Martínez - Adulto Mayor
```
Email: rosa@demo.com
Contraseña: demo123
Perfil: Conservador | 55 años | $6,000 MXN/mes
Meta: Salir de deudas
```

### Carlos Rodríguez - Emprendedor
```
Email: carlos@demo.com
Contraseña: demo123
Perfil: Agresivo | 32 años | $15,000 MXN/mes
Meta: Iniciar negocio
```

## 📂 Estructura del Proyecto

```
/
├── App.tsx                    # Componente principal con lógica de autenticación
├── components/
│   ├── Login.tsx             # Pantalla de inicio de sesión
│   ├── Register.tsx          # Registro + Perfilamiento
│   ├── Welcome.tsx           # Pantalla de bienvenida personalizada
│   ├── ProfileForm.tsx       # Formulario de perfilamiento (4 pasos)
│   ├── ProfileView.tsx       # Vista del perfil del usuario
│   ├── EditProfile.tsx       # Edición de perfil
│   ├── Recommendations.tsx   # Recomendaciones personalizadas
│   ├── InvestmentPortfolio.tsx # Portafolio de inversión
│   ├── RetirementPlanner.tsx # Planificador de retiro
│   ├── Carousel3D.tsx        # Carrusel 3D de instrumentos
│   ├── GoalSimulator.tsx     # Simulador de metas
│   ├── EducationModule.tsx   # Módulo educativo
│   ├── AIChat.tsx            # Chat con IA
│   ├── BottomNav.tsx         # Navegación inferior
│   ├── Logo.tsx              # Logo SEFTI
│   └── ui/                   # Componentes Shadcn/UI
├── utils/
│   └── demoData.ts           # Datos de demostración
├── styles/
│   └── globals.css           # Estilos globales y variables
└── DEPLOYMENT.md             # Guía de despliegue
```

## 🚀 Roadmap Futuro

- [ ] Integración con APIs bancarias reales
- [ ] Notificaciones push de oportunidades
- [ ] Comparador de instrumentos financieros
- [ ] Calculadora de interés compuesto avanzada
- [ ] Sistema de logros y gamificación
- [ ] Comunidad de usuarios
- [ ] Integración con Open Banking México
- [ ] Soporte para múltiples idiomas (incluyendo lenguas indígenas)
- [ ] Modo offline completo
- [ ] Exportar reportes en PDF

## 📄 Licencia

Este proyecto fue desarrollado para un hackathon y es de código abierto.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto está diseñado para ayudar a trabajadores informales mexicanos a tener mejor acceso a educación financiera.

## 📞 Contacto

Proyecto desarrollado para hackathon - SEFTI 2025

---

**💡 Nota**: Esta es una versión demo para hackathon. Los datos de inversión son simulados y con fines educativos. Siempre consulta con un asesor financiero certificado antes de tomar decisiones de inversión reales.

**🇲🇽 Hecho con ❤️ para México**
