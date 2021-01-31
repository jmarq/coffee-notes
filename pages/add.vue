<template>
  <div class="wrapper">
    <h1 class="title">Enter batch info</h1>
    <BatchForm @batchSubmitted="addBatch"></BatchForm>
  </div>
</template>

<script>
import Batch from '@/models/Batch';
import BatchForm from '@/components/BatchForm';

export default {
  components: { BatchForm },
  methods: {
    addBatch(payload) {
      Batch.$create({
        data: payload,
      }).then((result) => {
        // result is an array when using localforage create
        // array might contain a bean or a batch depending on the creation
        // pick the result that has a "note" or some other batch-specific field?
        const createdBatch = result.filter(
          (r) => typeof r.batch_size_oz !== 'undefined'
        )[0];
        this.$router.push({ path: '/', query: { newId: createdBatch.id } });
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}
</style>
