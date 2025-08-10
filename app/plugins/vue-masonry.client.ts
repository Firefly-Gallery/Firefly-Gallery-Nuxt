import VueMasonry from 'vue-next-masonry'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMasonry)
})
