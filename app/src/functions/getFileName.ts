export const getFileName = (path: string) => {
  return path.split(/[\\/]/).pop();
};
