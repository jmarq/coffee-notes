<template>
  <div class="links">
    <n-link class="link" to="/">Home</n-link>
    <n-link class="link" to="/add">Add a note</n-link>
    <n-link class="link inexact" to="/charts">Charts</n-link>
    <n-link class="link debug" to="/debug">Debug</n-link>
  </div>
</template>

<style scoped lang="scss">
.link {
  font-family: 'Pacifico';
  @screen md {
    @apply text-xl;
    @apply p-2;
  }
  @screen xl {
    @apply text-2xl;
  }
  @apply text-base;
  @apply p-1;
  @apply mb-2;
  @apply bg-yellow-300;
  @apply text-purple-900;
  @apply rounded-md;
  @apply inline-block;
  box-shadow: 5px 5px 5px #222;
  &.nuxt-link-exact-active,
  &.inexact.nuxt-link-active {
    @apply bg-blue-300;
  }
  &.debug {
    @apply bg-purple-300;
  }
}
.links {
  padding-top: 15px;
}
</style>
