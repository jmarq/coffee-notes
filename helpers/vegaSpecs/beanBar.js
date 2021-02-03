export default {
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
    values: [],
    // values: this.chartData,
  },
  width: 'container',
  height: 'container',
  mark: {
    type: 'bar',
    tooltip: true,
  },
  encoding: {
    // x: axisConfigs[this.xAxisAttribute],
    // y: axisConfigs[this.yAxisAttribute],
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
