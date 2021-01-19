<template>
  <div class="debug-wrapper">
    <h1>debug tools</h1>
    <n-link class="link" to="/">home</n-link>

    <button @click="addFakeData" class="coffee-button">
      add some fake data
    </button>

    <button @click="deleteAllFakeData" class="coffee-button">
      delete all fake data
    </button>

    <h2 class="text-xl font-bold">batches:</h2>
    <ul>
      <li
        v-for="batch in allBatches"
        :key="batch.id"
        class="border-b-2 border-red-800"
      >
        <button
          class="p-1 bg-red-500 rounded-md"
          @click="deleteBatch(batch.id)"
        >
          X
        </button>
        <span>batch_id: {{ batch.id }}</span> -
        <span v-if="batch.bean"> bean_id: {{ batch.bean.id }}</span>
      </li>
    </ul>

    <h2 class="text-xl font-bold">beans:</h2>
    <ul>
      <li
        v-for="bean in allBeans"
        :key="bean.id"
        class="border-b-2 border-green-800"
      >
        <button
          class="p-1 bg-orange-500 rounded-md"
          @click="deleteBean(bean.id)"
        >
          X
        </button>
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
  allBeans,
  allBatches,
  // allFakeBeans,
  // allFakeBatches,
  deleteBatch,
  deleteBean,
  deleteAllFakeData,
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
    deleteBatch(id) {
      console.log(`attempting to delete batch ${id}`);
      deleteBatch(id);
    },
    deleteBean(id) {
      console.log(`attempting to delete bean ${id}`);
      deleteBean(id);
    },
    deleteAllFakeData() {
      deleteAllFakeData();
    },
  },
};
</script>

<style scoped>
.debug-wrapper {
  @apply bg-green-200;
}
</style>
