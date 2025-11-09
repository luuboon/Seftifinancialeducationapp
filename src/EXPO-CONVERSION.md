# 📱 Guía de Conversión de SEFTI a React Native + Expo

## ⚠️ Importante: ¿Por qué no es una conversión automática?

React Native usa componentes nativos completamente diferentes a React Web:

| React Web | React Native |
|-----------|--------------|
| `<div>` | `<View>` |
| `<p>`, `<h1>`, `<span>` | `<Text>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<TouchableOpacity>` o `<Pressable>` |
| `<img>` | `<Image>` |
| Tailwind CSS directo | NativeWind o StyleSheet |
| onClick | onPress |
| localStorage | AsyncStorage |
| window.scrollTo | ScrollView |

## 🎯 Plan de Conversión

### Fase 1: Crear Proyecto Expo (5 minutos)
### Fase 2: Configurar NativeWind (10 minutos)
### Fase 3: Convertir Componentes Básicos (2-3 horas)
### Fase 4: Reemplazar Librerías (1-2 horas)
### Fase 5: Probar en Expo Go (5 minutos)

**Total estimado: 4-6 horas de trabajo**

---

## 🚀 Fase 1: Crear Proyecto Expo

```bash
# Instalar Expo CLI
npm install -g expo-cli

# Crear proyecto nuevo
npx create-expo-app@latest sefti-mobile --template blank-typescript

cd sefti-mobile

# Instalar dependencias base
npm install
```

---

## 🎨 Fase 2: Configurar NativeWind (Tailwind para React Native)

```bash
# Instalar NativeWind y dependencias
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Crear configuración de Tailwind
npx tailwindcss init
```

**Actualizar `tailwind.config.js`:**
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D00',
        secondary: '#FFB800',
      }
    },
  },
  plugins: [],
}
```

**Actualizar `babel.config.js`:**
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

---

## 📦 Fase 3: Instalar Librerías React Native Equivalentes

```bash
# AsyncStorage (reemplaza localStorage)
npx expo install @react-native-async-storage/async-storage

# Navigation
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

# Navigation Stack
npm install @react-navigation/native-stack

# Gráficas (reemplaza recharts)
npm install react-native-chart-kit
npm install react-native-svg

# Iconos (reemplaza lucide-react)
npm install react-native-vector-icons
# O usar @expo/vector-icons que viene incluido

# Linear Gradient
npx expo install expo-linear-gradient

# Forms
npm install react-hook-form

# Carousel 3D
npm install react-native-snap-carousel
npm install react-native-reanimated
```

---

## 🔄 Fase 4: Convertir Componentes

### Ejemplo: Login.tsx (Web) → Login Native

**Antes (Web):**
```tsx
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"

export default function Login() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-white">SEFTI</h1>
        <input 
          type="email"
          className="w-full px-4 py-2 rounded"
          placeholder="Email"
        />
        <button 
          onClick={handleLogin}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  )
}
```

**Después (React Native):**
```tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {
  const handleLogin = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(userData))
  }

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>SEFTI</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF4D00',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
```

---

## 📊 Convertir Gráficas (Recharts → React Native Chart Kit)

**Antes (Recharts):**
```tsx
import { LineChart, Line, XAxis, YAxis } from 'recharts'

<LineChart data={data} width={300} height={200}>
  <Line type="monotone" dataKey="value" stroke="#FF4D00" />
  <XAxis dataKey="year" />
  <YAxis />
</LineChart>
```

**Después (React Native Chart Kit):**
```tsx
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

<LineChart
  data={{
    labels: data.map(d => d.year),
    datasets: [{
      data: data.map(d => d.value)
    }]
  }}
  width={screenWidth - 32}
  height={220}
  chartConfig={{
    backgroundColor: '#000',
    backgroundGradientFrom: '#1a1a1a',
    backgroundGradientTo: '#000',
    color: (opacity = 1) => `rgba(255, 77, 0, ${opacity})`,
    strokeWidth: 2,
  }}
  bezier
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/>
```

---

## 🗂️ Estructura de Carpetas React Native

```
sefti-mobile/
├── App.tsx                 # Punto de entrada
├── app.json               # Configuración Expo
├── package.json
├── tailwind.config.js
├── babel.config.js
├── src/
│   ├── screens/           # Pantallas principales
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── InvestmentScreen.tsx
│   │   └── RetirementScreen.tsx
│   ├── components/        # Componentes reutilizables
│   │   ├── Logo.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── InvestmentCard.tsx
│   │   ├── Carousel3D.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   ├── navigation/        # Configuración de navegación
│   │   └── AppNavigator.tsx
│   ├── services/          # Servicios
│   │   ├── storage.ts     # AsyncStorage wrapper
│   │   └── auth.ts
│   ├── utils/
│   │   └── demoData.ts
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── colors.ts
└── assets/
    ├── images/
    └── fonts/
