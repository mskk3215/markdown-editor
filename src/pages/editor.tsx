import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { SaveModal } from "../components/save_modal";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import { putMemo } from "../indexeddb/memos";
// worker-loader!
// src/worker/test.ts の型定義と合わせて、読み込むファイルが Worker であることを示しています。
// こうすると worker-loader が Worker として適切に処理してくれます。
import ConvertMarkdownWorker from "worker-loader!../worker/convert_markdown_worker";

// const testWorker = new TestWorker();
const convertMarkdownWorker = new ConvertMarkdownWorker();
const { useState, useEffect } = React;

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
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

interface Props {
  text: string;
  setText: (text: string) => void;
}

// FCはfunction componentの型。関数コンポーネントとクラスコンポーネントがあるが、関数コンポーネントを示す
// Editorはfunction componentであることを明示

export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props;
  const [showModal, setShowModal] = useState(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    convertMarkdownWorker.onmessage = (event) => {
      setHtml(event.data.html);
    };
  }, []);
  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text]);

  return (
    // １つの要素だけしか返却できないのでfragmentで囲う。複数のdivを返すことはできない。
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>

      <Wrapper>
        <TextArea
          //setText=setValueWithStorage
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string) => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};
