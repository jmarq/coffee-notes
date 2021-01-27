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
      // perhaps call $create here instead to trigger localforage persist
      Batch.$create({
        data: payload,
      }).then((result) => {
        console.log({ result });
        // with vuex-orm-localforage $create, this might only need to do the router push.
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
