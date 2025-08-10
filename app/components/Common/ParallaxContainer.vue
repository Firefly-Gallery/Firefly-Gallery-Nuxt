<template>
  <section ref="containerRef" class="parallax-container">

    <div
      ref="bgRef"
      :class="{'parallax-bg': true, 'hide': !isExtraLoaded}" :style="bgStyle">
      <slot name="content"/>
    </div>

    <Image
      ref="imgBgRef"
      :class="{'parallax-bg': true, 'hide': isExtraLoaded}"
      :src="src? src: ''" :style="bgStyle" @load="onImageLoad" />

    <div ref="parallax_content" :class="contentClass">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import Image from '../UI/Image.vue'

const isExtraLoaded = ref(false)

let bgValue = ref<HTMLElement | null>(null);
const containerRef = useTemplateRef('containerRef')
const parallax_content = useTemplateRef('parallax_content')

const bgRef = useTemplateRef('bgRef')
const imgBgRef = useTemplateRef('imgBgRef')

const scrollY = useState('scrollY', () => 0)

const props = defineProps({
  w: { type: String, default: '100vw' },
  h: { type: String, default: '100vh' },
  src: { type: String, default: '' },
  contentClass: { type: String, default: '' },
  extraContent: { type: Boolean, default: false },
  static: { type: Boolean, default: false },
  margin: { type: Number, default: 256 },
  imageZ: { type: Number, default: -1 }
})

const bgStyle = reactive({ 
  zIndex: props.imageZ, 
  height: "100vh", 
  width: "100vw", 
  transform: "translateY(0px)",
  left: "50%",
  top: "50%",
  marginLeft: "-50vw",
  marginTop: "-50vh"
})

const { parallax_bg } = useSettings()

// Calculate parallax offset based on scroll position
const calculateParallaxOffset = () => {
  if (import.meta.server) return 0
  if (!parallax_bg.value) return 0
  if (props.static) return 0
  if (!containerRef.value) return 0
  
  const containerRect = containerRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  
  // Calculate how much of the container is visible
  const containerTop = containerRect.top
  const containerHeight = containerRect.height
  
  // Calculate progress through the viewport (0 to 1)
  // When container is above viewport: progress > 1
  // When container is below viewport: progress < 0
  // When container is in viewport: progress between 0 and 1
  const progress = (viewportHeight - containerTop) / (viewportHeight + containerHeight)
  
  // Map progress to parallax range: -margin to +margin
  const parallaxOffset = (progress - 0.5) * props.margin * 2
  
  // Clamp to the margin range
  return Math.max(-props.margin, Math.min(props.margin, parallaxOffset))
}

// Watch scrollY and update transform
watch(scrollY, () => {
  if (import.meta.server) return
  
  const offset = calculateParallaxOffset()
  bgStyle.transform = `translateY(${offset}px)`
}, { immediate: true })

function GetViewportSize() {
  return {
    w: (window.innerWidth || document.documentElement.clientWidth),
    h: (window.innerHeight || document.documentElement.clientHeight)
  }
}

function GetBGSize() {
  if(!bgValue.value) return {w: 1, h: 1}
  if(bgValue.value instanceof HTMLVideoElement) {
    return {
      w: bgValue.value?.videoWidth ?? 1,
      h: bgValue.value?.videoHeight ?? 1
    }
  }
  else if(bgValue.value instanceof HTMLImageElement) {
    return {
      w: bgValue.value?.naturalWidth ?? 1,
      h: bgValue.value?.naturalHeight ?? 1
    }
  } else {
    return {
      w: bgValue.value?.offsetWidth ?? 1,
      h: bgValue.value?.offsetHeight ?? 1
    }
  }
}

function getContentRect() {
  if(parallax_content.value) return parallax_content.value.getBoundingClientRect();
  return null
}

defineExpose({getContentRect})

function SetRealHeight() {
  const { w, h } = GetViewportSize()
  if (bgValue.value && containerRef.value) {
    let realH = (h + props.margin)
    bgStyle.height = realH + 'px'
    let bgSize = GetBGSize()
    let realW = realH / bgSize.h * bgSize.w
    bgStyle.width = Math.max(realW, w) + 'px'
    bgStyle.left = '50%'
    bgStyle.top = '50%'
    bgStyle.marginLeft = `-${Math.max(realW, w) / 2}px`
    bgStyle.marginTop = `-${realH / 2}px`
  }
}

watch(() => props.extraContent, (newValue) => {
  if(import.meta.server) return
  isExtraLoaded.value = newValue
  if(newValue) {
    bgValue.value = bgRef.value;
    nextTick(() => {
      SetRealHeight()
    })
  } else {
    nextTick(() => {
      if(imgBgRef.value?.imgRef) {
        bgValue.value = imgBgRef.value.imgRef
        SetRealHeight()
      }
    })
  }
}, { immediate: true })

function onImageLoad() {
  if(imgBgRef.value?.imgRef) {
    bgValue.value = imgBgRef.value.imgRef
  }
  nextTick(() => {
    SetRealHeight()
  })
}


onMounted(() => {
  if(import.meta.server) return
  
  // Initial setup with a slight delay to ensure DOM is ready
  setTimeout(() => {
    if(imgBgRef.value?.imgRef) {
      bgValue.value = imgBgRef.value.imgRef
    }
    SetRealHeight()
  }, 50)

  // Add resize listener
  const handleResize = () => {
    SetRealHeight()
  }
  window.addEventListener('resize', handleResize)
  
  // Cleanup on unmount
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
});

</script>

<style>
.parallax-container {
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
  width: 100svw;
  height: 100svh;
}

.parallax-container .parallax-bg {
  position: absolute;
  transform-origin: center center;
  top: 50%;
  left: 50%;
  margin-left: -50vw;
  margin-top: -50vh;
  object-fit: cover;
  overflow: hidden;
  transition: opacity 0.4s;
  max-width: unset;
  min-width: 100vw;
  min-height: 100vh;
  will-change: transform;
}

div.parallax-bg {
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hide {
  opacity: 0;
  pointer-events: none;
}
</style>