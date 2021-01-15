<template>
  <div class="bean-form-wrapper">
    enter bean details here!!
    <form>
      <label for="bean-name">Bean Name</label>
      <input
        id="bean-name"
        v-model="newBean.name"
        type="text"
        @keypress="formChange"
      />
      <select
        id="roast-profile"
        v-model="newBean.roastProfile"
        @change="formChange"
      >
        <option
          v-for="profile in roastProfileOptions"
          :key="profile"
          :value="profile"
        >
          {{ profile }}
        </option>
      </select>
      <p>new bean name: {{ newBean.name }}</p>
      <p>selected roast: {{ newBean.roastProfile }}</p>
      <p>bean json: {{ JSON.stringify(newBean) }}</p>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      // maybe there should be a watcher on newBean that sends the $emit?
      newBean: {
        name: '',
        roastProfile: 'Medium',
      },
      roastProfileOptions: ['Light', 'Medium', 'Dark'],
    };
  },
  validations: {
    newBean: {
      name: { required, minLength: minLength(1) },
    },
  },
  methods: {
    formChange(ev) {
      // console.log('invalid?');
      // console.log(this.$v.$invalid);
      console.log('the form changed?');
      // this.$emit('beanChange', this.newBean);
    },
  },
  watch: {
    newBean: {
      deep: true,
      handler() {
        console.log('bean changed! is it invalid?s');
        console.log(this.$v.$invalid);
        this.$emit('beanChange', this.newBean);
      },
    },
  },
};
</script>

<style scoped>
.bean-form-wrapper {
  @apply border;
  @apply border-purple-700;
}
</style>
