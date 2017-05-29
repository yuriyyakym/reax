export default (lifecycle$) => new Proxy({}, {
  get: (target, name) => {
    if(name in target) {
      return target[name];
    }

    if(!LIFECYCLE_METHODS.includes(name)) {
      throw new Error(`Component does not have "${name}" lifecycle method`);
    }

    const observable$ = lifecycle$
      .filter(({ event }) => event === name)
      .pluck('value');

    target[name] = observable$;

    return observable$;
  }
});
