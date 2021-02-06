<template>
  <div class="batch-form-wrapper">
    <p v-if="$v.$invalid" class="invalid-warning">Fill out required fields</p>
    <p v-else>It's Good</p>
    <section class="beans">
      <bean-selector
        :initial-bean="bean_id"
        @beanSelectionChange="updateBeanId"
      ></bean-selector>
      <BeanForm :show="!bean_id" @beanChange="updateBean"></BeanForm>
    </section>
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
        <label for="batch_size_oz" required>Batch Size (in ounces)</label>
        <input
          id="batch_size_oz"
          v-model.number="batch_size_oz"
          type="number"
          required="true"
        />
      </div>
      <div>
        <label for="rating">Rating (scale ??-??)</label>
        <input id="rating" v-model.number="rating" type="number" />
      </div>
      <div>
        <label for="note">Note</label>
        <textarea id="note" v-model="note" type="text" />
      </div>
    </section>
    <transition name="button-fade">
      <section v-if="!$v.$invalid" class="submit-section">
        <button class="coffee-button" @click="submit">submit</button>
      </section>
    </transition>
  </div>
</template>

<script>
import { numeric, required } from 'vuelidate/lib/validators';
import { mostRecentBatch } from '@/helpers/dataHelpers';
import BeanForm from './BeanForm';
import BeanSelector from './BeanSelector';
const customBeanIdValidator = (value, vm) => {
  return Boolean(vm.bean || value);
};

const customBeanValidator = (value, vm) => {
  return Boolean(vm.bean_id || (value && value.name && value.roast_profile));
};

export default {
  components: { BeanForm, BeanSelector },
  data() {
    const mostRecent = mostRecentBatch() || {};
    console.log(mostRecent);
    return {
      bean: mostRecent.bean,
      bean_id: mostRecent.bean_id,
      note: undefined,
      grind_size: mostRecent.grind_size,
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

  methods: {
    updateBean(bean) {
      this.bean = bean;
      this.bean_id = undefined;
    },
    updateBeanId(id) {
      if (this.bean_id) {
        this.bean = undefined;
      }
      this.bean_id = id;
    },
    submit() {
      if (!this.$v.$invalid) {
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

<style scoped lang="scss">
.batch-form-wrapper {
  background-color: rgba(20, 15, 0, 0.65);
  @apply text-blue-300;
  text-shadow: 2px 2px 2px black;
  @apply m-3;
  @apply p-3;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
}

.beans {
  @apply border;
  @apply border-red-900;
  height: 250px;
}

label {
  @apply text-lg;
  @apply font-bold;
  @apply block;
  @apply mt-2;
}

input,
textarea {
  @apply text-lg;
  @apply font-bold;
  @apply p-1;
  @apply rounded-lg;
  @apply border-2;
  @apply border-red-900;
  @apply block;
  width: 100%;
}

input,
textarea,
select,
option {
  @apply text-red-900;
}

.batch-form-wrapper option,
.batch-form-wrapper select {
  @apply text-red-900;
}

.submit-section {
  @apply pt-2;
}
.button-fade-enter-active,
.button-fade-leave-active {
  transition: 300ms linear;
}

.button-fade-enter,
.button-fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.batch-fields {
  @apply flex;
  @apply flex-wrap;
  @apply justify-around;
}
.batch-fields div {
  flex-basis: 300px;
  flex-shrink: 0;
  flex-grow: 1;
  @apply m-1;
}
</style>
