<template>
    <Common-ParallaxContainer
        :src="'/images/Introduction/Background_00.png'"
        :content-class="'no-dark'" :margin="512">
        <Profile-CharacterDescription />
    </Common-ParallaxContainer>
</template>

<script lang="ts" setup>
</script>

<style lang="postcss">
.parallax-container .content {
    @apply w-full h-full pt-16;
    background-color: #00000080;
    box-shadow: inset 0 0 16px 2px #00000033;
}
.parallax-container .darken_only {
    @apply w-full h-full;
    background-color: #00000080;
    box-shadow: inset 0 0 16px 2px #00000033;
}
.parallax-container .two-row {
    @apply flex flex-col
    md:grid md:grid-cols-2;
}
.parallax-container  .col-reverse {
    @apply flex-col-reverse;
}
.title-poem p{
    @apply text-sm opacity-[0.5];
}
</style>
