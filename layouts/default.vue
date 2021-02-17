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
  beforeMount() {
    if (process.browser) {
      console.log('in browser');
      this.$store.dispatch('performInitialLoad');
      this.$store.commit('setWindowWidth', window.innerWidth);
      console.log('done with default layout mounted stack');
    }
  },
};
</script>
<style lang="scss">
@tailwind utilities;
@import '../assets/main.scss';

html {
  font-family: 'Yantramanav', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
body {
  @apply bg-blue-900;
  background-image: url(https://i.pinimg.com/originals/8b/0c/23/8b0c231572d5748b926af83998b23767.jpg);
  background-blend-mode: luminosity;
}

.main-wrapper {
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
}

.coffee-button {
  @screen md {
    @apply p-4;
    @apply py-2;
  }
  @screen lg {
    @apply p-6;
    @apply py-4;
  }
  @screen xl {
    @apply p-8;
    @apply py-6;
  }
  @apply bg-orange-900;
  @apply text-green-300;
  @apply font-bold;
  @apply p-2;
  @apply rounded-md;
}

.coffee-button:hover {
  @apply bg-orange-700;
  @apply text-green-900;
}

// consider breaking the link elements into componenets
.link:hover {
  @apply bg-green-300;
  @apply underline;
  box-shadow: 0px 0px 15px #909;
}

.subpage-link {
  font-family: 'Pacifico';
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

.title {
  @screen md {
    @apply text-3xl;
  }
  @screen lg {
    @apply text-4xl;
  }
  @screen xl {
    @apply text-6xl;
  }
  @apply text-2xl;
  @apply italic;
  // @apply font-bold;
  @apply text-green-200;
  @apply underline;
  @apply shadow-md;
  @apply text-center;
  @apply mb-2;
  font-family: 'Pacifico';
  text-shadow: 5px 5px 5px #222;
}
</style>
