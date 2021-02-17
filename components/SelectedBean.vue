<template>
  <transition name="selected-bean-fade" appear>
    <section class="selected-bean" v-if="bean">
      <p>{{ bean.name }}</p>
      <p v-if="bean.roast_profile">{{ bean.roast_profile }} roast</p>
    </section>
  </transition>
</template>

<script>
import Bean from '@/models/Bean';
export default {
  props: { beanId: String },
  computed: {
    bean() {
      return Bean.find(this.beanId);
    },
  },
};
</script>

<style scoped lang="scss">
.selected-bean {
  opacity: 1;
  transform-origin: top left;
  @apply py-2;

  p {
    @apply text-2xl;
    @apply font-bold;
    // @apply text-purple-400;
    @apply text-gray-200;
  }
}

.selected-bean-fade-enter-active,
.selected-bean-fade-leave-active {
  transition: 300ms linear;
}

section.selected-bean-fade-enter,
section.selected-bean-fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
  position: absolute;
}
</style>
