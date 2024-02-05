const cacheMap = new Map<string, any>();

export function Cache(ttl: number = 0) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cacheKey = `${propertyKey.toString()}:${JSON.stringify(args)}`;
      if (cacheMap.has(cacheKey)) {
        const cachedItem = cacheMap.get(cacheKey);
        if (ttl > 0 && Date.now() - cachedItem.timestamp > ttl) {
          cacheMap.delete(cacheKey);
        } else {
          return cachedItem.value;
        }
      }
      const result = originalMethod.apply(this, args);
      cacheMap.set(cacheKey, result);
      return result;
    };
  };
}

Cache.clear = () => {
  cacheMap.clear();
};
