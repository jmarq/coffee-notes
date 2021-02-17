// helpers for modifying parts of larger vega specifications
//   could be worth using lodash .set to safely set nested configs
export function adjustFontSizes(spec, windowWidth) {
  const result = spec;
  let labelSize = 12;
  let titleSize = 18;
  let axisTitleFontSize = 0;

  if (windowWidth > 800) {
    labelSize = 16;
    titleSize = 24;
    axisTitleFontSize = titleSize;
  }
  result.config.axis.labelFontSize = labelSize;
  result.config.axis.titleFontSize = axisTitleFontSize;
  result.config.legend.titleFontSize = titleSize;
  result.config.legend.labelFontSize = labelSize;
  return result;
}

/*
"config": {
  "axis": {"labelFont": "monospace", "titleFont": "monospace"},
  "legend": {"labelFont": "monospace", "titleFont": "monospace"},
  "header": {"labelFont": "monospace", "titleFont": "monospace"},
  "mark": {"font": "monospace"},
  "title": {"font": "monospace", "subtitleFont": "monospace"}
}
*/
export function adjustFontFamily(spec, font) {
  const result = spec;
  result.config.axis.labelFont = font;
  result.config.axis.titleFont = font;
  result.config.legend.labelFont = font;
  result.config.legend.titleFont = font;
  // result.config.title.font = font;
  // result.config.title.subtitleFont = font;
  return result;
}

export function adjustLegendLayout(spec, windowWidth) {
  const result = spec;
  if (windowWidth < 800) {
    result.config.legend.orient = 'bottom';
    result.config.legend.columns = 2;
  } else {
    result.config.legend.orient = 'right';
    result.config.legend.columns = 1;
  }
  result.config.legend.direction = 'vertical';
  return result;
}
