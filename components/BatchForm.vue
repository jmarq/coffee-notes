<template>
  <div class="batch-form-wrapper">
    <p v-if="$v.$invalid" class="invalid-warning">
      Fill out <span>required</span> fields
    </p>
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
        <label for="grind_size" required>Grind size</label>
        <input
          id="grind_size"
          v-model.number="grind_size"
          type="number"
          required
        />
      </div>
      <div>
        <label for="grinds_oz" required>Grounds (in ounces)</label>
        <input
          id="grinds_oz"
          v-model.number="grinds_oz"
          type="number"
          required
        />
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
        <label for="rating" required>Rating (scale ??-??)</label>
        <input id="rating" v-model.number="rating" type="number" required />
      </div>
      <div>
        <label for="note">Note</label>
        <textarea id="note" v-model="note" type="text" />
      </div>
    </section>
    <transition name="button-fade">
      <section v-if="!$v.$invalid" class="submit-section">
        <button class="coffee-button" @click="submit">
          {{ editingBatch ? 'Update batch info' : 'Submit' }}
        </button>
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

const getInitialDataForEdit = (editingBatch) => {
  const result = {
    bean: editingBatch.bean,
    bean_id: editingBatch.bean_id,
    note: editingBatch.note,
    grind_size: editingBatch.grind_size,
    batch_size_oz: editingBatch.batch_size_oz,
    grinds_oz: editingBatch.grinds_oz,
    rating: editingBatch.rating,
  };
  return result;
};

export default {
  components: { BeanForm, BeanSelector },
  props: {
    editingBatch: Object,
  },
  data() {
    let result = {};
    if (this.editingBatch) {
      const { editingBatch } = this;
      result = getInitialDataForEdit(editingBatch);
    } else {
      result = {
        bean: undefined,
        bean_id: undefined,
        note: undefined,
        grind_size: undefined,
        batch_size_oz: undefined,
        grinds_oz: undefined,
        rating: undefined,
      };
    }
    return result;
  },
  computed: {
    mostRecent() {
      const result = mostRecentBatch() || {};
      return result;
    },
  },
  watch: {
    editingBatch: {
      deep: true,
      handler() {
        const { editingBatch } = this;
        this.bean = editingBatch.bean;
        this.bean_id = editingBatch.bean_id;
        this.note = editingBatch.note;
        this.grind_size = editingBatch.grind_size;
        this.grinds_oz = editingBatch.grinds_oz;
        this.batch_size_oz = editingBatch.batch_size_oz;
        this.rating = editingBatch.rating;
      },
    },
    mostRecent: {
      deep: true,
      handler() {
        if (!this.bean_id && !this.bean) {
          this.bean_id = this.mostRecent.bean.id;
        }
      },
    },
  },
  validations: {
    bean_id: { customBeanIdValidator },
    bean: { customBeanValidator },
    grind_size: { numeric, required },
    batch_size_oz: { numeric, required },
    grinds_oz: { numeric, required },
    rating: { numeric, required },
    note: {},
  },

  mounted() {
    if (!this.bean_id && !this.bean) {
      this.bean_id = this.mostRecent.bean_id;
    }
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
    generateSubmissionPayload() {
      let date = Date.now();
      if (this.editingBatch) {
        date = this.editingBatch.date;
      }
      const result = {
        bean: this.bean,
        bean_id: this.bean_id,
        grind_size: this.grind_size,
        grinds_oz: this.grinds_oz,
        batch_size_oz: this.batch_size_oz,
        note: this.note,
        rating: this.rating,
        date,
      };
      return result;
    },
    submit() {
      if (!this.$v.$invalid) {
        const payload = this.generateSubmissionPayload();
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

.invalid-warning {
  span {
    @apply text-green-300;
  }
}
.beans {
  @apply p-2;
  @apply rounded-md;
  background-color: rgba(77, 41, 8, 0.3);
  ::v-deep label {
    @apply text-purple-400;
  }
}

::v-deep label {
  @apply text-lg;
  @apply font-bold;
  @apply block;
  @apply mt-2;
}

::v-deep input,
::v-deep textarea,
::v-deep select {
  @apply text-lg;
  @apply font-bold;
  @apply p-1;
  @apply rounded-lg;
  @apply border-2;
  @apply border-red-900;
  @apply block;
  width: 100%;
}

::v-deep input,
::v-deep textarea,
::v-deep select,
::v-deep option {
  @apply text-black;
}

// ::v-deep used to target inputs in child components.
::v-deep label[required] {
  &::after {
    content: '*';
    @apply text-red-600;
  }
}

::v-deep input:invalid,
::v-deep textarea:invalid,
::v-deep select:invalid {
  @apply border-red-600;
  @apply bg-green-300;
  @apply border-2;
  transition: 500ms linear;
}

// .batch-form-wrapper option,
// .batch-form-wrapper select {
//   @apply text-red-900;
// }

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
