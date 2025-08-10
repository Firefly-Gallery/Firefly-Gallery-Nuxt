<template>
  <Home-MouseParallaxImage ref="randomImageRef" @load="setActivaArtwork()" :blur="blurBG" :enabled="!blurBG"></Home-MouseParallaxImage>
  <div :class="`home-content ${blurBG ? 'bg-base-300/70' : 'bg-base-100/50'}`" ref="headerRef">
      <Home-HelloWorld
        @hover="() => {if(enable_blur){blurBG=true;}}"
        @unhover="() => {if(enable_blur){blurBG=false;}}" :active-artwork="activeArtwork"></Home-HelloWorld>
  </div>
  <div :class="`gallery-container`">
    <Gallery-ArtworksContainer :artworks="galleryData" @need-update="update()" :loaded="allLoaded" :total="total" />
  </div>
</template>

<script lang="ts" setup>

const blurBG = ref(false)
const allLoaded = ref(false)

const randomImageRef = ref();
const headerRef = ref();
const galleryData = ref<ArtworkItem[]>([])

const { enable_blur } = useSettings()

const activeArtwork = ref<Artwork>()
const total = ref(0)

let maxPage = 999;
let page = 0;

async function update() {
  page++;
  if(page > maxPage) {
    allLoaded.value = true;
    return
  }
  
  try {
    const {data} = await useFetch<{
      total: number;
      pages: number;
      images: ArtworkItem[];
      current_page: number;
    }>(`/api/list?page=${page}`, {
      key: `gallery-${page}`,
      server: false
    })
    
    if (data.value) {
      const original = [...galleryData.value]
      maxPage = data.value.pages;
      galleryData.value = original.concat(data.value.images);
      total.value = data.value.total;
    }
  } catch (error) {
    console.error('Failed to load gallery data:', error)
  }
}

onMounted(() => {
  update()
})



function setActivaArtwork(){
  if(randomImageRef.value) {
    activeArtwork.value = randomImageRef.value.activeArtwork
  }
}


</script>

<style lang="postcss">

.home-content {
    @apply w-screen h-[100lvh] p-0 flex;
    box-shadow: inset 0 -3px 10px 0 #00000033;
    transition: all 250ms ease;
}
.parallax-container .two-row {
    @apply flex flex-col
    md:grid md:grid-cols-2;
}
.parallax-container  .col-reverse {
    @apply flex-col-reverse;
}
.title-poem p{
    @apply text-sm opacity-[0.5];
}
.gallery-container {
  @apply px-2 md:px-16 lg:px-20 pb-20 pt-8 w-full min-h-[200vh]
  bg-base-300/30 relative z-[2];
}
[data-theme='dark'] .gallery-container {
  @apply bg-base-300/90
}
.pagination-container {
  @apply w-full flex justify-center mt-10;
}
</style>
