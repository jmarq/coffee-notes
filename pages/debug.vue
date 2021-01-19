<template>
  <div class="debug-wrapper">
    <h1>debug tools</h1>
    <n-link class="link" to="/">home</n-link>

    <button @click="addFakeData" class="coffee-button">
      add some fake data
    </button>
    <h2>batches:</h2>
    <ul>
      <li v-for="batch in allBatches" :key="batch.id">
        <span>batch_id: {{ batch.id }}</span> -
        <span>bean_id: {{ batch.bean.id }}</span>
      </li>
    </ul>

    <h2>beans:</h2>
    <ul>
      <li v-for="bean in allBeans" :key="bean.id">
        <span>id: {{ bean.id }} -</span>
        <span>name: {{ bean.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  addFakeBeans,
  addFakeBatches,
  // allBeans,
  // allBatches,
  allFakeBeans,
  allFakeBatches,
} from '@/helpers/dataHelpers';
export default {
  computed: {
    allBeans() {
      return allFakeBeans();
    },
    allBatches() {
      return allFakeBatches();
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
