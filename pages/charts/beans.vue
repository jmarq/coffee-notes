<template>
  <div class="chart-page-wrapper">
    <axis-selector
      v-model="yAxisAttribute"
      axis="y"
      :axis-options="yAxisOptions"
    ></axis-selector>
    <!-- perhaps move these charts into a component -->
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
import beanBar from '@/helpers/vegaSpecs/beanBar';
import * as specHelpers from '@/helpers/vegaSpecs/specHelpers';

vega.expressionFunction('beanNameFromId', function (datum) {
  const theBean = Bean.find(datum);
  return theBean.name;
});

const xAxisConfigs = [
  {
    field: 'bean.roast_profile',
    type: 'ordinal',
    title: 'roast profile',
  },
  {
    field: 'bean.id',
    type: 'nominal',
    title: 'bean',
    axis: {
      formatType: 'beanNameFromId',
      labelAngle: -65,
    },
  },
];

const yAxisConfigs = [
  {
    field: 'grinds_oz',
    type: 'quantitative',
    title: 'grinds used (oz)',
    aggregate: 'sum',
  },
  {
    field: 'batch_size_oz',
    type: 'quantitative',
    title: 'total oz made',
    aggregate: 'sum',
  },
  {
    field: 'rating',
    type: 'quantitative',
    title: 'average rating',
    aggregate: 'mean',
  },
];

function getAxisConfigByFieldString(configs, fieldString) {
  return configs.find((c) => c.field === fieldString);
}

export default {
  components: {
    AxisSelector,
  },
  data() {
    return {
      chart: undefined,
      xAxisAttribute: getAxisConfigByFieldString(xAxisConfigs, 'bean.id'),
      yAxisAttribute: getAxisConfigByFieldString(yAxisConfigs, 'rating'),
      xAxisOptions: xAxisConfigs,
      yAxisOptions: yAxisConfigs,
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
      let result = {
        ...beanBar,
      };
      result.data = {
        values: this.chartData,
      };
      result.encoding.x = this.xAxisAttribute;
      result.encoding.y = this.yAxisAttribute;
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

  beforeDestroy() {
    this.destroyChart();
  },

  methods: {
    destroyChart() {
      if (this.chart) {
        console.log('tearing down existing bean chart');
        this.chart.finalize();
      }
    },
    drawChart() {
      this.destroyChart();
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
