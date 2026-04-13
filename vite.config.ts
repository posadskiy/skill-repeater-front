import path from 'node:path';
import { fileURLToPath } from 'node:url';

import faroUploader from '@grafana/faro-rollup-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === 'production' && process.env.GRAFANA_OBSERVABILITY_FARO_TOKEN
      ? [
          faroUploader({
            appName: 'repeaty',
            endpoint: 'https://faro-api-prod-eu-west-2.grafana.net/faro/api/v1',
            appId: '5518',
            stackId: '1586681',
            verbose: true,
            apiKey: process.env.GRAFANA_OBSERVABILITY_FARO_TOKEN,
            gzipContents: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: 'hidden',
  },
}));
