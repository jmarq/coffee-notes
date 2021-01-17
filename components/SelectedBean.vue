<template>
  <transition name="selected-bean-fade" appear>
    <section v-if="bean">
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

<style scoped>
section {
  opacity: 1;
  transform-origin: top left;
}
p {
  @apply text-2xl;
  @apply font-bold;
  @apply text-purple-400;
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
