<template>
  <ParallaxContainer
ref="portraitLayer" :src="'cdn://static/images/Introduction/AvatarPortrait.png'"
  :extra-content="spineLoaded" :content-class="'content-nodark'" :margin="300" :image-z="0">
    <template #content>
      <iframe ref="spineAnim" class="w-full h-screen"/>
    </template>

    <div class="chardesc-container">
        <div class="Up">
            <div class="char-name-block">
              <Image src="cdn://static/images/Introduction/FireflyIconWhite.svg" :other-formats="[]" class="h-[100px] sm:h-[150px] md:h-[200px] drop-shadow-md" />
                <div class="icons">
                    <Image src="cdn://static/images/Introduction/FiveStarsIcon.svg" class="h-4 md:h-7 drop-shadow-md" :other-formats="[]" />
                    <Image src="cdn://static/images/Introduction/FireIcon.png" class="h-4 md:h-10 drop-shadow-md" />
                    <Image src="cdn://static/images/Introduction/DestinyIcon.png" class="h-4 md:h-10 drop-shadow-md" />
                </div>
            </div>
            <div class="top-right">
                <p class="quote quote-start"><span> 「</span>我梦见一片焦土，一株破土而生的新蕊；</p>
                <p class="quote quote-end">它迎着朝阳绽放，向我低语呢喃。<span>」</span></p>
            </div>
        </div>
        <div class="Down">
            <table class="table">
            <tbody>
                <tr style="display:none">
                    <th>全名/本名</th>
                    <td colspan="3"/>
                </tr>
                <tr>
                    <th style="width:100px">稀有度</th>
                    <td colspan="3">★ ★ ★ ★ ★</td>
                </tr>
                <tr>
                    <th>命途</th>
                    <td colspan="3">毁灭</td>
                </tr>
                <tr>
                    <th>战斗属性</th>
                    <td colspan="3">火</td>
                </tr>
                <tr>
                    <th>阵营</th>
                    <td colspan="3">
                        星核猎手
                    </td>
                </tr>
            </tbody>
            </table>
            <div class="bottom-right">
                <div class="flex gap-2">
                    <a target="_blank" href="https://bbs.mihoyo.com/sr/wiki/content/2674/detail?bbs_presentation_style=no_header" class="btn2">
                      <Icon name="heroicons:link" class="h-6 w-6 text-gray-500" />
                    </a>
                    <button
                    class="btn2" 
                    @click="openWindow('imageViewer', {
                      title: '立绘',
                      'src': ['cdn://static/images/Introduction/AvatarPortrait.png', 'cdn://static/images/Introduction/AvatarPoster2.jpg', 'cdn://static/images/Introduction/AvatarPoster1.jpg']
                    })">
                      <Icon name="heroicons:arrows-pointing-out" class="h-6 w-6 text-white" />
                    </button>
                  <button :disabled="changePortraitBtnDisabled" class="btn2" @click="changePortrait()">
                    <Icon v-if="spineIframeSrcFilled" name="heroicons:photo" class="h-6 w-6 text-white" />
                    <Icon v-else name="heroicons:sparkles" class="h-6 w-6 text-white" />
                  </button>
                  <button class="btn2" @click="openWindow('modelViewer')">
                    <Icon name="heroicons:cube" class="h-6 w-6 text-white" />
                  </button>
                </div>
                <p class="char-description">
                  星核猎手成员，身着机械装甲「萨姆」的少女。<br>
                  以兵器的身份诞生，因基因改造罹患「失熵」的痛苦。<br>
                  为寻求生命的意义加入星核猎手，不断追逐违抗命运的方式。
                </p>
            </div>
        </div>
    </div>
  </ParallaxContainer>
</template>

<script lang="ts" setup>
import ParallaxContainer from '../Common/ParallaxContainer.vue';
import { openWindow } from '@/components/Popup';
import Image from '@/components/UI/Image.vue'

// const showOverlay: Ref<boolean> = ref(true);
const portraitLayer = ref()
const spineLoaded = ref(false);
const changePortraitBtnDisabled = ref(true);
let spineIframeSrcFilled = false

