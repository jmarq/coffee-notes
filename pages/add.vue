<template>
  <div class="wrapper">
    <h1 class="title">add a new coffee note please</h1>
    <n-link class="link" to="/">home</n-link>
    <BatchForm @updateBatch="setBatch"></BatchForm>
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
// import { required, minLength } from 'vuelidate/lib/validators';

import Batch from '@/models/Batch';
import BatchForm from '@/components/BatchForm';

// const customBeanIdValidator = (value, vm) => {
//   return vm.bean || value;
// };

// const customBeanValidator = (value, vm) => {
//   return vm.bean_id || value;
// };

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
    addCoolNote() {
      if (this.valid()) {
        // add to vuex-orm store
        Batch.insert({
          data: {
            // bean: { name: 'cool beans', id: 1, roast_profile: 'medium' },
            bean_id: 1,
            note: this.newNoteContent,
            date: Date.now(),
          },
        });
        // save to localstorage (this probably should not be a mutation, rather a helper/plugin?)
        console.log('attempting to call this.saveEntities from add.vue');
        this.saveEntities();

        this.newNoteContent = '';
      }
    },
  },
};
</script>
