<template>
  <section class="recent-batch">
    <div v-if="mostRecent" class="recent-batch-info">
      <h2 class="text-xl">Previous batch</h2>
      <transition name="fade" appear>
        <table>
          <tbody>
            <tr>
              <td>Bean:</td>
              <td>
                {{ mostRecent.bean.name }} ({{ mostRecent.bean.roast_profile }}
                roast)
              </td>
            </tr>
            <tr>
              <td>Grind size:</td>
              <td>{{ mostRecent.grind_size }}</td>
            </tr>
            <tr>
              <td>Batch size:</td>
              <td>{{ mostRecent.batch_size_oz }} oz.</td>
            </tr>
            <tr>
              <td>Rating:</td>
              <td>{{ mostRecent.rating }}</td>
            </tr>
            <tr>
              <td>Note:</td>
              <td>{{ mostRecent.note }}</td>
            </tr>
          </tbody>
        </table>
      </transition>
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

<style scoped lang="scss">
.recent-batch {
  @apply p-2;
  @apply mb-2;
  @apply bg-yellow-200;
  @apply rounded-md;
}

h2 {
  @apply text-center;
  font-family: 'Pacifico';
  text-shadow: 2px 2px 2px #bbf;
}

table {
  width: 100%;
}

tr:nth-child(2n-1) {
  @apply bg-orange-200;
}

td {
  min-width: 150px;
  @apply border;
  @apply border-gray-400;
}

td:first-child {
  @apply font-bold;
}

td:nth-child(2) {
  @apply px-2;
  font-family: 'courier new';
}

.fade-enter-active,
.fade-leave-active {
  transition: 300ms ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
