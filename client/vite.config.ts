import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@shared": path.resolve(__dirname, "../shared"),
      },
    },
   server: {
      port: 3000,
      open: true,
      cors: true,
      // Proxy API calls during development
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/graphql': {
          target: env.VITE_API_URL || 'http://localhost:4000',
          changeOrigin: true,
        },
        '/socket.io': {
          target: env.VITE_SOCKET_URL || 'ws://localhost:4000',
          ws: true,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks for better caching
            vendor: ['react', 'react-dom'],
            game: ['lucide-react'],
            state: ['@reduxjs/toolkit', 'react-redux'],
          },
        },
      },
      // Increase chunk size warnings for game assets
      chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lucide-react',
        '@reduxjs/toolkit',
        'react-redux'
      ],
    },

    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version || '1.0.0'),
      __DEV__: JSON.stringify(mode === 'development'),
    },

    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
  }
  }
)
