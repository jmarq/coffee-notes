<template>
  <div class="chart-page-wrapper">
    <axis-selector
      v-model="yAxisAttribute"
      axis="y"
      :axis-options="yAxisOptions"
    ></axis-selector>
    <div id="chart" ref="chart">
      <div v-if="chartData.length === 0" class="chart-empty">no data</div>
    </div>
    <axis-selector
      v-model="xAxisAttribute"
      axis="x"
      :axis-options="xAxisOptions"
    ></axis-selector>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vegaEmbed, { vega } from 'vega-embed';
import AxisSelector from '@/components/charts/AxisSelector';
import Batch from '@/models/Batch';
import Bean from '@/models/Bean';
import batchScatter from '@/helpers/vegaSpecs/batchScatter';
import * as specHelpers from '@/helpers/vegaSpecs/specHelpers';

vega.expressionFunction('hello', function (datum, params) {
  // this is probably too inefficient once we have a lot of beans
  const theBean = Bean.find(datum);
  return theBean.name;
});

const xAxisConfigs = {
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
  bean_id: {
    field: 'bean.id',
    type: 'nominal',
    title: 'bean',
    axis: {
      format: 'bean.name',
      formatType: 'hello',
      labelAngle: -65,
    },
  },
};

const yAxisConfigs = {
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
  bean_id: {
    field: 'bean.id',
    type: 'nominal',
    title: 'bean',
    axis: {
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
      xAxisAttribute: 'date',
      yAxisAttribute: 'rating',
      xAxisOptions: Object.entries(xAxisConfigs),
      yAxisOptions: Object.entries(yAxisConfigs),
    };
  },

  computed: {
    ...mapState({ windowWidth: 'windowWidth' }),
    chartData() {
      // maybe allow the user to filter the results by date/roast/bean/etc
      return Batch.query()
        .with('bean')
        .get()
        .filter((batch) => typeof batch.rating !== 'undefined');
    },
    vegaLiteSpec() {
      let result = {
        ...batchScatter,
      };
      result.data = {
        values: this.chartData,
      };
      result.encoding.x = xAxisConfigs[this.xAxisAttribute];
      result.encoding.y = yAxisConfigs[this.yAxisAttribute];
      result = specHelpers.adjustLegendLayout(result, this.windowWidth);
      result = specHelpers.adjustFontSizes(result, this.windowWidth);
      result = specHelpers.adjustFontFamily(result, 'Yantramanav');
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
          // console.log(that.chart.view.getState());
          // that.chart.view.addSignalListener('highlight', (name, value) => {
          //   console.log(name);
          //   console.log(value);
          // });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
/* this style section isn't `scoped` because it targets the vega-created element */
</style>
