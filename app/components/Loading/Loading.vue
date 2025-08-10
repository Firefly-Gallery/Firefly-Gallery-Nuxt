<template>
    <div id="loading" :class="{'loading_out': !loading}" @touchstart.prevent>
      <iframe src="/static/loading/firefly_icon_anim.html"/>
      <div id="loading_indicator" :class="{'loading_out': !loading}">
        <LoadingIcon :is-loading="true" />
        <p>加载中... {{ loading }}</p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import LoadingIcon from './LoadingIcon.vue';

const loading = useState('loading', () => true)

</script>
<style scoped lang="postcss">
* {
  --delay: 1000ms;
}

#loading.loading_out, #loading.loading_out iframe {
  opacity: 0;
  pointer-events: none;
  transition: pointer-events 0s linear calc(var(--delay)),
  opacity calc(var(--delay)) ease;
}

#loading {
  @apply fixed top-0 right-0 left-0 bottom-0 z-[114514] pb-20 bg-black;
  opacity: 1;
  transition: opacity 200ms ease;
}

#loading iframe {
  @apply w-full h-full;
  color-scheme: none;
}

#loading_indicator {
  @apply absolute bottom-0 left-0
  flex flex-col items-center z-[114515] p-[20px] gap-3;
  opacity: 1;
  transition: all 250ms ease;
}
#loading_indicator.loading_out {
  opacity: 0;
}
#loading_indicator p {
    @apply text-xl font-bold;
    animation: loading-text-animate 1.5s ease infinite;
}
@keyframes loading-text-animate {
    from {
        opacity:1
    }
    50% {
        opacity:0.3
    }
    to {
        opacity:1
    }
}
</style>
