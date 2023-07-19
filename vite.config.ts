import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/learnquest-react-ts",
  server: {
    port: 3000,
  },
  plugins: [react()],
})
