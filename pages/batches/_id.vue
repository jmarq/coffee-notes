<template>
  <div class="p-2 m-2 bg-orange-200 rounded-md">
    <div v-if="batch">
      <p>{{ batch.id }}</p>
      <p>{{ batch.bean.name }}</p>
      {{ batch.note }}
    </div>
    <BatchForm :editing-batch="batch" @batchSubmitted="updateBatch"></BatchForm>
  </div>
</template>

<script>
import BatchForm from '@/components/BatchForm';
import Batch from '@/models/Batch';
export default {
  components: { BatchForm },
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
  methods: {
    updateBatch(payload) {
      Batch.$update({
        data: { ...payload, id: this.batch.id },
      });
    },
  },
};
</script>
