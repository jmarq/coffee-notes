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
    legend: {
      labelFontSize: 16,
      titleFontSize: 24,
    },
  },
  data: {
    values: [],
  },
  selection: {
    highlight: {
      type: 'single',
      empty: 'none',
      nearest: true,
      on: 'mouseover',
    },
  },
  width: 'container',
  height: 'container',
  mark: {
    type: 'circle',
  },
  encoding: {
    tooltip: [
      { field: 'date', type: 'temporal' },
      { field: 'bean.name', type: 'nominal' },
      { field: 'bean.roast_profile', type: 'ordinal' },
      { field: 'rating', type: 'quantitative' },
      { field: 'batch_size_oz', type: 'quantitative' },
      { field: 'grinds_oz', type: 'quantitative' },
      { field: 'grind_size', type: 'quantitative' },
      { field: 'note', type: 'nominal' },
    ],
    color: {
      title: 'roast',
      field: 'bean.roast_profile',
      type: 'nominal',
      scale: {
        domain: ['Dark', 'Medium', 'Light'],
        range: ['#210', '#642', '#b94'],
      },
      condition: {
        selection: 'highlight',
        value: '#b29',
      },
    },
    size: { field: 'grind_size', type: 'q' },
    detail: [
      {
        field: 'note',
        type: 'nominal',
      },
      {
        field: 'batch_size_oz',
        type: 'quantitative',
      },
      {
        field: 'rating',
        type: 'quantitative',
      },
    ],
  },
};
