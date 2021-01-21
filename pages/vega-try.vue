<template>
  <div class="vega-wrapper">
    <h1 class="title">vega charts?</h1>
    <div id="chart-container"></div>
    <client-only>
      <div id="chart"></div>
    </client-only>
    <button class="coffee-button" @click="changeData">data change</button>
  </div>
</template>

<script>
import vegaEmbed from 'vega-embed';
export default {
  data() {
    return {
      chart: undefined,
      chartData: [
        { category: 'A', amount: 28 },
        { category: 'B', amount: 55 },
        { category: 'C', amount: 43 },
        { category: 'D', amount: 91 },
        { category: 'E', amount: 81 },
        { category: 'F', amount: 53 },
        { category: 'G', amount: 19 },
        { category: 'H', amount: 87 },
      ],
    };
  },

  computed: {
    spec() {
      return {
        $schema: 'https://vega.github.io/schema/vega/v5.json',
        description:
          'A basic bar chart example, with value labels shown upon mouse hover.',
        width: 400,
        height: 200,
        padding: 5,

        data: [
          {
            name: 'table',
            values: this.chartData,
          },
        ],

        signals: [
          {
            name: 'tooltip',
            value: {},
            on: [
              { events: 'rect:mouseover', update: 'datum' },
              { events: 'rect:mouseout', update: '{}' },
            ],
          },
        ],

        scales: [
          {
            name: 'xscale',
            type: 'band',
            domain: { data: 'table', field: 'category' },
            range: 'width',
            padding: 0.05,
            round: true,
          },
          {
            name: 'yscale',
            domain: { data: 'table', field: 'amount' },
            nice: true,
            range: 'height',
          },
        ],

        axes: [
          { orient: 'bottom', scale: 'xscale' },
          { orient: 'left', scale: 'yscale' },
        ],

        marks: [
          {
            type: 'rect',
            from: { data: 'table' },
            encode: {
              enter: {
                x: { scale: 'xscale', field: 'category' },
                width: { scale: 'xscale', band: 1 },
                y: { scale: 'yscale', field: 'amount' },
                y2: { scale: 'yscale', value: 0 },
              },
              update: {
                fill: { value: 'steelblue' },
              },
              hover: {
                fill: { value: 'red' },
              },
            },
          },
          {
            type: 'text',
            encode: {
              enter: {
                align: { value: 'center' },
                baseline: { value: 'bottom' },
                fill: { value: '#333' },
              },
              update: {
                x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
                y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
                text: { signal: 'tooltip.amount' },
                fillOpacity: [
                  { test: 'datum === tooltip', value: 0 },
                  { value: 1 },
                ],
              },
            },
          },
        ],
      };
    },
  },
  watch: {
    spec() {
      this.drawChart();
    },
  },

  mounted() {
    this.drawChart();
  },

  methods: {
    changeData() {
      console.log('new data plz');
      console.log(this.chart);
      this.chartData.push({
        category: '' + Math.floor(Math.random() * 100000),
        amount: Math.floor(Math.random() * 100),
      });
    },
    drawChart() {
      const that = this;
      vegaEmbed('#chart', this.spec).then(function (result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
        console.log('chart has rendered');
        that.chart = result;
      });
    },
  },
};
</script>
