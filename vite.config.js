import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Expose environment variables to the client
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    server: {
      // This is needed to make esm.sh work
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || env.VITE_API_PROXY_TARGET || 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
        },
      },
      allowedHosts: [
        "*.ngrok-free.app",
        "6521c162de00.ngrok-free.app",
        "58d66f155f06.ngrok-free.app",
        "localhost:5173",
        "785ec7322ad9.ngrok-free.app"
      ]
    },
  };
});
