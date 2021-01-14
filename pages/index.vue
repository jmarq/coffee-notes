<template>
  <div class="container">
    <div>
      <h1 class="title">coffee-notes</h1>
      <section class="header-image">
        <img
          class="kangaroos"
          src="https://www.darbypop.com/wp-content/uploads/2020/06/Darby-Bites-99-copy.png"
          alt="a hot cup of joseph"
          loading="lazy"
        />
        <!-- <button @click.prevent="saveNotes" class="coffee-button">
          save notes
        </button>
        <button @click.prevent="loadNotes" class="coffee-button">
          load notes (will overwrite current notes)
        </button> -->
      </section>
      <div class="links">
        <n-link class="link" to="add">add a note</n-link>
      </div>
      <div class="coffee">
        <h1 v-if="!batches.length" class="title">no notes yet</h1>
        <ul ref="listo2">
          <li v-for="batch in batches" :key="batch.id">
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
import Batch from '@/models/Batch';
export default {
  computed: {
    batches: () => {
      return Batch.query().with('bean').get();
    },
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
body {
  @apply bg-purple-200;
  background-image: url(https://i.pinimg.com/originals/8b/0c/23/8b0c231572d5748b926af83998b23767.jpg);
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  @apply text-6xl;
  @apply italic;
  @apply font-bold;
  @apply text-green-200;
  @apply underline;
  @apply shadow-md;
  font-family: serif;
  text-shadow: 5px 5px 5px #222;
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

.link {
  @apply text-3xl;
  @apply bg-yellow-300;
  @apply p-2;
  @apply text-purple-900;
  @apply rounded-r-md;
  @apply mb-2;
  @apply inline-block;
  box-shadow: 5px 5px 5px #222;
}

.link:hover {
  @apply bg-green-300;
  @apply underline;
  box-shadow: 0px 0px 15px #909;
}

.coffee ul {
  @apply bg-pink-100;
  @apply rounded-md;
  @apply border-indigo-600;
  @apply border;
  @apply overflow-y-scroll;
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

.coffee-button {
  @apply bg-orange-900;
  @apply text-green-300;
  @apply font-bold;
  @apply p-8;
  @apply rounded-md;
}

.coffee button:hover {
  @apply bg-orange-700;
  @apply text-green-900;
}
</style>
