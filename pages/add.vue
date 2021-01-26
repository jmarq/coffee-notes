<template>
  <div class="wrapper">
    <h1 class="title">Enter batch info</h1>
    <BatchForm
      @updateBatch="setBatch"
      @batchSubmitted="addCoolNote"
    ></BatchForm>
    <!-- <form>
      <input v-model="newNoteContent" type="text" />
      <button class="coffee-button" @click.prevent="addCoolNote">
        save note
      </button>
    </form> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Batch from '@/models/Batch';
import BatchForm from '@/components/BatchForm';

export default {
  components: { BatchForm },
  data() {
    return {
      batch: {
        // need a custom validator
        // either need a bean id or valid new bean
        //  hmmm how to check conditionally for a valid object?
        //    like maxLength only applies if bean_id null
        bean_id: undefined,
        bean: undefined,
        note: '',
        grind_size: undefined,
        batch_size_oz: undefined,
        grinds_oz: undefined,
        rating: undefined,
      },
    };
  },
  // validations: {
  //   batch: {
  //     bean_id: customBeanIdValidator,
  //     bean: customBeanValidator,
  //   },
  // },
  methods: {
    ...mapActions(['saveEntities']),
    valid() {
      return false;
    },
    setBatch(batch) {
      this.batch = batch;
    },
    addCoolNote(payload) {
      // add to vuex-orm store
      Batch.insert({
        data: payload,
      }).then((result) => {
        const createdId = result.batches[0].id;
        console.log(result.batches[0].id);
        console.log('attempting to call this.saveEntities from add.vue');
        this.saveEntities();
        this.$router.push({ path: '/', query: { newId: createdId } });
      });
      // save to localstorage (this probably should not be a mutation, rather a helper/plugin?)
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
