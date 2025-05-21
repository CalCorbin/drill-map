export const getColorByDepth = (depth) => {
  if (!depth) return '#3388ff';

  if (depth < 200) return '#2c7bb6';
  if (depth < 400) return '#abd9e9';
  if (depth < 600) return '#ffffbf';
  if (depth < 800) return '#fdae61';
  return '#d7191c';
};
