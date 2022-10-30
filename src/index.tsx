import * as React from "react";
import { render } from "react-dom";

// Main という変数に React のビューを書いています。これが JSX
const Main = <h1>Markdown Editor</h1>;

// app という ID を持つ HTML 内の要素に対して Main という変数の内容を紐付ける処理
render(Main, document.getElementById("app"));
