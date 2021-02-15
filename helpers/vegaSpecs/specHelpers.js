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
