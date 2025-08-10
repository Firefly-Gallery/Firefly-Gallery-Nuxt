<template>
  <!-- 加载动画 -->
  <!-- 导航栏 -->
  <Nav-Navbar ref="navbarRef" />
  <!-- 页面视图 -->
  <custom-scrollbar
    ref="scroll"
    :class="'scrollContainer'"
    :auto-hide-delay="1000"
    :thumb-width="10"
  >
    <NuxtPage />
    <Nav-Footer ref="footerRef" />
  </custom-scrollbar>
  <!-- 加载 -->
  <Loading />
  <!-- 弹窗组件 -->
  <Component
    :is="item.component"
    v-for="(item, key) in popupComponents"
    :key="key"
    :index="item.index"
    :name="key"
    @close="closeWindow"
  />
  <!-- aplayer -->
  <ClientOnly>
    <Common-Player />
  </ClientOnly>
  <ErrorLogModal />
</template>

<script lang="ts" setup>
import CustomScrollbar from 'custom-vue-scrollbar';
import 'custom-vue-scrollbar/dist/style.css';
import { useRouter } from 'vue-router';
import { closeWindow, closeCurrentWindow, popupComponents } from '@/components/Popup';
import ErrorLogModal from '@/components/Popup/ErrorLogModal.vue'
import Loading from '@/components/Loading/Loading.vue'

const router = useRouter();

const navbarRef = ref();
const scroll = useTemplateRef<{ scrollEl: HTMLDivElement }>('scroll');
// const scroll = ref<HTMLDivElement>();
const footerRef = ref();

const loading = useState('loading', () => true)

const scrollY = useState('scrollY', () => 0)

const settings = useSettings()

onMounted(() => {
  if(scroll.value) {
    scroll.value.scrollEl.addEventListener('scroll', () => {
      if(scroll.value) {
        scrollY.value = scroll.value.scrollEl.scrollTop;
      }
    });
  }
  
  // Add keyboard event listener for popup system
  if(import.meta.client) {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Escape':
          closeCurrentWindow()
          break;
      }
    });
  }

  // Hide loading on initial page load (client-side only)
  if(import.meta.client) {
    nextTick(() => {
      // Small delay to ensure loading component is fully mounted
      setTimeout(() => {
        if(settings.loading) {
          loading.value = false;
        }
      }, 50);
    });
  }
  
  // 切换页面时显示加载动画 (only for actual navigation, not initial load)
  router.beforeEach((to, from, next) => {
    if(!settings.loading || !from.name) {
      next();
      return;
    }
    // 显示加载动画
    if(settings.loading) {
      loading.value = true;
      setTimeout(() => {
        next();
      }, 250);
    } else {
      next();
    }
  });
  router.afterEach(() => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
      // 页面导航完成后隐藏加载动画 (only for actual navigation)
      if(scroll.value) {
        scroll.value.scrollEl.scrollTop = 0;
      }
      if(settings.loading) {
        setTimeout(() => {
          loading.value = false;
        }, 500);
      }
    });
  });
});

</script>
<style lang="stylus" scoped>

#popup-container
  position fixed
  top 0
  left 0
  transform-origin left top

</style>
<style lang="stylus">
.scrollContainer
  @apply w-screen h-screen overflow-x-hidden overflow-y-scroll;
  height 100svh
.scrollbar__thumbPlaceholder
  z-index 20
  .scrollbar__thumb
    background-color inherit!important
    background linear-gradient(to bottom, #68ffba50, #71efff50)
  &:not(.scrollbar__thumbPlaceholder--scrolling, :hover)
    pointer-events none
    opacity 0!important
.page-main
  @apply overflow-x-hidden overflow-y-auto h-screen;
  transform-style: preserve-3d;
  perspective: 1px;

  /* width */
  &::-webkit-scrollbar
    width: 0;

</style>
