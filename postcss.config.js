const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    // require('tailwindcss'),
    purgecss({
      content: [
        './src/index.html',
        './src/App.svelte',
        './src/**/*.svelte'
      ],
      whitelistPatterns: [/svelte\-/]
    })
  ]
}
