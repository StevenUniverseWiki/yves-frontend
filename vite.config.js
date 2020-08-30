import svelte from 'vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { version } from './package.json';

export default {
  plugins: [
    svelte({
      preprocess: preprocess({
        postcss: true
      })
    })
  ],
  root: './src',
  outDir: './dist',
  assetsDir: 'build',
  env: {
    VITE_YVES_VERSION: version
  },
  rollupDedupe: ['svelte'],
};