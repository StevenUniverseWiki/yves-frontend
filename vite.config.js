import dotenv from 'dotenv';
import { version } from './package.json';

dotenv.config();

export default {
  root: './src',
  outDir: './dist',
  assetsDir: 'build',
  env: {
    ...process.env,
    ...{
      VITE_YVES_VERSION: version
    }
  },
  vueCompilerOptions: {
    isCustomElement: tag => {
      return tag.startsWith('ion-');
    }
  }
};