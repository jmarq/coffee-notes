export const isBrowser = () => {
  const result = Boolean(process.browser);
  console.log('isBrowser');
  console.log({ result });
  return result;
};
