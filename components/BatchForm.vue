<template>
  <div class="batch-form-wrapper">
    <p>enter coffee batch details here</p>
    <p v-if="$v.$invalid">It's Bad</p>
    <p v-else>It's Good</p>
    <bean-selector @beanSelectionChange="updateBeanId"></bean-selector>
    <BeanForm v-if="!bean_id" @beanChange="updateBean"></BeanForm>
    <p>batch-specific fields to go here later</p>
    <section class="batch-fields">
      <div>
        <label for="grind_size">Grind size</label>
        <input id="grind_size" v-model.number="grind_size" type="number" />
      </div>
      <div>
        <label for="grinds_oz">Grounds (in ounces)</label>
        <input id="grinds_oz" v-model.number="grinds_oz" type="number" />
      </div>
      <div>
        <label for="batch_size_oz">Batch Size (in ounces)</label>
        <input
          id="batch_size_oz"
          v-model.number="batch_size_oz"
          type="number"
        />
      </div>
      <div>
        <label for="note">Note</label>
        <input id="note" v-model="note" type="text" />
      </div>
      <div>
        <label for="rating">Rating (scale ??-??)</label>
        <input id="rating" v-model.number="rating" type="number" />
      </div>
    </section>
    <section v-if="!$v.$invalid">
      <button class="coffee-button" @click="submit">submit</button>
    </section>
  </div>
</template>

<script>
import { numeric, required } from 'vuelidate/lib/validators';
import BeanForm from './BeanForm';
import BeanSelector from './BeanSelector';
const customBeanIdValidator = (value, vm) => {
  if (vm.bean || value) {
    return true;
  } else {
    return false;
  }
  // return true;
};

const customBeanValidator = (value, vm) => {
  if (vm.bean_id || (value && value.name && value.roast_profile)) {
    return true;
  } else {
    return false;
  }
};

export default {
  components: { BeanForm, BeanSelector },
  data() {
    return {
      bean: undefined,
      bean_id: undefined,
      note: undefined,
      grind_size: undefined,
      batch_size_oz: undefined,
      grinds_oz: undefined,
      rating: undefined,
    };
  },
  validations: {
    bean_id: { customBeanIdValidator },
    bean: { customBeanValidator },
    grind_size: { numeric },
    batch_size_oz: { numeric, required },
    grinds_oz: { numeric },
    rating: { numeric },
  },
  computed: {
    validBatch() {
      return true;
      // this.$v.$touch();
      // return this.$v.invalid;
    },
  },
  methods: {
    updateBean(bean) {
      this.bean = bean;
      this.bean_id = undefined;
      console.log('bean updated in BatchForm. invalid?');
      console.log({ invalid: this.$v.$invalid });
    },
    updateBeanId(id) {
      if (this.bean_id) {
        this.bean = undefined;
      }
      this.bean_id = id;

      console.log('bean_id updated in BatchForm. invalid?');
      console.log({ invalid: this.$v.$invalid });
    },
    submit() {
      console.log('submitting?');
      if (!this.$v.$invalid) {
        console.log('valid submission');
        const payload = {
          bean: this.bean,
          bean_id: this.bean_id,
          grind_size: this.grind_size,
          grinds_oz: this.grinds_oz,
          batch_size_oz: this.batch_size_oz,
          note: this.note,
          rating: this.rating,
          date: Date.now(),
        };
        this.$emit('batchSubmitted', payload);
      } else {
        console.log('invalid submission');
      }
    },
  },
};
</script>

<style scoped>
.batch-form-wrapper {
  @apply bg-teal-200;
  @apply text-blue-900;
}
</style>
