(function () {
  function get(obj, path, defaultValue) {
    const partialPaths = path.split('.');
    let result = obj;

    for (let index = 0; index < partialPaths.length; index += 1) {
      result = result[partialPaths[index]];
      if (result === undefined) break;
    }

    return result === undefined ? defaultValue : result;
  }

  class Templator {
    constructor(template) {
      this._template = template;
    }

    compile(ctx) {
      return this._template.replace(
        /{{ *((?:\w+\.?)+\w+) *}}/g,
        (_, matching) => {
          const value = get(ctx, matching);

          if (value instanceof Function) {
            window[matching] = value;
            return `window.${matching}()`;
          }

          return value;
        }
      );
    }
  }

  window.Templator = Templator;
})();
