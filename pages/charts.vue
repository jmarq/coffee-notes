<template>
  <div class="charts-wrapper">
    <NuxtChild />
  </div>
</template>

<style lang="scss">
.charts-wrapper canvas,
.charts-wrapper svg {
  @apply border-2;
  @apply border-green-400;
  @apply bg-orange-200;
}

.axis-selectors-wrapper {
  &.x {
    justify-content: center;
  }
  &.y {
    justify-content: flex-start;
  }
  @apply flex;
  align-items: center;
  @apply font-bold;
  background-color: #eee;
  select {
    @apply ml-2;
    @apply p-2;
  }
}

.link {
  @apply px-2;
  @apply py-1;
  @apply mb-1;
  @apply bg-orange-300;
  @apply rounded-md;
  @apply inline-block;
  &.nuxt-link-exact-active {
    @apply bg-blue-300;
  }
}
</style>
