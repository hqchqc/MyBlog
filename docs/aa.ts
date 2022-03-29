function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: "mimi";
  run: () => void;
}

const result = getCacheData("tom") as Cat;
result.run();
