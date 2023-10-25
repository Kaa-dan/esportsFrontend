import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:4000,
    proxy:{
      "/api":{
        target:"https://esportsbackend-7ask.onrender.com",
        changeOrigin:true
      }
    }
  }
})
