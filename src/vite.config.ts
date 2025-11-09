import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ apunta a tu carpeta de código fuente
    },
  },
  base: './', // ✅ evita errores de rutas en producción (importante en Vercel)
  build: {
    outDir: 'dist',
    sourcemap: false, // opcional, acelera el build
    emptyOutDir: true, // limpia antes de construir
  },
})
