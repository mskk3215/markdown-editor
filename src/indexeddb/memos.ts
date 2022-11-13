import Dexie from "dexie";

// typescriptの型定義
export interface MemoRecord {
  datetime: string;
  title: string;
  text: string;
}

const database = new Dexie("markdown-editor");
// .stores() で使用するテーブルとインデックスとなるデータ名を指定
database.version(1).stores({ memos: "&datetime" });
// MemoRecord はデータの型で、2つ目の string はキーとなるデータ（今回は datetime）の型
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  await memos.put({ datetime, title, text });
};

const NUM_PER_PAGE: number = 10;
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count(); //count() は Dexie に定義された関数
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
  return pageCount > 0 ? pageCount : 1;
};

// テキスト履歴をリストで取得する関数を定義します。
// 戻り値は配列なので MemoRecord の末尾に [] をつけています。
// (): Promise<※> => ... と定義した場合は ※ の値を「非同期」で返すのに対し、(): ※ => と定義した場合は ※ の値を「同期」で返します。
// 書き方の違いとしては、同期は特別な書き方はないです（通常の書き方が同期的な書き方、とも言えます）が、非同期の場合は await や .then() をつかい完了まで待たないと値が取得できません。
// なお Promise<MemoRecord[]> を MemoRecord[] に変えていただくと、ビルド時にエラーが出るかと思います。
// これは、実装は非同期（Promise）を返しているのに、型定義は同期的に返すことになり、不整合が発生するのでエラーになる、という感じです。

export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE; //ページ数をもとに、取得する最初に位置（OFFSET）を算出
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset) //offset は取得するリスト内の開始位置
    .limit(NUM_PER_PAGE) //limit はそのキーワードの通り、取得する件数
    .toArray();
};
