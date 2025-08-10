
import { reactive, computed } from 'vue'

interface Setting 
{
  /** 是否显示Loading页 */
  loading: boolean
  /** 界面过渡动画 */
  transition: boolean
  /** 界面动画 */
  animation: boolean
  /** 鼠标动画 */
  mouse_animation: boolean
  /** 视差背景 */
  parallax_bg: boolean
  /** 模糊 */
  enable_blur: boolean
  /** 懒加载 */
  lazy_load: boolean
}

export const useSettings = () => {
  const setting = reactive<Setting>({
    loading: true,
    transition: false,
    animation: true,
    mouse_animation: true,
    parallax_bg: true,
    enable_blur: true,
    lazy_load: true
  })
  return {
    loading: computed({get: () => setting.loading, set: (value) => setting.loading = value}),
    transition: computed({get: () => setting.transition, set: (value) => setting.transition = value}),
    animation: computed({get: () => setting.animation, set: (value) => setting.animation = value}),
    mouse_animation: computed({get: () => setting.mouse_animation, set: (value) => setting.mouse_animation = value}),
    parallax_bg: computed({get: () => setting.parallax_bg, set: (value) => setting.parallax_bg = value}),
    enable_blur: computed({get: () => setting.enable_blur, set: (value) => setting.enable_blur = value}),
    lazy_load: computed({get: () => setting.lazy_load, set: (value) => setting.lazy_load = value})
  }
}

