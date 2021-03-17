import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'vite-plugin-components';
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';
import { version } from './package.json';

process.env = {...process.env, ...{
  VITE_YVES_VERSION: version
}}

export default defineConfig({
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons()
  ],
  server: {
    port: 3031
  }
})
