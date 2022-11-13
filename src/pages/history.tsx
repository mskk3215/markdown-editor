import * as React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
// import { Button } from "../components/button";
import { Header } from "../components/header";
import { getMemoPageCount, getMemos, MemoRecord } from "../indexeddb/memos";

const { useState, useEffect } = React;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`;

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;
const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;
const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;
  &:disabled {
    color: silver;
  }
`;
interface Props {
  setText: (text: string) => void;
}

export const History: React.FC<Props> = (props) => {
  const { setText } = props;

  // useEffect 第2引数には、変更を監視する状態の配列を渡します。
  // 今回は []（空の配列）を渡しており、ずっと更新はされないので初回のみ実行
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // useHistory は React のカスタムフックで history オブジェクトを返します。
  // history はブラウザの履歴を扱うためのAPIを提供してくれています。
  const history = useHistory();

  useEffect(() => {
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage);
  }, []);

  const canNextPage: boolean = page < maxPage;
  const canPrevPage: boolean = page > 1;
  const movePage = (targetPage: number) => {
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    setPage(targetPage);
    getMemos(targetPage).then(setMemos);
  };

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => {
          return (
            //keyは React が配列要素を再描画する際に、変更された要素を特定するための使用するキーになります。
            // これを指定すると、React は配列の変更箇所を効率よく判定できます。
            <Memo
              key={memo.datetime}
              onClick={() => {
                setText(memo.text);
                history.push("/editor");
              }}
            >
              <MemoTitle>{memo.title}</MemoTitle>
              <MemoText>{memo.text}</MemoText>
            </Memo>
          );
        })}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page}/{maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>

      {/* <h1>History</h1>
      {/* useState などと同じように、レンダリング関数内で呼び出して戻り値を処理内で使用します。
      ただし useState のようにセット用の関数は戻り値に含まれず、history オブジェクトだけ返却されていることに注意 */}
      {/* <Button onClick={() => history.push("/editor")}>エディタへ戻る</Button> */}
    </>
  );
};
