<template>
  <div class="coffee">
    <h1 v-if="!batches.length" class="title">no notes yet</h1>
    <ul>
      <li
        v-for="batch in batches"
        :key="batch.id"
        :class="{ justCreated: batch.id == createdBatch }"
      >
        {{ new Date(batch.date).toLocaleString() }}
        {{ batch.bean.name }} ({{ batch.bean.roast_profile }}
        roast) -
        <span class="batch-note">{{ batch.note }}</span>
        <nuxt-link
          class="text-red-500"
          :to="{ path: 'batches/edit', query: { id: batch.id } }"
          >edit</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { allBatches } from '@/helpers/dataHelpers';
export default {
  props: {
    createdBatch: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    batches: () => {
      return allBatches();
    },
  },
};
</script>

<style lang="scss" scoped>
.coffee ul {
  @apply p-2;
  @apply bg-pink-100;
  @apply rounded-md;
  @apply border-indigo-600;
  @apply border;
  @apply overflow-y-auto;
  max-height: 600px;
}

.coffee li {
  @apply text-lg;
  @apply font-bold;
  @apply pb-2;
  @apply pt-1;
  @apply text-left;
  border-bottom: 1px solid turquoise;
}

.coffee li span.batch-note {
  font-family: 'courier new';
  @apply font-normal;
}
.coffee li.justCreated {
  @apply bg-orange-200;
  animation: highlightnew 1000ms ease-in-out alternate infinite;
}

@keyframes highlightnew {
  from {
    @apply bg-green-200;
  }
  to {
    @apply bg-orange-300;
  }
}
</style>
