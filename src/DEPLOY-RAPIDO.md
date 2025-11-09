# ⚡ Deploy Rápido en Vercel (5 minutos)

## 📋 Antes de Empezar

Asegúrate de tener:
- ✅ Git instalado
- ✅ Cuenta en GitHub (gratis)
- ✅ Node.js instalado (opcional, solo para probar localmente)

---

## 🚀 Paso 1: Subir a GitHub (3 minutos)

### 1.1 Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: **`sefti-app`**
3. **NO marques** "Initialize with README"
4. Click **"Create repository"**

### 1.2 Subir tu código

Abre la terminal en la carpeta de tu proyecto SEFTI y ejecuta:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer primer commit
git commit -m "SEFTI - Sistema de Educación Financiera"

# Conectar con GitHub (REEMPLAZA 'TU-USUARIO' con tu username de GitHub)
git remote add origin https://github.com/TU-USUARIO/sefti-app.git

# Subir código
git branch -M main
git push -u origin main
```

**Si pide usuario/contraseña:** Usa un Personal Access Token de GitHub (no tu contraseña).

---

## 🌐 Paso 2: Desplegar en Vercel (2 minutos)

### 2.1 Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Elige **"Continue with GitHub"**
4. Autoriza Vercel

### 2.2 Importar proyecto

1. Click **"Add New..."** → **"Project"**
2. Busca **`sefti-app`** en la lista
3. Click **"Import"**

### 2.3 Configurar y desplegar

Vercel detecta todo automáticamente:

- ✅ Framework: **Vite**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

**NO cambies nada**, solo:

4. Click **"Deploy"** 🚀

### 2.4 Esperar (1-2 minutos)

Vercel hace el build y deploy automáticamente...

### 2.5 ¡Listo! 🎉

Vercel te muestra:
- ✅ Confetti de celebración
- ✅ Tu link público: `https://sefti-app.vercel.app`
- ✅ (o similar: `https://sefti-app-tu-usuario.vercel.app`)

---

## 📱 Paso 3: Probar en tu Smartphone

### 3.1 Abrir en el navegador

1. **Copia el link** que te dio Vercel
2. **Ábrelo en el navegador** de tu celular (Safari o Chrome)

### 3.2 Agregar a pantalla de inicio

**iPhone (Safari):**
1. Toca el botón **"Compartir"** (cuadro con flecha ↑)
2. Scroll down → **"Agregar a pantalla de inicio"**
3. **"Agregar"**
4. ¡Ahora SEFTI aparece como app! 📱

**Android (Chrome):**
1. Toca el **menú** (⋮) arriba a la derecha
2. **"Agregar a pantalla de inicio"**
3. **"Agregar"**
4. ¡App instalada! 📱

### 3.3 Probar login

```
Email: maria@demo.com
Contraseña: demo123
```

---

## 🔄 Cómo Modificar la App Después

### Opción A: Editar en tu computadora

```bash
# 1. Edita cualquier archivo
# 2. Guarda los cambios
# 3. Sube a GitHub:

git add .
git commit -m "Descripción de cambios"
git push

# 4. Vercel actualiza automáticamente el link en 1-2 minutos
```

### Opción B: Editar directo en GitHub

1. Ve a `github.com/TU-USUARIO/sefti-app`
2. Click en el archivo que quieres editar
3. Click en el **botón de lápiz** (Edit)
4. Haz tus cambios
5. **Commit changes**
6. Vercel actualiza automáticamente

**¡Así de fácil!** Cada vez que hagas push a GitHub, Vercel actualiza tu link.

---

## 🐛 Problemas Comunes

### "git: command not found"
**Solución:** Instala Git desde [git-scm.com](https://git-scm.com)

### "Permission denied (publickey)"
**Solución:** Usa HTTPS en lugar de SSH:
```bash
git remote set-url origin https://github.com/TU-USUARIO/sefti-app.git
```

### "El build falló en Vercel"
**Solución:** 
1. Ve al dashboard de Vercel
2. Click en el deployment que falló
3. Lee el error en "Build Logs"
4. Generalmente es un import mal escrito o dependencia faltante

### "Los cambios no se ven en el link"
**Solución:**
1. Limpia el caché: Ctrl+Shift+R (o Cmd+Shift+R en Mac)
2. Espera 1-2 minutos después del push
3. Verifica en Vercel dashboard que el deployment terminó

---

## 📊 Checklist Completo

- [ ] Código subido a GitHub ✅
- [ ] Desplegado en Vercel ✅
- [ ] Link público funciona ✅
- [ ] Probado en smartphone ✅
- [ ] Agregado a pantalla de inicio ✅
- [ ] Login funciona con cuentas demo ✅

---

## 🎯 Para el Hackathon

### Tu presentación ahora incluye:

1. **Link público:** `https://sefti-app.vercel.app`
   - Comparte con los jueces
   - Ellos pueden probarlo en sus propios dispositivos

2. **Demo en tu smartphone:**
   - Abre la app desde tu pantalla de inicio
   - Parece una app nativa
   - Funciona perfectamente

3. **Código abierto:**
   - GitHub: `github.com/TU-USUARIO/sefti-app`
   - Muestra el código si preguntan

---

## ✨ Ventajas de Este Setup

- ✅ **Gratis forever** (para proyectos personales)
- ✅ **Modificable infinitamente** (cada push actualiza el link)
- ✅ **Link compartible** (funciona en cualquier dispositivo)
- ✅ **Instalable** (se agrega a pantalla de inicio)
- ✅ **HTTPS automático** (seguro)
- ✅ **CDN global** (carga rápido en todo el mundo)
- ✅ **No requiere App Store** ni Google Play

---

## 🎉 ¡Eso es Todo!

**Tiempo total:** 5 minutos

**Resultado:** App funcionando en cualquier smartphone con un link compartible

**Modificaciones:** Ilimitadas y automáticas

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Lee el error completo
2. Busca en Google el mensaje de error
3. Revisa que todos los archivos estén en GitHub
4. Verifica que el package.json tenga todas las dependencias

**Archivos críticos que deben estar en la raíz:**
- ✅ package.json
- ✅ vite.config.ts
- ✅ tsconfig.json
- ✅ index.html
- ✅ main.tsx
- ✅ App.tsx
- ✅ vercel.json

---

**🇲🇽 ¡Éxito en el hackathon!**

Tu link: `https://sefti-app.vercel.app`

Compártelo con el mundo 🌎
