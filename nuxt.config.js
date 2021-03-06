import path from 'path'
import fs from 'fs'

require('dotenv').config()

const clientJson = JSON.parse(fs.readFileSync(path.join(__dirname, './clients.json')))

export default {
  env: {
    dev: process.env.NODE_ENV === 'development',
    caseStudyPassword: process.env.CLIENT_PAGE_PASSWORD
  },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /**
   * Custom generate routes for production
   */
  generate: {
    routes () {
      const caseStudies = clientJson.caseStudies
      const caseStudyRoutes = []
      for (const caseStudy of caseStudies) {
        caseStudyRoutes.push({
          route: '/casestudy/' + caseStudy.slug,
          payload: caseStudy
        })
      }
      return caseStudyRoutes
    }
  },
  /**
   * Middleware
   */
  router: {
    middleware: 'passwordProtect'
  }
}
