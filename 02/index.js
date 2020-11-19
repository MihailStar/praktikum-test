function get(obj, path, defaultValue) {
  const partialPaths = path.split('.');
  let result = obj;

  for (let index = 0; index < partialPaths.length; index += 1) {
    result = result[partialPaths[index]];
    if (result === undefined) break;
  }

  return result === undefined ? defaultValue : result;
}
