export const pxToRem = (px: number) => {
  return String((0.0625 * 100 * px) / 100) + 'rem';
};
