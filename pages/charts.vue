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
// rethink these class names, what is the difference between wrapper, page wrapper, chart, etc.
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

.chart-empty {
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  background-image: linear-gradient(0deg, #bed, transparent);
}

// yeesh this is getting ugly
// alas, vega-lite tooltips on mobile seem to act a bit erratic
// sometimes they appear off the screen, unable to be scrolled to
// since they contain important info, this is a bandaid

.mark-symbol {
  path {
    transition: 200ms ease-in;
  }
}

// there is a bug where these can stay locked visible if the use uses the browser back button to navigate away from the page
#vg-tooltip-element,
#vg-tooltip-element[style] {
  &:not(.visible) {
    // pointer-events: none;
    opacity: 0;
  }
  border: none;
  transition: 300ms ease-in;
  font-size: 12px;
  @screen md {
    font-size: 16px;
  }
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
    color: #bed;
  }
  td.value {
    display: block;
    color: #eee;
  }
}
</style>
