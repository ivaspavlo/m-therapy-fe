import { shareReplay } from 'rxjs/operators';

const cacheMap = new Map<string, any>();

export function CacheApiCall(ttl: number = 60000) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const cacheKey = `${propertyKey.toString()}:${JSON.stringify(args)}`;
      if (cacheMap.has(cacheKey)) {
        const cachedItem = cacheMap.get(cacheKey);
        if (ttl > 0 && Date.now() - cachedItem.timestamp > ttl) {
          cacheMap.delete(cacheKey);
        } else {
          return cachedItem;
        }
      }
      const result = originalMethod.apply(this, args).pipe(shareReplay(1));
      cacheMap.set(cacheKey, result);
      return result;
    };
  };
}

CacheApiCall.clear = () => {
  cacheMap.clear();
};
