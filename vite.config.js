import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-extension-files',
      writeBundle() {
        const distDir = resolve(__dirname, 'dist');
        if (!existsSync(distDir)) {
          mkdirSync(distDir, { recursive: true });
        }
        
        // Copy manifest
        copyFileSync(
          resolve(__dirname, 'public/manifest.json'),
          resolve(distDir, 'manifest.json')
        );
        
        // Copy vanilla JS files (background, content, chatbot)
        const filesToCopy = [
          'background.js',
          'content.js',
          'chatbot.js',
          'styles.css',
          'chatbot.css'
        ];
        
        filesToCopy.forEach(file => {
          try {
            copyFileSync(
              resolve(__dirname, 'public', file),
              resolve(distDir, file)
            );
          } catch (e) {
            console.warn(`Could not copy ${file}:`, e.message);
          }
        });
        
        console.log('✅ Extension files copied to dist/');
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        options: resolve(__dirname, 'src/options/index.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Keep CSS files with simple names
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    copyPublicDir: false // We're manually copying files
  }
});
