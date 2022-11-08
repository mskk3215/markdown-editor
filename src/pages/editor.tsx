import * as React from "react";

import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";

const { useState } = React;

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`;

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;

// 永続的にデータを保存する為にlocalStorage（ページを閉じても消されない）を使う
// localStorage でデータの参照・保存に使うキー名を決めておきます。
// アプリケーション内で重複させないようにするため、今回は「ファイルパス:値の名前」という命名規則で決めます。
const StorageKey = "pages/editor:text";

// FCはfunction componentの型。関数コンポーネントとクラスコンポーネントがあるが、関数コンポーネントを示す
// Editorはfunction componentであることを明示
export const Editor: React.FC = () => {
  const [text, setText] = useStateWithStorage("", StorageKey);

  return (
    // １つの要素だけしか返却できないのでfragmentで囲う。複数のdivを返すことはできない。
    <>
      <Header>Markdown Editor</Header>
      <Wrapper>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>プレビューエリア</Preview>
      </Wrapper>
    </>
  );
};
