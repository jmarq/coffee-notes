<template>
  <section>
    <label for="bean-select">Beans used</label>
    <select id="bean-select" @change="selectionChange" v-model="selectedBeanId">
      <option :value="undefined">enter new bean</option>
      <option v-for="bean in beanOptions" :key="bean.id" :value="bean.id">
        {{ bean.name }}
      </option>
    </select>
    <selected-bean :bean-id="selectedBeanId"></selected-bean>
  </section>
</template>

<script>
// import Bean from '@/models/Bean';
import { allBeans } from '@/helpers/dataHelpers';
import SelectedBean from './SelectedBean';

export default {
  components: { SelectedBean },
  data() {
    return {
      selectedBeanId: undefined,
    };
  },
  computed: {
    beanOptions() {
      return allBeans();
    },
  },
  methods: {
    selectionChange(ev) {
      console.log('bean selection changed');
      console.log(ev.target.value);
      this.$emit('beanSelectionChange', this.selectedBeanId);
    },
  },
};
</script>

<style scoped>
select,
option {
  @apply text-red-900;
}
</style>
