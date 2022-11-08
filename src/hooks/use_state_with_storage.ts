import { useState } from "react";

// init: string は初期値で、useState の引数と同じです。
// key: string は localStorage に保存する際のキーです。
// [string, (s: string) => void] はカスタムフックの戻り値で、useState の戻り値と同じ型になっています。返り値setValueWithStorageは引数にstring型を指定しており、返り値はない関数である。

export const useStateWithStorage = (
  init: string,
  key: string
): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init);

  // useState から取得した関数と localStorage への保存を組み合わせた関数を生成
  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue);
    localStorage.setItem(key, nextValue);
  };

  // useState から取得した値と localStorage への保存を組み合わせた更新関数を返却
  return [value, setValueWithStorage];
};
