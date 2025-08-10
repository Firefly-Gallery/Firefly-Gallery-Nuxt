<template>
  <div class="flex items-center mx-5 mt-14 mb-8 gap-3">
    <p>共 {{total}} 张画作</p>
    <div class="grow"></div>
    <div role="tablist" class="tabs tabs-boxed gap-2 p-2 rounded-xl">
      <button role="tab" :class="`tab btn btn-sm ${useMasonry ? 'btn-ghost':'btn-primary'}`"
      @click="toggleMasonry(false)">
        <Icon name="heroicons:squares-2x2" class="h-6 w-6" />
      </button>
      <button role="tab" :class="`tab btn btn-sm ${useMasonry ? 'btn-primary':'btn-ghost'}`"
      @click="toggleMasonry(true)">
        <Icon name="heroicons:adjustments-vertical" class="h-6 w-6" />
      </button>
    </div>
  </div>

  <ClientOnly>
    <masonry
      :cols="{default: 6, 1440: 5, 1200: 4, 720: 3, 512: 2}" :key="updateKey"
      :gutter="{default: '20px', 700: '8px'}" :class="'masonry-root'"
    >
      <ImageItem
        v-for="(item, index) in artworks.concat(Array(6 * (Number(!loaded))).fill({id: '-1', size: [100, 100], thumb: ''}))"
        :imageData="item"
        :key="item.id"
        :index="index"
        :art_index="index"
        :art_id="item.id"
        :useMasonry="useMasonry"
        ref="containersRef"
        @mounted="applyObserver"
      ></ImageItem>
    </masonry>
  </ClientOnly>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import ImageItem from '@/components/Gallery/ImageItem.vue'
import type { ArtworkItem } from '@/utils/artworks'

const updateKey = ref(0)
let updating = false;

const props = defineProps<{
  artworks: ArtworkItem[]
  loaded: boolean
  total: number
}>()

const useMasonry = ref(true);
const containersRef = ref<typeof ImageItem[]>([]);
const artIndexList = ref<number[]>([])

const emit = defineEmits(['needUpdate'])

watch(() => props.artworks, () => {
  nextTick(() => {
    containersRef.value.forEach((element, index) => {
      const imageIndex = getElementArtIndex(element.getContainer())
      if(!imageIndex && imageIndex !== 0) return;
      artIndexList.value[imageIndex] = index;
    });
    setTimeout(() => {updating = false;}, 200);
  })
})

const getElementArtIndex = (element:Element) => {
  let imageIndexAttr = element.getAttribute("art_index")
  let imageId = element.getAttribute("art_id")
  if (
    (imageIndexAttr) &&
    (imageId && imageId !=="-1")
  ) {
    return parseInt(imageIndexAttr);
  } else return undefined;
}

// const fields = ['author', 'img', 'size', 'src', 'thumb', 'time']
const toggleMasonry = (v:boolean) => {
  useMasonry.value = v;
}

const { lazy_load } = useSettings()

const applyObserver = (container:HTMLElement, fill:any) => {
  if(import.meta.server) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const imageElement = entry.target
      if(imageElement.getAttribute("art_id") === "-1") {
        if(!updating) {emit("needUpdate");}
        updating = true;
        return;
      }
      const imageIndex = getElementArtIndex(imageElement)
      if(!imageIndex && imageIndex !== 0) {return;}
      const realIndex = artIndexList.value[imageIndex];
      if(realIndex === undefined) {return;}
      const imageItem = containersRef.value[realIndex];
      if(!imageItem) {return;}
      if (entry.isIntersecting) {
        if(!imageItem.srcFilled) {imageItem.fillSrc();}
      }
    });
  });
  if(lazy_load.value) {
    observer.observe(container);
  } else {
    fill();
  }
}





</script>

<style lang="postcss">
.masonry-root {
  @apply select-none;
}
</style>
<style scoped lang="stylus">

</style>