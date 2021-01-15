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
    // this has gotten messy and confusing.
    // need to rethink the flow of this data.
    // how do the bean/bean_id forms flow into batch?
    //  how does batch flow into add?
    // which component(s) for validation?
    // good progress!!!
    updateBean(bean) {
      this.bean = bean;
      this.bean_id = undefined;
      // console.log('new bean for batch form');
      // console.log(bean);
      // console.log(JSON.stringify(this.bean));
      // // this.$emit('updateBatch', {
      // //   bean,
      // //   bean_id: this.bean_id,
      // // });
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
