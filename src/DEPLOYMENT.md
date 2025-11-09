# 📱 Guía de Despliegue de SEFTI

## 🚀 Opción 1: Probar en Smartphone (Más Rápido)

### Desde Figma Make:
1. **Usa la URL de preview de Figma Make** directamente en tu smartphone
2. La aplicación es responsiva y funcionará perfectamente en móvil
3. Puedes agregar la app a tu pantalla de inicio:
   - **iOS Safari**: Toca "Compartir" → "Agregar a pantalla de inicio"
   - **Android Chrome**: Menú → "Agregar a pantalla de inicio"

## 🌐 Opción 2: Desplegar como PWA (Progressive Web App)

### Ventajas:
- ✅ Instalable en cualquier dispositivo
- ✅ Funciona offline (con configuración adicional)
- ✅ Apariencia de app nativa
- ✅ No requiere App Store/Play Store
- ✅ Mantén el código React actual

### Pasos para convertir a PWA:

1. **Agregar manifest.json** en la carpeta public:
```json
{
  "name": "SEFTI - Sistema de Educación Financiera",
  "short_name": "SEFTI",
  "description": "Tu asistente financiero personal",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#FF4D00",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Agregar Service Worker** para funcionalidad offline

3. **Desplegar en:**
   - **Vercel** (recomendado): `vercel --prod`
   - **Netlify**: `netlify deploy --prod`
   - **GitHub Pages**: Configurar en Settings

## 📦 Opción 3: Exportar a React Native + Expo (Más Trabajo)

⚠️ **Importante**: React Native usa una arquitectura completamente diferente a React Web.

### Lo que necesitarías cambiar:

1. **Componentes HTML → Componentes React Native**
   - `<div>` → `<View>`
   - `<p>`, `<h1>`, etc. → `<Text>`
   - `<input>` → `<TextInput>`
   - `<img>` → `<Image>`

2. **Tailwind CSS → NativeWind o StyleSheet**
   ```bash
   npm install nativewind
   ```

3. **Librerías web → Equivalentes nativos**
   - `recharts` → `react-native-chart-kit` o `victory-native`
   - `lucide-react` → `lucide-react-native`
   - shadcn/ui → Reconstruir con React Native Paper o NativeBase

4. **localStorage → AsyncStorage**
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

### Pasos para crear versión Expo:

```bash
# Crear nuevo proyecto Expo
npx create-expo-app sefti-mobile --template blank-typescript

cd sefti-mobile

# Instalar dependencias
npm install nativewind
npm install tailwindcss
npm install @react-native-async-storage/async-storage
npm install react-native-chart-kit
npm install lucide-react-native

# Configurar NativeWind
npx tailwindcss init

# Copiar y adaptar componentes manualmente
# (Este es un proceso manual extenso)
```

## 🎯 Recomendación para Hackathon

### Para presentar en el hackathon, te recomiendo:

**Opción A: PWA + Vercel** (15-30 minutos)
- Despliega en Vercel: `vercel --prod`
- Obtén URL pública
- Abre en cualquier smartphone y agrega a pantalla de inicio
- Se ve y funciona como app nativa

**Opción B: Usar directamente la URL de Figma Make**
- La app ya es responsiva
- Funciona perfectamente en móvil
- Puedes hacer demo en tiempo real desde cualquier dispositivo

## 📋 Credenciales de Demo

Para las pruebas, usa estas cuentas:

```
Email: maria@demo.com | Contraseña: demo123
Perfil: Joven profesional, perfil agresivo

Email: juan@demo.com | Contraseña: demo123
Perfil: Comerciante informal, perfil moderado

Email: rosa@demo.com | Contraseña: demo123
Perfil: Adulto mayor, perfil conservador

Email: carlos@demo.com | Contraseña: demo123
Perfil: Emprendedor, perfil agresivo
```

## 🔧 Continuar Desarrollo

### Trabajar en Figma Make:
- Sigue editando aquí
- Los cambios se reflejan inmediatamente
- Comparte la URL de preview para pruebas

### Exportar código para desarrollo local:
1. Descarga todo el código desde Figma Make
2. Crea proyecto Vite/Next.js
3. Copia los archivos
4. Instala dependencias necesarias

## 📱 Estructura de Archivos para Exportar

```
sefti-web/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── profile/
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── ProfileView.tsx
│   │   │   └── EditProfile.tsx
│   │   ├── investment/
│   │   │   ├── Recommendations.tsx
│   │   │   ├── InvestmentPortfolio.tsx
│   │   │   └── RetirementPlanner.tsx
│   │   └── ui/
│   ├── utils/
│   │   └── demoData.ts
│   ├── styles/
│   │   └── globals.css
│   └── App.tsx
├── package.json
└── README.md
```

## 🎨 Mantener Identidad Visual en Móvil

La paleta de colores SEFTI se mantiene perfecta en móvil:
- Primario: `#FF4D00`
- Secundario: `#FFB800`
- Fondo: `#000000`

El diseño ya es responsivo con:
- `max-w-md mx-auto` para simular vista móvil
- Gradientes adaptativos
- Navegación inferior fija
- Touch-friendly buttons

---

**💡 Consejo**: Para el hackathon, usa la URL de Figma Make directamente. Es la forma más rápida y efectiva de demostrar tu app en cualquier dispositivo sin configuración adicional.
