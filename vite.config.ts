import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'react-tw',
      formats: ['es', 'cjs'],
      fileName: (format) => `react-tw.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },
})
