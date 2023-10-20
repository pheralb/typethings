export const getFolderName = (path: string) => {
  return path.split(/[\\/]/).pop();
};
