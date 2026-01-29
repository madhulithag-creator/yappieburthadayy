export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
})
