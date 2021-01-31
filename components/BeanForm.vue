<template>
  <transition name="fade">
    <div v-if="show" class="bean-form-wrapper">
      enter bean details here!!
      <form @submit.prevent>
        <label for="bean-name" required>Bean Name</label>
        <input id="bean-name" v-model="newBean.name" type="text" required />
        <label for="roast-profile" required>Roast Profile</label>

        <select id="roast-profile" v-model="newBean.roast_profile" required>
          <option
            v-for="profile in roastProfileOptions"
            :key="profile"
            :value="profile"
          >
            {{ profile }}
          </option>
        </select>
        <section class="new-bean-preview">
          <p>new bean name: {{ newBean.name }}</p>
          <p>selected roast: {{ newBean.roast_profile }}</p>
        </section>
      </form>
    </div>
  </transition>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: { show: Boolean },
  data() {
    return {
      newBean: {
        name: '',
        roast_profile: 'Medium',
      },
      roastProfileOptions: ['Light', 'Medium', 'Dark'],
    };
  },
  validations: {
    newBean: {
      name: { required, minLength: minLength(1) },
      roast_profile: { required },
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
    show(val) {
      // send newBean back to parent when it is shown again,
      //  since it was probably cleared when BeanForm was hidden
      if (val) {
        this.$emit('beanChange', this.newBean);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bean-form-wrapper {
  @apply border;
  @apply border-purple-700;
  overflow: hidden;
  transform-origin: top left;
}

select,
option,
input {
  @apply text-red-900;
}

.new-bean-preview {
  @apply text-2xl;
  @apply font-bold;
  @apply text-purple-400;
}

.fade-enter-active,
.fade-leave-active {
  transition: 300ms ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
  position: absolute;
}
</style>
