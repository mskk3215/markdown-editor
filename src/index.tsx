import * as React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Editor } from "./pages/editor";

// Main という変数に React のビューを書いています。これが JSX

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }

`;
const Main = (
  <>
    <GlobalStyle />
    <Editor />
  </>
);

// app という ID を持つ HTML 内の要素に対して Main という変数の内容を紐付ける処理
render(Main, document.getElementById("app"));
