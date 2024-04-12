import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './express-plugin'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), express('/api')],
  }
})
