<template>
  <select @change="selectionChange" v-model="selectedBeanId">
    <option :value="undefined">enter new bean</option>
    <option v-for="bean in beanOptions" :key="bean.id" :value="bean.id">
      {{ bean.name }}
    </option>
  </select>
</template>

<script>
import Bean from '@/models/Bean';
export default {
  data() {
    return {
      selectedBeanId: undefined,
    };
  },
  computed: {
    beanOptions() {
      return Bean.all();
    },
  },
  methods: {
    selectionChange(ev) {
      console.log(ev.target.value);
      this.$emit('beanSelectionChange', this.selectedBeanId);
    },
  },
};
</script>
