import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  
  return {
    plugins: [react(), tailwindcss()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR can be disabled via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during automated updates.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
