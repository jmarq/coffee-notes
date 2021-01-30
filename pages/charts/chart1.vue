<template>
  <div class="chart-page-wrapper">
    <div class="chart-nav">
      <n-link class="link" to="/charts">Batches</n-link>
      <n-link class="link" to="/charts/chart1">Beans</n-link>
    </div>
    <!-- move these axis selectors into components -->
    <div class="axis-selectors-wrapper y">
      <label for="y-axis">Y Axis:</label>
      <select id="y-axis" v-model="yAxisAttribute" name="y-axis">
        <option v-for="pair in axisOptions" :key="pair[0]" :value="pair[0]">
          {{ pair[1].title }}
        </option>
      </select>
    </div>
    <!-- perhaps move these charts into a component -->
    <div id="chart" ref="chart"></div>
    <div class="axis-selectors-wrapper x">
      <label for="x-axis">X Axis:</label>
      <select id="x-axis" v-model="xAxisAttribute" name="x-axis">
        <option v-for="pair in axisOptions" :key="pair[0]" :value="pair[0]">
          {{ pair[1].title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import vegaEmbed, { vega } from 'vega-embed';
import Batch from '@/models/Batch';
import Bean from '@/models/Bean';

vega.expressionFunction('hello', function (datum, params, etc) {
  // this is probably too inefficient once we have a lot of beans
  const theBean = Bean.find(datum);
  return theBean.name;
});

const axisConfigs = {
  date: {
    field: 'date',
    type: 'temporal',
    title: 'date',
  },
  grinds_oz: {
    field: 'grinds_oz',
    type: 'quantitative',
    title: 'grinds amount',
  },
  batch_size_oz: {
    field: 'batch_size_oz',
    type: 'quantitative',
    title: 'batch size',
  },
  rating: {
    field: 'rating',
    type: 'quantitative',
    title: 'rating',
  },
  mean_rating: {
    field: 'rating',
    type: 'quantitative',
    title: 'mean rating',
    aggregate: 'mean',
  },
  bean_id: {
    field: 'bean.id',
    type: 'nominal',
    title: 'bean',
    axis: {
      // labelExpr: 'datum.label',
      // was trying to use the parent datum in the formatting but that seems to be tricky
      // I mean, we could look up the bean by its id again just to get its name, but that seems like a lot...
      format: 'bean.name',
      formatType: 'hello',
      labelAngle: -65,
    },
  },
};

export default {
  data() {
    return {
      chart: undefined,
      xAxisAttribute: 'bean_id',
      yAxisAttribute: 'mean_rating',
      axisOptions: Object.entries(axisConfigs),
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
      // probably break this into a separate file to import/reuse
      // it is kind of chunky to be eating up so much editor space in this page file.
      return {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        description: 'A simple bar chart with embedded data.',
        config: {
          customFormatTypes: true,
          background: '#eee',
          padding: 10,
          axis: {
            labelFontSize: 16,
            titleFontSize: 24,
          },
          axisX: {
            labelAngle: -65,
            tickSize: 10,
          },
          legend: {
            labelFontSize: 16,
            titleFontSize: 24,
          },
        },
        data: {
          values: this.chartData,
        },
        width: 'container',
        height: 'container',
        mark: {
          type: 'bar',
          tooltip: true,
        },
        encoding: {
          x: axisConfigs[this.xAxisAttribute],
          y: axisConfigs[this.yAxisAttribute],
          color: {
            title: 'roast',
            field: 'bean.roast_profile',
            type: 'nominal',
            scale: {
              domain: ['Dark', 'Medium', 'Light'],
              range: ['#210', '#642', '#b94'],
            },
          },
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
      vegaEmbed(this.$refs.chart, this.vegaLiteSpec, {
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

<style lang="scss">
/* this style section isn't `scoped` because it targets the vega-created element */

#chart {
  width: 100%;
  height: 700px;
  display: block;
}
#vg-tooltip-element {
  font-size: 16px;
  tr {
    border-bottom: 1px solid #aaa !important;
  }
  td.key {
    color: rgba(4, 251, 57, 0.952) !important;
    font-size: 1.5em;
  }
  td.value {
    font-size: 1.5em;
    text-align: right !important;
  }
}
</style>
