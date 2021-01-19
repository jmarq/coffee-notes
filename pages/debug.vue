<template>
  <div class="debug-wrapper">
    <h1>debug tools</h1>
    <n-link class="link" to="/">home</n-link>

    <button @click="addFakeData" class="coffee-button">
      add some fake data
    </button>
    <ul>
      <li v-for="batch in allBatches" :key="batch.id">
        <span>batch_id: {{ batch.id }}</span> -
        <span>bean_id: {{ batch.bean.id }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  addFakeBeans,
  addFakeBatches,
  allBeans,
  allBatches,
} from '@/helpers/dataHelpers';
export default {
  computed: {
    allBeans() {
      return allBeans();
    },
    allBatches() {
      return allBatches();
    },
  },
  methods: {
    addFakeData() {
      const beanIds = addFakeBeans(10);
      addFakeBatches(15, beanIds);
    },
  },
};
</script>

<style scoped>
.debug-wrapper {
  @apply bg-green-200;
}
</style>
