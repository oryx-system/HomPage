import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
        }),
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
        })
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'animation-vendor': ['framer-motion'],
              'utils': ['date-fns', 'clsx']
            }
          }
        },
        minify: 'esbuild',
        chunkSizeWarningLimit: 1000
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
