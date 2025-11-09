# 🚀 Setup SEFTI con Expo

## Opción 1: Crear Proyecto Nuevo (Recomendado)

### Paso 1: Crear Proyecto
```bash
npx create-expo-app@latest sefti-mobile --template blank-typescript
cd sefti-mobile
```

### Paso 2: Instalar Dependencias
```bash
# NativeWind (Tailwind para React Native)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npx tailwindcss init

# AsyncStorage (reemplaza localStorage)
npx expo install @react-native-async-storage/async-storage

# Navegación
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# Gráficas
npm install react-native-chart-kit react-native-svg

# Gradientes
npx expo install expo-linear-gradient

# Forms
npm install react-hook-form

# Animaciones
npx expo install react-native-reanimated
```

### Paso 3: Configurar NativeWind

**Crear/actualizar `tailwind.config.js`:**
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
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
    plugins: [
      "nativewind/babel",
      'react-native-reanimated/plugin',
    ],
  };
};
```

**Crear `global.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Paso 4: Copiar Archivos de Configuración

Copia estos archivos de `/expo-setup/` a tu proyecto nuevo:
- `app.json` (configuración de Expo)
- `package.json` (dependencias)

### Paso 5: Crear Estructura de Carpetas

```bash
mkdir -p src/screens
mkdir -p src/components/ui
mkdir -p src/navigation
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/types
mkdir -p src/constants
```

## Opción 2: Usar Archivos de Configuración

Si prefieres usar los archivos que ya creé:

```bash
# Crear proyecto
npx create-expo-app@latest sefti-mobile --template blank-typescript
cd sefti-mobile

# Copiar archivos de configuración
cp ../expo-setup/app.json .
cp ../expo-setup/package.json .

# Instalar dependencias
npm install
```

## 🧪 Probar en tu Smartphone

### 1. Instalar Expo Go
- **iOS**: App Store → "Expo Go"
- **Android**: Play Store → "Expo Go"

### 2. Iniciar el servidor
```bash
npx expo start
```

### 3. Escanear el QR
- **iOS**: Cámara → Escanear QR
- **Android**: Expo Go → Scan QR code

### 4. ¡App corriendo en tu teléfono! 🎉

## 📱 Diferencias Clave React Web vs React Native

### Componentes
```tsx
// ❌ React Web
<div className="container">
  <h1>Título</h1>
  <p>Texto</p>
  <button onClick={handleClick}>Click</button>
</div>

// ✅ React Native
<View className="container">
  <Text className="text-2xl font-bold">Título</Text>
  <Text>Texto</Text>
  <TouchableOpacity onPress={handleClick}>
    <Text>Click</Text>
  </TouchableOpacity>
</View>
```

### Storage
```tsx
// ❌ Web
localStorage.setItem('key', 'value')
const data = localStorage.getItem('key')

// ✅ React Native
import AsyncStorage from '@react-native-async-storage/async-storage'

await AsyncStorage.setItem('key', 'value')
const data = await AsyncStorage.getItem('key')
```

### Estilos
```tsx
// ❌ Web (CSS directo)
<div style={{ backgroundColor: 'red', padding: 20 }}>

// ✅ React Native (StyleSheet)
import { StyleSheet } from 'react-native'

<View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 20,
  }
})

// ✅ O con NativeWind (Tailwind)
<View className="bg-red-500 p-5">
```

### Navegación
```tsx
// ❌ Web
import { Link } from 'react-router-dom'
<Link to="/profile">Perfil</Link>

// ✅ React Native
import { useNavigation } from '@react-navigation/native'

const navigation = useNavigation()
navigation.navigate('Profile')
```

## 🎨 Componentes UI Básicos para SEFTI

Estos reemplazarían a los componentes de Shadcn:

### Button.tsx
```tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const Button = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity 
    style={[styles.button, styles[variant]]}
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#FF4D00',
  },
  secondary: {
    backgroundColor: '#FFB800',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
})
```

### Input.tsx
```tsx
import { TextInput, StyleSheet } from 'react-native'

export const Input = ({ value, onChangeText, placeholder, ...props }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#999"
    {...props}
  />
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
  }
})
```

### Card.tsx
```tsx
import { View, StyleSheet } from 'react-native'

export const Card = ({ children }) => (
  <View style={styles.card}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  }
})
```

## 📊 Ejemplo: Login Screen Native

```tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    // Validar credenciales
    const users = await AsyncStorage.getItem('demoUsers')
    // ... lógica de login
    
    navigation.navigate('Home')
  }

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#2d1a0f']}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>SEFTI</Text>
        <Text style={styles.subtitle}>
          Sistema de Educación Financiera
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              ¿No tienes cuenta? Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4D00',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFB800',
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF4D00',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#FFB800',
    textAlign: 'center',
    marginTop: 16,
  },
})
```

## ⏱️ Próximos Pasos

1. ✅ Crear proyecto Expo
2. ✅ Configurar NativeWind
3. ✅ Instalar dependencias
4. ⏳ Convertir Login screen
5. ⏳ Convertir Register screen
6. ⏳ Configurar Navigation
7. ⏳ Convertir componentes principales
8. ⏳ AsyncStorage para datos
9. ⏳ Gráficas con react-native-chart-kit
10. ✅ Probar en Expo Go

## 🎯 ¿Necesitas Ayuda?

Si decides convertir a React Native, puedo ayudarte a:
- Convertir cada componente paso a paso
- Configurar la navegación completa
- Adaptar las gráficas
- Crear el sistema de AsyncStorage
- Optimizar para performance

**¿Quieres que empiece a convertir los componentes?**