```

---

## 🎯 Diferencias Clave a Tener en Cuenta

### 1. No hay `div`, `p`, `h1`, etc.
Todo es `<View>` y `<Text>`

### 2. Estilos con StyleSheet
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
})
```

### 3. localStorage → AsyncStorage
```tsx
// Web
localStorage.setItem('key', 'value')
const value = localStorage.getItem('key')

// React Native
await AsyncStorage.setItem('key', 'value')
const value = await AsyncStorage.getItem('key')
```

### 4. Navegación
```tsx
// Usar React Navigation
navigation.navigate('Profile')
```

### 5. Scrolling
```tsx
import { ScrollView } from 'react-native'

<ScrollView>
  {/* contenido */}
</ScrollView>
```

### 6. Inputs
```tsx
<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Email"
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

---

## 🧪 Probar en Expo Go

1. **Instalar Expo Go en tu smartphone:**
   - iOS: App Store → "Expo Go"
   - Android: Play Store → "Expo Go"

2. **Ejecutar el proyecto:**
   ```bash
   npx expo start
   ```

3. **Escanear QR:**
   - iOS: Abre la cámara y escanea el QR
   - Android: Abre Expo Go y escanea el QR

4. **La app se carga en tu teléfono:**
   - ✅ Funciona como app nativa
   - ✅ Hot reload (cambios en tiempo real)
   - ✅ Acceso a sensores, cámara, etc.

---

## ⏱️ Estimación de Tiempo

| Tarea | Tiempo Estimado |
|-------|-----------------|
| Setup inicial Expo | 15 min |
| Configurar NativeWind | 15 min |
| Convertir Login/Register | 1 hora |
| Convertir ProfileForm | 1 hora |
| Convertir componentes principales | 2-3 horas |
| Convertir gráficas | 1 hora |
| Navigation setup | 30 min |
| Testing y ajustes | 1-2 horas |
| **TOTAL** | **6-9 horas** |

---

## 🤔 ¿Vale la Pena para el Hackathon?

### Ventajas de React Native:
- ✅ App móvil nativa real
- ✅ Mejor rendimiento
- ✅ Acceso a funciones nativas (cámara, GPS, etc.)
- ✅ Experiencia de usuario superior
- ✅ Publicable en App Store/Play Store

### Desventajas:
- ❌ Requiere 6-9 horas de conversión
- ❌ Mucho código para reescribir
- ❌ Curva de aprendizaje si no conoces React Native
- ❌ Debugging más complejo

### Alternativa: PWA (Progressive Web App)
- ✅ 0 conversión, ya funciona
- ✅ Instalable en pantalla de inicio
- ✅ Funciona offline (con service worker)
- ✅ Parece app nativa
- ✅ Link para compartir
- ⚠️ Rendimiento ligeramente inferior

---

## 💡 Mi Recomendación

**Para el hackathon:**
1. Despliega la versión web en Vercel (5 minutos)
2. Es completamente responsiva y funciona perfecto en móvil
3. Puedes agregar a pantalla de inicio (parece app nativa)
4. Si ganas, conviertes a React Native después con más tiempo

**Post-hackathon:**
1. Convierte a React Native con calma
2. Optimiza para cada plataforma
3. Agrega features nativas (Touch ID, notificaciones push, etc.)
4. Publica en App Store y Play Store

---

## 🚀 Si Decides Continuar con React Native...

Te puedo ayudar a convertir componente por componente. Empezaríamos con:

1. ✅ Setup del proyecto Expo
2. ✅ Login y Register screens
3. ✅ Navigation básica
4. ✅ AsyncStorage para datos
5. ✅ ProfileForm nativo
6. ✅ Componentes principales
7. ✅ Gráficas con react-native-chart-kit
8. ✅ Testing en Expo Go

**¿Quieres que empiece a crear la versión React Native?** 

O prefieres **desplegar la versión web que ya funciona** y convertir después?
