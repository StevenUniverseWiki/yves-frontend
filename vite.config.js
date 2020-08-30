import svelte from 'vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import dotenv from 'dotenv';
import { version } from './package.json';

dotenv.config();

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
    ...process.env,
    ...{
      VITE_YVES_VERSION: version
    }
  },
  rollupDedupe: ['svelte'],
};