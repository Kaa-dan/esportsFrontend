import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 4000,
    proxy:{
      "/api":{
        target:process.env.VITE_API_SERVER_URL,
        changeOrigin:true
      }
    }
  }
})
