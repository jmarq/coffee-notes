<template>
  <div class="p-2 m-2 bg-orange-200 rounded-md">
    <div v-if="batch">
      <p>{{ batch.id }}</p>
      <p>{{ batch.bean.name }}</p>
      {{ batch.note }}
    </div>
  </div>
</template>

<script>
import Batch from '@/models/Batch';
export default {
  computed: {
    batch() {
      const id = this.$route.params.id;
      console.log(id);
      const batch = Batch.query().with('bean').whereId(id).first();
      // const batch = Batch.find(id);
      console.log({ batch });
      return batch;
    },
  },
};
</script>
