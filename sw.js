// キャッシュAPIは、このキャッシュ名に応じて別のキャッシュを提供
// 例えば一度キャッシュの内容をリセットしたい場合は、キャッシュ名を変更することで新しい状態にできます。
// キャッシュ名は任意の文字列で良いですが、バージョンが分かるように定義したほうが良いです。
const CacheName = "Cache:v1";

// インストールとアクティベートのタイミングで、コンソールにメッセージとイベントの内容を表示するだけの処理を記述
self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker activate:", event);
});

const networkFailingBackToCache = async (request) => {
  // 定義した名前で、キャッシュを開きます。
  const cache = await caches.open(CacheName);
  try {
    // fetch リクエストを実行してレスポンスを取得
    const response = await fetch(request);
    // レスポンス内容をキャッシュに保存
    // なお response.clone() でレスポンスの内容をコピーしてから保存しなければなりません。
    // これはレスポンスの内部で一度しか読み取りできない処理があるためです。
    // なので、コピーしたものをキャッシュに保存してください。
    await cache.put(request, response.clone());
    // レスポンスを呼び出し元に返却
    return response;
  } catch (err) {
    console.error(err);
    return cache.match(request);
  }
};

// fetch とはネットワークなどを経由してリソースを取得するために使用するAPIです。
// ここにサービスワーカーは介入できるので、リソース取得に対して様々な処理を挟むことができます。
self.addEventListener("fetch", (event) => {
  // ネットワークリクエストを行って結果をメインスレッドに戻す処理です。
  // event.respondWith は簡潔に言うと、非同期処理（Promise）の実行終了まで待機してくれるメソッド
  // event.respondWith(fetch(event.request));

  event.respondWith(networkFailingBackToCache(event.request));
});
