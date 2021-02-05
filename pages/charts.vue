<template>
  <div class="charts-wrapper">
    <div class="chart-nav">
      <n-link class="link subpage-link" to="/charts">Batches</n-link>
      <n-link class="link subpage-link" to="/charts/beans">Beans</n-link>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
import { debounce } from 'lodash/function';
export default {
  mounted() {
    console.log('chart page mounted');
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth: debounce(function () {
      this.$store.commit('setWindowWidth', window.innerWidth);
    }, 100),
  },
};
</script>

<style lang="scss">
.charts-wrapper canvas,
.charts-wrapper svg {
  @apply border-2;
  @apply border-green-400;
  @apply bg-orange-200;
}

.chart-page-wrapper {
  width: 100%;
  display: block;
  overflow-x: auto;
  margin-right: auto;
  margin-left: auto;
}

#chart {
  width: 100%;
  // min-width: 600px;
  height: 700px;
  display: block;
  overflow-x: auto;
}

// yeesh this is getting ugly
// alas, vega-lite tooltips on mobile seem to act a bit erratic
// sometimes they appear off the screen, unable to be scrolled to
// since they contain important info, this is a bandaid
#vg-tooltip-element {
  &.visible {
    pointer-events: none;
  }
}

#vg-tooltip-element,
#vg-tooltip-element[style] {
  font-size: 12px;
  top: 0 !important;
  width: 100%;
  left: 0 !important;
  position: fixed;
  table,
  tbody {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  tr {
    display: block;
    @apply mx-4;
  }
  tr {
    border-bottom: 1px solid #aaa !important;
  }
  td.key {
    color: rgba(4, 251, 57, 0.952) !important;
  }
  td.value {
    display: block;
    color: red;
  }
}
</style>
