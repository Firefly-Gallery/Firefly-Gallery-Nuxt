<template>
  
  <NuxtImg
    v-slot="{ isLoaded, imgAttrs }"
    :src="src.replace('cdn://', '/')"
    :provider="src.startsWith('cdn://') ? 'aliyun' : 'ipx'"
    :alt="imgAlt"
    v-bind="$attrs"
    custom
  >
    <img
      v-if="isLoaded"
      v-bind="imgAttrs"
      ref="imgRef"
      :draggable="draggable"
    >
    <div v-else class="skeleton w-full h-full" />
  </NuxtImg>
</template>

<script setup lang="ts">
const imgRef = useTemplateRef('imgRef');

const prop = defineProps({
  src: {
    type: String,
    required: true
  },
  otherFormats: {
    type: Array,
    default: () => ['avif', 'webp']
  },
  draggable: {
    type: Boolean,
    default: false
  },
  imgAlt: {
    type: String,
    default: "图片加载失败"
  }
});

defineOptions({
  inheritAttrs: false
})

defineExpose({imgRef})
</script>

<style scoped lang="stylus">
picture, img
  transition all 250ms ease;

</style>