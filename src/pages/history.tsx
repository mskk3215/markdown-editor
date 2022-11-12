import * as React from "react";

import { useHistory } from "react-router-dom";
import { Button } from "../components/button";

export const History: React.FC = () => {
  // useHistory は React のカスタムフックで history オブジェクトを返します。
  // history はブラウザの履歴を扱うためのAPIを提供してくれています。
  const history = useHistory();

  return (
    <>
      <h1>History</h1>
      {/* useState などと同じように、レンダリング関数内で呼び出して戻り値を処理内で使用します。
      ただし useState のようにセット用の関数は戻り値に含まれず、history オブジェクトだけ返却されていることに注意 */}
      <Button onClick={() => history.push("/editor")}>エディタへ戻る</Button>
    </>
  );
};
