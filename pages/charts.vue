<template>
  <div class="charts-wrapper">
    <div class="chart-nav">
      <n-link class="link subpage-link" to="/charts">Batches</n-link>
      <n-link class="link subpage-link" to="/charts/beans">Beans</n-link>
    </div>
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

.subpage-link {
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
