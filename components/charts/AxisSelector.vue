<template>
  <div :class="`axis-selectors-wrapper ${axis}`">
    <label :for="`${axis}-axis`">{{ axis.toUpperCase() }} Axis: </label>
    <select :id="`${axis}-axis`" v-model="selection" :name="`${axis}-axis`">
      <option v-for="pair in axisOptions" :key="pair[0]" :value="pair[0]">
        {{ pair[1].title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    axis: String,
    axisOptions: Array,
    value: String,
  },
  data() {
    return {
      selection: this.value,
    };
  },
  watch: {
    selection(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="scss">
.axis-selectors-wrapper {
  &.x {
    justify-content: center;
  }
  &.y {
    justify-content: flex-start;
  }
  @apply flex;
  align-items: center;
  @apply font-bold;
  background-color: rgba(255, 255, 255, 0.8);
  select {
    @apply ml-2;
    @apply p-2;
    @apply border-2;
    @apply border-white;
  }

  label {
    @apply inline-block;
    @apply px-2;
  }
}
</style>
