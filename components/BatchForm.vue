<template>
  <div class="batch-form-wrapper">
    <p>enter coffee batch details here</p>
    <bean-selector @beanSelectionChange="updateBeanId"></bean-selector>
    <BeanForm v-if="!bean_id" @beanChange="updateBean"></BeanForm>
    <p>batch-specific fields to go here later</p>
  </div>
</template>

<script>
import BeanForm from './BeanForm';
import BeanSelector from './BeanSelector';

const customBeanIdValidator = (value, vm) => {
  console.log(vm);
  console.log(value);
  if (vm.bean || value) {
    return true;
  } else {
    return false;
  }
  // return true;
};

const customBeanValidator = (value, vm) => {
  console.log(vm);
  console.log(value);
  if (vm.bean_id || (value && value.name && value.roastProfile)) {
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
    };
  },
  validations: {
    bean_id: { customBeanIdValidator },
    bean: { customBeanValidator },
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
  },
};
</script>

<style scoped>
.batch-form-wrapper {
  @apply bg-teal-200;
  @apply text-blue-900;
}
</style>
