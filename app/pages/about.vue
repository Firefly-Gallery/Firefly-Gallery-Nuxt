<template>
  <div class="general-container flex flex-col">
    <div class="title-container">
      <div class="title">
        <h2><i>崩坏:星穹铁道——</i></h2>
        <h1>流萤图站</h1>
      </div>
    </div>
    <div class="content flex flex-col xl:flex-row items-center justify-around gap-10">
      <div class="grow max-w-[820px] flex flex-col min-h-[100vh]">
        <div class="quote">
          <i><p>欢迎来到萤门的专属相册（流萤图站）！这是专属于流萤的迷人世界，我们汇聚了大量精选的图片，展现她的美貌与温柔；<br>
            这也是属于所有萤门信徒的世界，你可以浏览和保存和你喜爱的流萤美图，与大家一起沉浸在流萤小姐的美貌之中。<br>
            愿萤火照亮开拓之旅，愿流萤永远有着幸福的明天！</p>
            <p>萤门！</p></i>
          <p class="text-end">By
            <a
target="_blank"
            href="https://www.miyoushe.com/sr/accountCenter/postList?id=332560835">
              @一位旅行者啊
            </a>（有改动）
          </p>
        </div>
        <div class="lg:text-lg mt-5">
          流萤图站(库)，立项于2023-12-23，是一个精选集合了崩坏:星穹铁道的角色流萤的同人画作的网站。<br>
          虽然说是立项，但是几个月过去了都没有正式上线呢（<br>
          本网站设立的初衷本来是一个同人网站，后为满足同人社区的需要转型为一个同人图站<br>
          当然网站主体还是以厨为主（连角色介绍都有了），重点看个人理解罢。<br>
          总而言之，希望大家玩的开心！<br>
        </div>
        <Image class="mt-16 rounded-box shadow-lg" src="cdn://pixiv/115952605_p0.jpg"/>

      </div>
      <div class="sidebar">
        <div class="sidebar-card">
          <h2>反馈社区</h2>
          <a
            class="sidebar-link-share"
             target="_blank" href="https://github.com/Firefly-Gallery/Firefly-Gallery-Vue/issues">
            <i class="fa-brands fa-github"/>
            Github Issues
          </a>
          <a
            class="sidebar-link-share"
             target="_blank" href="https://pd.qq.com/s/ftb23afp3">
            <i class="fa-solid fa-link"/>
            QQ频道【流萤小姐后援会🌟(萤门)】
          </a>
          <a
            class="sidebar-link-share"
             target="_blank" href="https://discord.gg/EDTq3eu7">
            <i class="fa-solid fa-link"/>
            <span class="line-through text-gray-600">Discord频道【Firefly Gallery】（墙）（已弃用）</span>
          </a>
          <a
            class="sidebar-link-share"
             target="_blank" href="https://dby.miyoushe.com/chat/18581/221407">
            <i class="fa-solid fa-link"/>
            <span class="line-through text-gray-600">旧米游社别野（已成为时代的眼泪）</span>
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Image from '@/components/UI/Image.vue'


useHead({
  title: '关于 | 流萤图站',
  meta: [
    { name: 'description', content: '关于 | 流萤图站' },
  ],
})
</script>
<style lang="postcss" scoped>
.chat-bubble::before {
  width: 0;
}

.title-container {
  @apply grow flex flex-col gap-5
  justify-center items-center my-8;
}
.title {
  @apply gap-5 mb-4
  flex flex-col justify-center;
}
.title h1 {
  @apply z-[10] pb-1 md:pb-[15px]
  text-8xl md:text-7xl lg:text-8xl
  font-bold;
  background: linear-gradient(to right, #ebe1a3, #94e1c8);
  text-shadow: 0 3px 15px #ffffff3a;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title h2 {
  @apply z-[10]
  text-2xl md:text-lg lg:text-3xl
  font-bold;
  text-shadow: 0 3px 15px #ffffff3a;
}

.quote {
  @apply text-gray-600;
}

.sidebar {
  @apply grow flex flex-col items-center gap-5
  w-full xl:max-w-[500px] xl:w-[unset] xl:h-screen;
}

.sidebar-card {
  @apply bg-base-200 w-full flex flex-col items-center p-5 gap-3
  rounded-box shadow-md;
}
.sidebar-card h2 {
  @apply text-3xl;
}
.sidebar-card h3 {
  @apply mt-3
}
.sidebar-link {
  @apply btn btn-ghost rounded-full w-full justify-between no-animation;
}
.sidebar-link-share {
  @apply btn rounded-full w-full justify-start;
}
.sidebar-link .p-link {
  @apply btn btn-sm btn-ghost btn-circle;
}
.general-container {
  @apply px-10 xl:px-20
}
</style>
<style>

</style>
