<template>
  <div class="toggle-container">
    <div 
      :class="`toggle ${modelValue ? 'active' : ''} ${disabled ? 'disabled' : ''}`"
      @click="!disabled && toggle()"
    >
      <div class="toggle-track">
        <div class="toggle-thumb"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

const modelValue = defineModel<boolean>({ default: false })

const toggle = () => {
  if (modelValue.value !== undefined) {
    modelValue.value = !modelValue.value
  }
}
</script>

<style lang="stylus" scoped>
.toggle-container
  display flex
  align-items center
  justify-content center

.toggle
  position relative
  width 60px
  height 32px
  cursor pointer
  transition all 250ms ease
  
  &.disabled
    cursor not-allowed
    opacity 0.5
  
  .toggle-track
    position relative
    width 100%
    height 100%
    border-radius 16px
    background-color #bcc0c3
    border 2px solid #e0e0e0
    transition all 250ms ease
    
    .toggle-thumb
      position absolute
      top 2px
      left 2px
      width 24px
      height 24px
      border-radius 50%
      background-color #ffffff
      box-shadow 0 2px 4px rgba(0, 0, 0, 0.2)
      transition all 250ms cubic-bezier(0.4, 0, 0.2, 1)
      transform translateX(0)
  
  &.active
    .toggle-track
      background-color #f19839
      border-color #f19839
      
      .toggle-thumb
        transform translateX(28px)
        box-shadow 0 2px 8px rgba(241, 152, 57, 0.4)
  
  &:hover:not(.disabled)
    .toggle-track
      border-color #f19839
      
    &.active .toggle-track
      background-color #ffb366
      border-color #ffb366
  
  &:active:not(.disabled)
    .toggle-track .toggle-thumb
      scale 0.95
</style>
