import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // relative base so the build works on any static host / sub-path (e.g. GitHub Pages project sites)
    base: './',
    // the legacy source uses JSX inside .js files
    plugins: [react({ include: /\.(js|jsx)$/ })],
    esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
    optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
});
