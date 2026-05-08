import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // base is /shristi-birthday/ in production so GitHub Pages serves assets correctly
  // local dev stays at / so npm run dev still works as usual
  base: command === 'build' ? '/shristi-birthday/' : '/',
}));
