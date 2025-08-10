// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'dark',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/images/icon/LiuYingPure.svg'
        }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  
  image: {
    aliyun: {
      baseURL: process.env.NUXT_IMAGE_ALIYUN_BASE_URL || 'https://image-cdn.firefly-gallery.cn'
    },
  },

  components: {
    global: true,
    dirs: [
      {
        path: '~/components',
        ignore: ['**/index.ts', '**/index.js']
      }
    ]
  },

  vite: {
    assetsInclude: [ '**/*.lrc' ],
  },
})