// const ModelPreviewer = ref();
const spineAnim = ref()
// function LoadModelPreview() {
//     ModelPreviewer.value.src = "https://firefly-render-three.pages.dev/index.html"
//     showOverlay.value = false
// }

const fillSrc = () => {
  spineAnim.value.src = '/static/spine/firefly_spine_anim.html';
  spineIframeSrcFilled = true;
  changePortraitBtnDisabled.value = true;
}


const receiveMessage = (ev) => {
  if(ev.data.message === 'spineCompleteLoad' && spineIframeSrcFilled) {
    setTimeout(() => {
      spineLoaded.value = true;
      changePortraitBtnDisabled.value = false;
    }, 100)
  }
}

const changePortrait = () => {
  if(spineIframeSrcFilled) {
    changePortraitBtnDisabled.value = true;
    spineIframeSrcFilled = false;
    spineLoaded.value = false;
    setTimeout(() => {
      spineAnim.value.src = "";
      changePortraitBtnDisabled.value = false;
    }, 400)
  } else {
    fillSrc()
  }

}

onMounted(() => {
  if (document.readyState === "complete") {
    fillSrc()
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === "complete") {
        fillSrc()
      }
    });
  }
  window.addEventListener('message', receiveMessage)
})

</script>

<style lang="postcss">
.parallax-container .content-nodark {
    @apply w-full h-full pt-20;
    background: none;
}
.rwd {
  @apply ml-52;
}
</style>

<style scoped lang="postcss">
iframe {
  color-scheme: none;
  @apply w-full h-full;
}
.chardesc-container {
    @apply relative w-full h-full z-[10]
    pb-4 px-4 lg:px-10
    flex-grow flex flex-col gap-2 lg:gap-5 items-stretch text-white;
}
.Up {
    @apply flex-grow flex flex-col md:flex-row gap-2 md:gap-5 items-start justify-center h-auto md:h-[100%];
}
.top-right {
    @apply w-full md:w-auto p-2;
}
.icons {
    @apply flex flex-row items-center h-4 md:h-8 ml-2 my-2 md:my-5 gap-3;
}
.quote {
    @apply relative z-[10] pb-1 md:pb-[15px]
    text-sm sm:text-base md:text-lg lg:text-xl;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.51);
    color: #ffffff;
    font-weight: 700;
    font-family: Hanyiwenhei, Arial, sans-serif;
}
.quote span {
    @apply text-2xl;
    text-decoration: none;
}
.quote-start {
    @apply mr-0 md:mr-20;
}
.quote-end {
    @apply text-right pb-0;
}
.Down {
    @apply flex flex-col lg:flex-row gap-2 lg:gap-5 items-end justify-between h-auto lg:h-[100%];
}
.char-name-block {
    @apply flex-grow flex flex-col items-start;
}
h2.char-name {
    @apply text-8xl;
    text-shadow: 0 3px 15px #ffffff5a;
    font-family: Hanyiwenhei, Arial, sans-serif;
}
p.char-name-sub {
    @apply text-xl pt-2 pl-3;
    text-shadow: 0 3px 15px #ffffff5a;
    font-family: Hanyiwenhei, Arial, sans-serif;
}
.char-description {
    @apply text-xs sm:text-base p-5 bg-[#00000050] border-2 border-black w-full lg:w-auto;
}
.btn2 {
    @apply btn btn-ghost grow btn-sm lg:btn-md lg:w-auto lg:px-5;
}
.bottom-right {
    @apply flex flex-col-reverse lg:flex-col w-full lg:w-auto items-stretch lg:items-end gap-3;
}
table {
    @apply hidden sm:table w-full lg:w-auto;
    background-color: #00000050;
    border: 2px solid #000000;
    color: #fff;
    min-width: 300px;
    border-radius: 0;
}
table>tbody>tr {
    @apply border-b border-black;
}
table>tr>th, table>*>tr>th {
    background-color: rgba(0, 0, 0, 0.37);
    text-align: center;
    color: #e5e5e5;
    @apply px-4 py-2;
}
table>tr>td, table>*>tr>td {
    @apply px-4 py-2;

}
.back {
    @apply absolute right-[0] top-[0] w-screen h-screen 
    flex flex-row justify-center items-center;
    z-index: 0;
}
</style>