<template>
  <div class="container">
    <div>
      <!-- <h1 class="title">coffee-notes</h1> -->
      <section class="header-image">
        <img
          class="kangaroos"
          src="https://www.darbypop.com/wp-content/uploads/2020/06/Darby-Bites-99-copy.png"
          alt="a hot cup of joseph"
          loading="lazy"
        />
      </section>
      <p>{{ createdBatch }} was created?</p>
      <div class="coffee">
        <h1 v-if="!batches.length" class="title">no notes yet</h1>
        <ul ref="listo2">
          <li
            v-for="batch in batches"
            :key="batch.id"
            :class="{ justCreated: batch.id == createdBatch }"
          >
            {{ new Date(batch.date).toLocaleString() }}
            {{ batch.bean.name }} ({{ batch.bean.roast_profile }}
            roast) -
            {{ batch.note }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { allBatches } from '@/helpers/dataHelpers';
export default {
  computed: {
    batches: () => {
      return allBatches();
    },
    createdBatch() {
      console.log(this.$route);
      return this.$route.query.newId;
    },
  },
};
</script>

<style>
body {
  @apply bg-purple-200;
  background-image: url(https://i.pinimg.com/originals/8b/0c/23/8b0c231572d5748b926af83998b23767.jpg);
}

.container {
  margin: 0 auto;
  min-height: 100vh;
}

.header-image {
  display: flex;
  justify-content: center;
}

.kangaroos {
  max-width: 800px;
  @apply border-indigo-900;
  border-width: 4px;
  @apply p-3;
  @apply bg-orange-300;
}

.links {
  padding-top: 15px;
}

.coffee ul {
  @apply p-2;
  @apply bg-pink-100;
  @apply rounded-md;
  @apply border-indigo-600;
  @apply border;
  @apply overflow-y-auto;
  max-height: 400px;
}

.coffee li {
  @apply text-lg;
  @apply font-bold;
  @apply pb-2;
  @apply pt-1;
  @apply text-left;
  border-bottom: 1px solid turquoise;
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
