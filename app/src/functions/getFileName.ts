export const getFileName = (path: string) => {
  return path.split(/[\\/]/).pop();
};

export const getFileNameWithoutExtension = (path: string) => {
  return path.split(/[\\/]/).pop()!.split('.')[0];
};