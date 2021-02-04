<template>
  <div class="charts-wrapper">
    <div class="chart-nav">
      <n-link class="link subpage-link" to="/charts">Batches</n-link>
      <n-link class="link subpage-link" to="/charts/beans">Beans</n-link>
    </div>
    <NuxtChild />
  </div>
</template>

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
  min-width: 600px;
  height: 700px;
  display: block;
  overflow-x: auto;
}

#vg-tooltip-element {
  font-size: 12px;
  tr {
    border-bottom: 1px solid #aaa !important;
  }
  td.key {
    color: rgba(4, 251, 57, 0.952) !important;
    // font-size: 1.5em;
  }
  td.value {
    // font-size: 1.5em;
    // text-align: right !important;
  }
}
</style>
