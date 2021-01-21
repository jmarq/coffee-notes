<template>
  <div class="main-wrapper">
    <main-nav />
    <Nuxt />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav';
export default {
  components: { MainNav },
  mounted() {
    if (process.browser) {
      this.$store.dispatch('performInitialLoad');
    }
  },
};
</script>
<style lang="scss">
@tailwind utilities;
@import '../assets/testing.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-y: scroll;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main-wrapper {
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
}

.coffee-button {
  @apply bg-orange-900;
  @apply text-green-300;
  @apply font-bold;
  @apply p-8;
  @apply rounded-md;
}

.coffee-button:hover {
  @apply bg-orange-700;
  @apply text-green-900;
}

.link:hover {
  @apply bg-green-300;
  @apply underline;
  box-shadow: 0px 0px 15px #909;
}

.title {
  @apply text-6xl;
  @apply italic;
  @apply font-bold;
  @apply text-green-200;
  @apply underline;
  @apply shadow-md;
  @apply text-center;
  font-family: serif;
  text-shadow: 5px 5px 5px #222;
}
</style>
