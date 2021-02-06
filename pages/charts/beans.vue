<template>
  <div class="chart-page-wrapper">
    <axis-selector
      v-model="yAxisAttribute"
      axis="y"
      :axis-options="axisOptions"
    ></axis-selector>
    <!-- perhaps move these charts into a component -->
    <div id="chart" ref="chart">
      <div v-if="chartData.length === 0" class="chart-empty">no data</div>
    </div>
    <axis-selector
      v-model="xAxisAttribute"
      axis="x"
      :axis-options="axisOptions"
    ></axis-selector>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vegaEmbed, { vega } from 'vega-embed';
import AxisSelector from '@/components/charts/AxisSelector';
import Batch from '@/models/Batch';
import Bean from '@/models/Bean';
import beanBar from '@/helpers/vegaSpecs/beanBar';
import * as specHelpers from '@/helpers/vegaSpecs/specHelpers';

vega.expressionFunction('hello', function (datum, params) {
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
  components: {
    AxisSelector,
  },
  data() {
    return {
      chart: undefined,
      xAxisAttribute: 'bean_id',
      yAxisAttribute: 'mean_rating',
      axisOptions: Object.entries(axisConfigs),
    };
  },

  computed: {
    ...mapState({ windowWidth: 'windowWidth' }),
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
      let result = {
        ...beanBar,
      };
      result.data = {
        values: this.chartData,
      };
      result.encoding.x = axisConfigs[this.xAxisAttribute];
      result.encoding.y = axisConfigs[this.yAxisAttribute];
      result = specHelpers.adjustLegendLayout(result, this.windowWidth);
      result = specHelpers.adjustFontSizes(result, this.windowWidth);
      return result;
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
      if (this.chartData.length === 0) {
        return;
      }
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
          console.log(that.chart);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
/* this style section isn't `scoped` because it targets the vega-created element */
// look into "deep selectors" in vue as a potential solution for this.
</style>
