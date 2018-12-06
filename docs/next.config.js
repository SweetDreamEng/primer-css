const {join, resolve} = require('path')
const withPlugins = require('next-compose-plugins')
const css = require('@zeit/next-css')
const sass = require('@zeit/next-sass')
const configure = require('./lib/config')

const {NODE_ENV, NOW_URL} = process.env

if (!NOW_URL) {
  const {watch} = require('./lib/sync')
  const watcher = watch({debug: true})
  process.on('exit', () => watcher.close())
}

const assetPrefix = NOW_URL || ''

module.exports = withPlugins([
  css(sass({
    sassLoaderOptions: {
      includePaths: [
        resolve(__dirname, '../modules')
      ]
    }
  })),
  configure()
], {
  /*
   * Note: Prefixing assets with the fully qualified deployment URL
   * makes them available even when the site is served from a path alias, as in
   * <https://primer.style/css>
   */
  assetPrefix,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    assetPrefix,
    production: NODE_ENV === 'production'
  }
})
