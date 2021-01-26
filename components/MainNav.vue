<template>
  <div class="links">
    <n-link class="link" to="/">Home</n-link>
    <n-link class="link" to="/add">Add a note</n-link>
    <n-link class="link" to="/vega-try">Visualization</n-link>
    <n-link class="link" to="/debug">Debug</n-link>
  </div>
</template>

<style scoped lang="scss">
.link {
  @apply text-3xl;
  @apply bg-yellow-300;
  @apply p-2;
  @apply text-purple-900;
  @apply rounded-md;
  @apply mb-2;
  @apply inline-block;
  box-shadow: 5px 5px 5px #222;
  &.nuxt-link-exact-active {
    @apply bg-blue-300;
  }
}
.links {
  padding-top: 15px;
}
</style>
