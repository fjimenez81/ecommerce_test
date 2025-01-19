/// <reference types="vitest" />
/// <reference types="Vite/client" />

import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/test/setup.ts',
	},
	resolve: {
		alias: [
			{ find: '@components', replacement: path.resolve(path.join(__dirname, '/src/components')) },
			{ find: '@interfaces', replacement: path.resolve(path.join(__dirname, 'src/interfaces')) },
			{ find: '@services', replacement: path.resolve(path.join(__dirname, 'src/services')) }
		]
	}
})