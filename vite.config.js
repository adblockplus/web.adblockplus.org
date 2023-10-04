import solidPlugin from 'vite-plugin-solid';

export default {
  root: 'static/components',
  build: {
    outDir: '.',
    assetsDir: '.',
    sourcemap: true,
    outFile: 'main.js',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
      input: {
        main: 'static/components/index.js',
      },
    },
  },
  plugins: [
    solidPlugin(),
  ],
}