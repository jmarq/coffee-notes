<template>
  <div class="links">
    <n-link class="link" to="/">home</n-link>
    <n-link class="link" to="/add">add a note</n-link>
    <n-link class="link" to="/debug">debug</n-link>
    <n-link class="link" to="/vega-try">vega?</n-link>
  </div>
</template>

<style scoped lang="scss">
.link {
  @apply text-3xl;
  @apply bg-yellow-300;
  @apply p-2;
  @apply text-purple-900;
  @apply rounded-r-md;
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
