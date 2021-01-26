<template>
  <div class="vega-wrapper">
    <h1 class="title">vega charts?</h1>
    <select id="x-axis" v-model="xAxisAttribute" name="x-axis">
      <option value="batch_size_oz">batch size</option>
      <option value="grinds_oz">grinds amount</option>
      <option value="date">date</option>
    </select>
    <div id="chart-container">
      <div id="chart"></div>
    </div>
  </div>
</template>

<script>
import vegaEmbed from 'vega-embed';
import Batch from '@/models/Batch';

const axisConfigs = {
  date: {
    type: 'temporal',
    title: 'date',
  },
  grinds_oz: {
    type: 'quantitative',
    title: 'grinds amount',
  },
  batch_size_oz: {
    type: 'quantitative',
    title: 'batch size',
  },
  rating: {
    type: 'quantitative',
    title: 'rating',
  },
};

export default {
  data() {
    return {
      chart: undefined,
      xAxisAttribute: 'date',
    };
  },

  computed: {
    chartData() {
      // maybe allow the user to filter the results by date/roast/bean/etc
      return Batch.query()
        .with('bean')
        .get()
        .filter((batch) => batch.rating);
    },
    vegaLiteSpec() {
      return {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        description: 'A simple bar chart with embedded data.',
        config: {
          background: '#eee',
          padding: 10,
          axis: {
            labelFontSize: 16,
            titleFontSize: 24,
          },
          legend: {
            labelFontSize: 16,
            titleFontSize: 24,
          },
          tooltip: {
            fontSize: 24,
          },
        },
        data: {
          values: this.chartData,
        },
        width: 'container',
        height: 'container',
        mark: { type: 'circle', tooltip: true },
        encoding: {
          // maybe allow the user to change these encodings via ui inputs
          x: {
            field: this.xAxisAttribute,
            type: axisConfigs[this.xAxisAttribute].type,
            title: axisConfigs[this.xAxisAttribute].title,
          },
          y: { field: 'rating', type: 'quantitative' },
          color: {
            title: 'roast',
            field: 'bean.roast_profile',
            type: 'nominal',
            scale: {
              domain: ['Dark', 'Medium', 'Light'],
              range: ['#210', '#642', '#b94'],
            },
          },
          size: { field: 'grind_size', type: 'q' },
        },
      };
    },
  },
  watch: {
    chartData() {
      this.drawChart();
    },
    vegaLiteSpec() {
      this.drawChart();
    },
  },

  mounted() {
    if (this.chartData.length) {
      console.log('in mounted');
      console.log({ data: this.chartData });
      this.drawChart();
    }
  },

  methods: {
    drawChart() {
      const that = this;
      vegaEmbed('#chart', this.vegaLiteSpec, {
        tooltip: { theme: 'dark' },
        actions: false,
        renderer: 'svg',
      })
        .then(function (result) {
          // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
          console.log('chart has rendered');
          that.chart = result;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
/* this style section isn't `scoped` because it targets the vega-created element */
.vega-wrapper canvas,
.vega-wrapper svg {
  @apply border-2;
  @apply border-green-400;
  @apply bg-orange-200;
}
#chart {
  width: 100%;
  height: 700px;
}
#vg-tooltip-element {
  font-size: 16px;
}
/* there has to be a better way */
/* #chart text {
  font-size: 16px;
} */
</style>
