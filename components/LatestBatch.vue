<template>
  <section class="recent-batch">
    <div v-if="mostRecent" class="recent-batch-info">
      <h2 class="font-bold text-xl">Previous batch</h2>
      <p>Bean: {{ mostRecent.bean.name }}</p>
      <p>Grind Size: {{ mostRecent.grind_size }}</p>
      <p>Batch Size: {{ mostRecent.batch_size_oz }} oz.</p>
      <p>Rating: {{ mostRecent.rating }}</p>
      <p>Note: {{ mostRecent.note }}</p>
    </div>
    <div v-else class="recent-batch-empty">no recent batches</div>
  </section>
</template>

<script>
import { mostRecentBatch } from '@/helpers/dataHelpers';
export default {
  computed: {
    mostRecent() {
      return mostRecentBatch();
    },
  },
};
</script>

<style lang="scss">
.recent-batch {
  @apply p-2;
  @apply mb-2;
  @apply bg-yellow-200;
  @apply rounded-md;
}
</style>
