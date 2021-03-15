<template>
  <div class="wrapper">
    <BatchForm @batchSubmitted="addBatch"></BatchForm>
  </div>
</template>

<script>
import BatchForm from '@/components/BatchForm';
import { createBatch } from '@/helpers/dataHelpers';

export default {
  components: { BatchForm },
  methods: {
    addBatch(payload) {
      createBatch(payload).then((createdBatch) => {
        this.$router.push({ path: '/', query: { newId: createdBatch.id } });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}
</style>
