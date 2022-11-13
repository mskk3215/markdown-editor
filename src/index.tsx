import * as React from "react";
import { render } from "react-dom";
// react-router には HashRouter と BrowserRouter の２つが用意されています。
// HashRouter は、上記のように # の後にパスを記述する方式です。もともと URL に含まれる # は「フラグメント」と呼ばれ、ページ内の特定の箇所を指しています。サーバー側の設定が不要。
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useStateWithStorage } from "./hooks/use_state_with_storage";
import { Editor } from "./pages/editor";
import { History } from "./pages/history";

// Main という変数に React のビューを書いています。これが JSX

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`;

// 永続的にデータを保存する為にlocalStorage（ページを閉じても消されない）を使う
// localStorage でデータの参照・保存に使うキー名を決めておきます。
// アプリケーション内で重複させないようにするため、今回は「ファイルパス:値の名前」という命名規則で決めます。
const StorageKey = "pages/editor:text";

//useState を使うために、Main を関数化します。
const Main: React.FC = () => {
  // StorageKeyの保存を別のコンポーネントにまとめる
  // text=value, setText=setValueWithStorage
  const [text, setText] = useStateWithStorage("", StorageKey);

  return (
    <>
      {/* 例えばフッターなどをこのRouteタグの外側に配置すると、パスに関わらず固定表示するといったことができます。 */}
      {/* exact 属性は、パスの判定方法を切り替えるパラメーターです。
    exact={true} の場合は完全一致、exact={false} は部分一致になります。
    例えば /editor で exact={false} の場合、/editor/foo でも一致と判定されます。
    指定がない場合は exact={false} がデフォルトの挙動となります。 */}
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/editor">
            <Editor text={text} setText={setText} />
          </Route>
          <Route exact path="/history">
            <History setText={setText} />
          </Route>
          {/* 定義されていないパスの場合は /editor にリダイレクトする、という定義 */}
          <Redirect to="/editor" path="*" />
        </Switch>
      </Router>
    </>
  );
};

// app という ID を持つ HTML 内の要素に対して Main という変数の内容を紐付ける処理
render(<Main />, document.getElementById("app"));
