// 通常の Web Worker の場合は importScript を使って外部のソースをインポートする必要があるが、
// 今回はwebpackで処理するため不要

import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";
//TypeScript 特有の書き方
// 通常の JavaScript であれば、self というグローバル変数でアクセスできます。
// しかし TypeScript だと型定義の兼ね合いで self にアクセスできないと判定されてビルドができません。
// worker という変数は Worker という型だと定義
const worker: Worker = self as any;

worker.addEventListener("message", (event) => {
  console.log("Worker Received", event.data);
  // // postMessage という関数を呼び出して、メインスレッドへ処理結果を送信しています。
  // // 今回はテストなので、result というキーに受け取ったデータを格納して返すだけの処理にしています。
  // worker.postMessage({ result: event.data });

  const text = event.data;
  const html = sanitizeHtml(marked(text), {
    // sanitize-html では h1, h2 はデフォルトから除外されているので、追加している
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  }); //markedでhtmlに変換
  worker.postMessage({ html });
});
