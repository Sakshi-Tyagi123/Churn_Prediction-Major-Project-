import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Add test config here
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // allows use of test() / expect() without import
    environment: 'jsdom',  // simulates browser environment for DOM
    setupFiles: './setupTests.js' // optional for jest-dom matchers
  }
})
