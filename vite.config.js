import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// На GitHub Pages проект живёт по пути /blink-schools/, поэтому base нужен
// только для прод-сборки; в dev оставляем корень.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/blink-schools/' : '/',
  plugins: [react()],
  server: { port: 5173, open: true }
}))
