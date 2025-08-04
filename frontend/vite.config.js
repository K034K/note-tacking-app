import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))


// https://vite.dev/config/
export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: '../dist'
    },
    server: {
        port: 8080
    },
    plugins: [react()],


    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    'import',
                    'mixed-decls',
                    'color-functions',
                    'global-builtin',
                ],
            },
        },
    },
})
