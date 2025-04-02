import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    resolve: {
        alias: {
            '@vars': '/src/config/constants/vars',
        },
    },
    plugins: [react(), tsconfigPaths()],
    base: 'only-test/',
});
