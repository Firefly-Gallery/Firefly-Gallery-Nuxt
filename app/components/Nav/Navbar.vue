<template>
  <div
  :class="{'nav-root': true, 'navbar-transparent': isTransparent, 'backdrop-blur-sm': enable_blur,
  'bg-[#181818f0]': !enable_blur, 'bg-base-100/80': enable_blur }">
    <div class="navbar-start">
      <!-- 手机版下拉式导航列表 -->
      <div class="dropdown hidden">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <img :src="siteIcon" class="rounded-full w-10 h-10" >
        </div>
        <ul tabindex="0" class="dropdown-content mt-3 z-[999] p-2 shadow bg-base-200 rounded-box w-32">
          <!-- 渲染手机导航列表 -->
          <li v-for="(navItem, index) in navigations" :key="index">
            <button class="btn w-full" @click="$router.push(navItem.pageName)">
              <Icon :name="navItem.icon" class="icon h-5 w-5" />
              {{ navItem.displayName }}
            </button>
          </li>
        </ul>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="首页">
        <button class="inline-flex btn btn-ghost btn-circle" @click="$router.push('/')">
          <img :src="siteIcon" class="rounded-full w-10 h-10" >
        </button>
      </div>
      <!-- 渲染电脑版导航列表 -->
      <div class="ml-2 flex gap-2">
        <template v-for="(navItem, index) in navigations" :key="index">
          <div v-if="navItem.pageName !== 'home'" class="tooltip tooltip-bottom" :data-tip="navItem.displayName">
            <button class="btn btn-circle btn-ghost" @click="$router.push(navItem.pageName)">
              <Icon :name="navItem.icon" class="icon h-5 w-5" />
            </button>
          </div>
        </template>
      </div>
    </div>
    <div class="navbar-end">

      <!-- 主题切换 -->
      <div class="tooltip tooltip-left" data-tip="亮/暗主题">

          <button
class="theme-toggle btn btn-circle btn-ghost text-gray-500 hover:text-primary"
                  @click="updateThemeStatus()">
              <Icon v-if="lightTheme" name="heroicons:sun" class="sun h-6 w-6 "/>
              <Icon v-else name="heroicons:moon" class="moon h-6 w-6 " />
          </button>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigations } from '@/navigations'
import { ref, onMounted } from 'vue'

const scrollY = useState('scrollY', () => 0)
const { enable_blur } = useSettings()

watch(scrollY, (newVal) => {
  if(newVal > 100) {
    isTransparent.value = false
  } else {
    isTransparent.value = true
  }
})

const lightTheme = ref(false)

const isTransparent = ref(true)
const siteIcon = '/images/icon/LiuYingPure.svg'

const updateThemeStatus = () => {
  lightTheme.value = !lightTheme.value
  const newTheme = lightTheme.value ? 'light' : 'dark'
  
  // Update HTML data-theme attribute
  if (import.meta.client) {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }
}

onMounted(() => {
  if(import.meta.server) return
  
  let storedTheme = localStorage.getItem('theme')
  if (storedTheme === null) {
    // Set default theme to dark
    lightTheme.value = false
    localStorage.setItem('theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    lightTheme.value = storedTheme === 'light'
    document.documentElement.setAttribute('data-theme', storedTheme)
  }
})

defineExpose({ updateThemeStatus })
</script>

<style scoped lang="postcss">
.nav-root {
  @apply navbar fixed top-0 shadow-md;
  z-index: 20;
  transition: all 250ms ease;
}

.navbar-transparent {
  background-color: transparent;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.icon {
  transition: scale 250ms ease, transform 250ms ease-out;
}

.theme-toggle svg {
  @apply w-5;
  transition: scale 250ms ease, transform 250ms ease-out !important;
}


button.settings:hover .icon {
  scale: 1.1;
  transform: rotate(90deg);
}

.theme-toggle:hover svg, button:hover .icon {
  scale: 1.2;
  color: var(--hover) !important;
}

.theme-toggle svg {
  transition: color 250ms ease;
}
</style>