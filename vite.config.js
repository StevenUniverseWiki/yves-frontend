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
  assetsDir: 'build',
  env: {
    VITE_YVES_VERSION: version
  },
  rollupDedupe: ['svelte'],
};